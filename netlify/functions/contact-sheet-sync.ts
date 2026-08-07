import type { Config, Context } from "@netlify/functions";

type Submission = {
  form_name?: string;
  formName?: string;
  payload?: {
    form_name?: string;
    formName?: string;
  };
};

export default async (request: Request, _context: Context) => {
  const requestUrl = new URL(request.url);
  const target = requestUrl.searchParams.get("target");
  let googleReceiverUrl: URL;

  try {
    googleReceiverUrl = new URL(target ?? "");
  } catch {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (
    googleReceiverUrl.protocol !== "https:" ||
    googleReceiverUrl.hostname !== "script.google.com" ||
    !googleReceiverUrl.pathname.startsWith("/macros/s/") ||
    !googleReceiverUrl.pathname.endsWith("/exec") ||
    !googleReceiverUrl.searchParams.has("key")
  ) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const targetDigest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(googleReceiverUrl.toString()),
  );
  const targetFingerprint = Array.from(new Uint8Array(targetDigest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  if (
    targetFingerprint !==
    "4869f54575b38dab0b45ae0cd2985dae7e5d52f3299080c4ec64d2f51754285f"
  ) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = await request.text();
  let submission: Submission;

  try {
    submission = JSON.parse(body) as Submission;
  } catch {
    return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const formName =
    submission.payload?.form_name ??
    submission.payload?.formName ??
    submission.form_name ??
    submission.formName;

  if (formName && formName !== "novara-contact") {
    return Response.json({ ok: true, ignored: true });
  }

  try {
    const googleResponse = await fetch(googleReceiverUrl.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      redirect: "follow",
    });

    const googleBody = await googleResponse.text();
    let result: { ok?: boolean; error?: string } = {};

    try {
      result = JSON.parse(googleBody) as typeof result;
    } catch {
      result = {};
    }

    if (!googleResponse.ok || result.ok !== true) {
      console.error("Google Sheets sync failed", {
        status: googleResponse.status,
        error: result.error ?? "invalid receiver response",
      });
      return Response.json(
        { ok: false, error: "Google Sheets sync failed" },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Google Sheets sync request failed", error);
    return Response.json(
      { ok: false, error: "Google Sheets sync request failed" },
      { status: 502 },
    );
  }
};

export const config: Config = {
  path: "/api/contact-sheet-sync",
  method: ["POST"],
};
