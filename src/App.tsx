import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, eventParams?: Record<string, unknown>) => void;
  }
}

function trackAnalyticsEvent(eventName: string, eventParams: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    page_path: window.location.pathname,
    ...eventParams,
  });
}

const capabilityPaths = [
  {
    title: "Capability Profile",
    body: "A readable view of strengths, growth areas, and capability signals.",
    color: "var(--paper)",
  },
  {
    title: "Judgment Record",
    body: "A log of what you noticed, what you believed, and how your view changed.",
    color: "var(--amber)",
  },
  {
    title: "AI Challenge",
    body: "Structured pressure from AI so strong reasoning can be tested, not just stated.",
    color: "var(--steel)",
  },
  {
    title: "Confidence Tracking",
    body: "See where conviction is earned, where uncertainty remains, and where revision is needed.",
    color: "var(--moss)",
  },
  {
    title: "Future Questions",
    body: "Prompts and scenarios that surface what someone is able to understand and build toward.",
    color: "var(--limestone)",
  },
  {
    title: "Opportunity Routing",
    body: "A path from visible capability to pilots, roles, partners, and long-term projects.",
    color: "var(--paper)",
  },
];

const tracks = [
  {
    title: "Complete a Session",
    meta: "Make judgment visible",
    body: "Respond to a short scenario, explain your reasoning, and mark your confidence.",
  },
  {
    title: "Build a Profile",
    meta: "Understand strengths",
    body: "Novara turns repeated sessions into a capability profile that is easier to discuss and improve.",
  },
  {
    title: "Find the Right Path",
    meta: "Connect to opportunity",
    body: "Strong signals can route into pilots, roles, partner projects, or continued development.",
  },
];

const happens = [
  {
    title: "Candidates",
    body: "People who want a clearer way to show judgment, direction, and capability beyond a resume.",
  },
  {
    title: "Teams",
    body: "Organizations looking for better signals of judgment, learning ability, and AI-era capability.",
  },
  {
    title: "Schools",
    body: "Learning communities exploring how to develop and recognize capabilities that stay valuable.",
  },
  {
    title: "Partners",
    body: "Institutions, cities, and ecosystem builders that want stronger routes from potential to work.",
  },
];

const teamAreas = [
  {
    label: "Founding team",
    title: "Company stewardship",
    body:
      "Owns Novara's direction, operating standards, and long-term accountability.",
  },
  {
    label: "Capability design",
    title: "Research and assessment",
    body:
      "Shapes judgment review, capability signals, learning theory, and human-AI evaluation.",
  },
  {
    label: "Network growth",
    title: "Partnerships and ecosystem",
    body:
      "Builds the partner network across institutions, cities, strategic partners, and regional leads.",
  },
  {
    label: "Programs",
    title: "Operations and execution",
    body:
      "Runs candidate flow, partner programs, summits, and the execution layer behind the network.",
  },
];

const jobTracks = [
  {
    title: "Product and Capability Systems",
    status: "Hiring track",
    body:
      "Design assessment flows, candidate surfaces, and the product layer that makes capability legible.",
  },
  {
    title: "Strategic Partnerships and Ecosystem Growth",
    status: "Partner-facing",
    body:
      "Build relationships with organizations, cities, institutions, and networks that can compound Novara's reach.",
  },
  {
    title: "Strategy and Decision Systems",
    status: "Core team",
    body:
      "Shape the models, research, and decision frameworks behind judgment-centered capability infrastructure.",
  },
  {
    title: "Operations and Execution",
    status: "Execution track",
    body:
      "Turn complex programs, events, recruiting loops, and partner work into reliable operating systems.",
  },
];

const pilotSteps = [
  {
    title: "Understand the pilot",
    meta: "What Novara is testing",
    body: "Novara is testing early learning experiences that help people understand ability, judgment, and growth.",
  },
  {
    title: "Submit the application",
    meta: "Google Form intake",
    body: "Share profile, learning background, goals, fast-track signals, and availability through the official form.",
  },
  {
    title: "Test and give feedback",
    meta: "Founding cohort",
    body: "Selected users complete early product sessions and help Novara improve the experience before broader release.",
  },
];

const pilotEligibility = [
  "Ages 18-24",
  "GPA 3.3+",
  "Fluent English",
  "STEM, business, or humanities",
  "Available for required testing and an exit survey",
];

const pilotFormPostUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdusHuOtzj7-xpTQdZxslH3j9LVmbmNN32_s_Yz7PFiWf349Q/formResponse";

const ageGroups = ["18-24", "24-35", "35+"];
const regions = ["United States", "Asia", "Europe", "Other"];
const fastTrackOptions = [
  "IMO, IPhO, IChO, IOI, or IBO Gold Medal",
  "Founder of a notable or funded startup",
  "Published research",
  "Top national-level award recipient",
  "None of the above",
];
const developmentGoals = ["Academic", "Career", "Entrepreneurship", "Lifelong Learning"];
const availabilityOptions = [
  { label: "30 minutes", value: "Less than 2 hours" },
  { label: "1 hour", value: "Less than 2 hours" },
  { label: "2 hours", value: "2-5 hours" },
  { label: "2+ hours", value: "2-5 hours" },
];

const footerGroups = [
  ["Product", "Capability Profile", "Judgment Sessions", "Opportunity Routing"],
  ["Company", "Why Novara", "Future Capability", "Partners"],
  ["Paths", "Candidates", "Teams", "Schools"],
  ["Engage", "Contact", "Open Tracks", "Founding Cohort"],
];

const assemblyBlocks = [
  { from: [-162, 12, 12, 1], to: [-78, -78, 0, 1], color: "var(--paper)" },
  { from: [-34, -48, -8, 1.08], to: [0, -78, 0, 1], color: "var(--amber)" },
  { from: [142, 26, 6, 1], to: [78, -78, 0, 1], color: "var(--steel)" },
  { from: [-212, -60, -14, 0.86], to: [-78, 0, 0, 1], color: "var(--moss)" },
  { from: [24, 20, 5, 0.92], to: [0, 0, 0, 1], color: "var(--limestone)" },
  { from: [218, -36, 10, 0.82], to: [78, 0, 0, 1], color: "var(--paper)" },
  { from: [-88, 84, -20, 0.8], to: [-78, 78, 0, 1], color: "var(--steel)" },
  { from: [86, 78, 18, 0.88], to: [0, 78, 0, 1], color: "var(--moss)" },
  { from: [128, -92, -12, 0.74], to: [78, 78, 0, 1], color: "var(--amber)" },
];

const easeInOutQuad = (value: number) =>
  value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

const squigglePathData =
  "M-20 221 C39 221 77 222 117 216 C78 129 135 58 208 76 C295 96 287 204 215 215 C147 225 124 170 162 143 C207 112 256 172 220 235 C187 292 98 306 126 247 C151 194 249 182 282 219 C322 264 258 344 204 337 C136 329 99 243 153 204 C217 157 297 175 316 237 C334 296 269 343 233 296 C199 252 260 203 310 173 C363 141 404 103 448 122 C492 141 468 220 446 271 C426 317 474 322 499 277 C529 223 538 119 596 60 C643 10 698 19 694 98 C689 188 596 260 585 328 C574 389 659 394 711 338 C746 301 676 276 679 229 C682 178 741 109 790 130 C842 152 806 246 777 276 C742 312 816 332 842 282 C864 241 852 202 878 205 C901 208 887 277 902 311 C920 352 984 344 965 286 C949 236 886 180 908 145 C936 101 1017 142 1039 200 C1066 273 1102 309 1172 286 C1232 266 1242 202 1281 202 C1320 202 1297 277 1329 299 C1374 329 1448 295 1484 244 C1519 206 1578 207 1646 207 C1712 207 1768 207 1858 207";

const minimumAnimatedSquiggleZoom = 0.7;

const pathSpreadOffsets = [-120, -72, -28, 28, 72, 120];
const pathVerticalOffsets = [16, -10, 12, -12, 10, -16];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="arrow-icon" fill="none" viewBox="0 0 28 28">
      <path d="M0 14L28 14" stroke="currentColor" />
      <path d="M14 0.5L28 14" stroke="currentColor" />
      <path d="M14 28L28 14" stroke="currentColor" />
    </svg>
  );
}

function Header({ isPilot = false }: { isPilot?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    ["Product", "/#system"],
    ["Why", "/#why"],
    ["Offers", "/#network"],
    ["Who", "/#partners"],
    ["Jobs", "/jobs"],
    ["Contact", "/#contact"],
  ];

  return (
    <header className={`site-header ${isPilot ? "pilot-header" : ""}`}>
      <div className="header-inner">
        {isPilot ? (
          <div className="header-logo" aria-label="Novara">
            <img src="/assets/novara-logo-official-transparent.png" alt="Novara" />
          </div>
        ) : (
        <a className="header-logo" href="/" aria-label="Novara home">
          <img src="/assets/novara-logo-official-transparent.png" alt="Novara" />
        </a>
        )}
        {isPilot ? null : (
        <a
          className="apply-block"
          href="/#contact"
          onClick={() => trackAnalyticsEvent("click_contact_header")}
        >
          Contact
        </a>
        )}
        <div className="nav-shell">
          {isPilot ? (
            <p className="pilot-header-title">Founding cohort application</p>
          ) : (
          <nav className="main-nav" aria-label="Primary navigation">
            {links.slice(0, 5).map(([label, href]) => (
              <a
                href={href}
                key={href}
                onClick={() => trackAnalyticsEvent("click_nav_link", { nav_label: label })}
              >
                {label}
              </a>
            ))}
          </nav>
          )}
          {isPilot ? null : (
          <>
          <button
            className={`menu-button ${isMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          {isMenuOpen ? (
            <div className="menu-panel">
              {links.map(([label, href]) => (
                <a
                  href={href}
                  key={href}
                  onClick={() => {
                    trackAnalyticsEvent("click_mobile_nav_link", { nav_label: label });
                    setIsMenuOpen(false);
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          ) : null}
          </>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="arena">
      <p className="hero-eyebrow">Global capability network for the AI era</p>
      <h1>Know your strengths. Build what matters next.</h1>
      <p>
        Novara is a capability platform for the AI era. The app helps people record judgment,
        understand their strengths, and connect credible capability signals to real opportunities.
      </p>
      <div className="hero-actions">
        <a
          className="outline-cta primary"
          href="/#contact"
          onClick={() => trackAnalyticsEvent("click_hero_contact")}
        >
          <span>Get in touch</span>
          <ArrowIcon />
        </a>
        <a
          className="outline-cta"
          href="/#why"
          onClick={() => trackAnalyticsEvent("click_hero_how_it_works")}
        >
          <span>See how it works</span>
        </a>
      </div>
    </section>
  );
}

function SquiggleLine({ onLightChange }: { onLightChange: (isOn: boolean) => void }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRectRef = useRef<SVGRectElement | null>(null);
  const lastLightStateRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const progressRect = progressRectRef.current;
    if (!section || !progressRect) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    progressRect.setAttribute("width", "0");

    const render = () => {
      const viewportHeight = window.innerHeight || 1;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.getBoundingClientRect().height;
      const desiredStartScroll = Math.max(0, sectionTop - viewportHeight * 0.55);
      const baseEndScroll = sectionTop + sectionHeight * 0.7;
      const desiredEndScroll = desiredStartScroll + (baseEndScroll - desiredStartScroll) / 2.16;
      const maximumScroll = Math.max(
        0,
        document.documentElement.scrollHeight - viewportHeight,
      );
      const endScroll = Math.min(desiredEndScroll, maximumScroll);
      const startScroll = Math.min(desiredStartScroll, Math.max(0, endScroll - 1));
      const scrollRange = Math.max(1, endScroll - startScroll);
      const viewportWidth = window.visualViewport?.width || window.innerWidth || 1;
      // Desktop browsers expose no page-zoom API. The browser's outer window stays
      // in screen pixels while the CSS viewport grows as the page is zoomed out,
      // so this ratio tracks effective zoom without confusing a large monitor for
      // a low zoom level.
      const effectiveZoom = window.outerWidth > 0
        ? window.outerWidth / Math.max(1, viewportWidth)
        : 1;
      const shouldResolveLowZoom = effectiveZoom < minimumAnimatedSquiggleZoom;
      const rawProgress = (window.scrollY - startScroll) / scrollRange;
      const progress = Math.max(0, Math.min(1, rawProgress));
      const visualProgress = reduceMotion || shouldResolveLowZoom
        ? 1
        : progress >= 0.985 ? 1 : progress;
      progressRect.setAttribute("width", `${1900 * visualProgress}`);
      const isLightOn = visualProgress >= 1;
      section.classList.toggle("is-complete", isLightOn);

      if (lastLightStateRef.current !== isLightOn) {
        lastLightStateRef.current = isLightOn;
        onLightChange(isLightOn);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.visualViewport?.addEventListener("resize", onScroll);
    window.visualViewport?.addEventListener("scroll", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
    };
  }, [onLightChange]);

  return (
    <section className="squiggle-section" ref={sectionRef} aria-hidden="true">
      <svg className="squiggle-line" fill="none" viewBox="0 0 2110 415">
        <defs>
          <clipPath id="squiggle-progress-clip" clipPathUnits="userSpaceOnUse">
            <rect ref={progressRectRef} x="-20" y="-20" width="0" height="455" />
          </clipPath>
        </defs>
        <path
          className="squiggle-guide"
          d={squigglePathData}
        />
        <path
          className="squiggle-path"
          clipPath="url(#squiggle-progress-clip)"
          d={squigglePathData}
        />
        <g className="squiggle-target-mark">
          <circle className="squiggle-target" cx="1944" cy="206" r="66" />
          <circle className="squiggle-target-core" cx="1944" cy="206" r="29" />
        </g>
        <g transform="translate(1944 206)">
          <g className="squiggle-bulb">
            <circle className="bulb-halo" cx="0" cy="0" r="66" />
            <g className="bulb-inner">
              <path
                className="bulb-glass"
                d="M-31 -11 C-31 -34 -15 -51 8 -51 C31 -51 48 -34 48 -10 C48 5 41 17 30 28 C22 36 20 43 20 52 L-3 52 C-3 42 -7 36 -15 28 C-25 18 -31 5 -31 -11 Z"
              />
              <path className="bulb-filament" d="M-8 7 C-1 -2 7 -2 14 7" />
              <path className="bulb-base" d="M-5 52 L21 52 M-2 64 L18 64 M2 76 L14 76" />
            </g>
            <path className="bulb-ray" d="M0 -82 L0 -108 M59 -59 L78 -78 M82 0 L108 0 M59 59 L78 78 M-59 -59 L-78 -78 M-82 0 L-108 0 M-59 59 L-78 78" />
          </g>
        </g>
      </svg>
    </section>
  );
}

function WhyNow() {
  return (
    <section className="spc-section statement-section" id="why">
      <div className="section-label">
        <h2>Why Novara</h2>
      </div>
      <div className="statement-grid">
        <h2>AI makes answers abundant. Judgment is still hard to see.</h2>
        <div>
          <p>
            Resumes, grades, and short interviews miss the thing that now matters most: how
            someone thinks when information is incomplete.
          </p>
          <p>
            Novara gives people a structured way to show judgment, confidence, revision, and
            human-AI collaboration through real decision moments.
          </p>
        </div>
      </div>
      <p className="beat-line">The goal is simple: make capability legible before opportunity arrives.</p>
    </section>
  );
}

function HowToStart() {
  const objectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const object = objectRef.current;
    if (!object) return;

    const blocks = Array.from(object.querySelectorAll<HTMLElement>(".tile"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const render = () => {
      const viewportHeight = window.innerHeight || 1;
      const objectTop = object.getBoundingClientRect().top + window.scrollY;
      const startScroll = objectTop - viewportHeight * 1.2;
      const endScroll = objectTop - viewportHeight * 0.26;
      const rawProgress = reduceMotion
        ? 1
        : (window.scrollY - startScroll) / (endScroll - startScroll);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      const progress = easeInOutQuad(clampedProgress);
      const scale = Math.min(1, Math.max(0.72, object.clientWidth / 520));

      blocks.forEach((block, index) => {
        const spec = assemblyBlocks[index];
        const [fromX, fromY, fromRotate, fromScale] = spec.from;
        const [toX, toY, toRotate, toScale] = spec.to;
        const x = (fromX + (toX - fromX) * progress) * scale;
        const y = (fromY + (toY - fromY) * progress) * scale;
        const rotate = fromRotate + (toRotate - fromRotate) * progress;
        const blockScale = fromScale + (toScale - fromScale) * progress;

        block.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${blockScale * scale})`;
        block.style.opacity = `${0.58 + clampedProgress * 0.42}`;
        block.style.filter = `saturate(${0.82 + clampedProgress * 0.18})`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="spc-section how-section" id="system">
      <div className="section-label">
        <h2>What the app does</h2>
      </div>
      <div className="intro-grid">
        <div>
          <h3>A short loop for proving judgment.</h3>
          <p>
            Users work through focused sessions that capture how they reason, what evidence they
            use, how confident they are, and when they should revise.
          </p>
        </div>
        <div className="system-object" ref={objectRef} aria-hidden="true">
          {assemblyBlocks.map((block, index) => (
            <span
              className="tile"
              key={`${block.color}-${index}`}
              style={{ background: block.color, zIndex: index + 1 }}
            />
          ))}
        </div>
      </div>
      <div className="track-cards">
        {tracks.map((track, index) => (
          <a
            className="track-card"
            href="#contact"
            key={track.title}
            onClick={() =>
              trackAnalyticsEvent("click_path_card", {
                card_title: track.title,
                card_position: index + 1,
              })
            }
          >
            <span className="track-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{track.title}</h3>
            <p className="meta">{track.meta}</p>
            <p>{track.body}</p>
          </a>
        ))}
      </div>
      <div className="center-cta">
        <a
          className="outline-cta large"
          href="#contact"
          onClick={() => trackAnalyticsEvent("click_start_conversation")}
        >
          <span>Start a conversation</span>
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

function CapabilityPaths() {
  const [activePath, setActivePath] = useState(0);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const active = capabilityPaths[activePath];

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cells = Array.from(grid.querySelectorAll<HTMLElement>(".path-cell"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const render = () => {
      const viewportHeight = window.innerHeight || 1;
      const gridTop = grid.getBoundingClientRect().top + window.scrollY;
      const startScroll = gridTop - viewportHeight * 1.18;
      const endScroll = gridTop - viewportHeight * 0.72;
      const rawProgress = reduceMotion
        ? 1
        : (window.scrollY - startScroll) / (endScroll - startScroll);
      const progress = easeInOutQuad(Math.max(0, Math.min(1, rawProgress)));
      const scale = Math.min(1, Math.max(0.42, grid.clientWidth / 1200));

      cells.forEach((cell, index) => {
        const startX = (pathSpreadOffsets[index] ?? 0) * scale;
        const startY = (pathVerticalOffsets[index] ?? 0) * scale;
        const x = startX * (1 - progress);
        const y = startY * (1 - progress);
        cell.style.setProperty("--path-x", `${x}px`);
        cell.style.setProperty("--path-base-y", `${y}px`);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="spc-section paths-section" id="network">
      <div className="section-label">
        <h2>What the app offers</h2>
      </div>
      <div className="paths-heading">
        <h2>A capability profile built from how you actually think.</h2>
        <p>
          The product turns short judgment moments into clearer signals: strengths, uncertainty,
          confidence, collaboration with AI, and readiness for the right next path.
        </p>
      </div>
      <div className="paths-grid" ref={gridRef}>
        {capabilityPaths.map((path, index) => (
          <button
            className={`path-cell ${index === activePath ? "active" : ""}`}
            key={path.title}
            type="button"
            style={{ backgroundColor: path.color }}
            onClick={() => setActivePath(index)}
          >
            {path.title}
          </button>
        ))}
      </div>
      <div className="path-detail" aria-live="polite">
        <p>{String(activePath + 1).padStart(2, "0")}</p>
        <h3>{active.title}</h3>
        <span>{active.body}</span>
      </div>
      <div className="center-cta compact">
        <a className="outline-cta" href="#challenges">
          See the problem
        </a>
      </div>
    </section>
  );
}

function GlobalChallenges() {
  return (
    <section className="spc-section challenge-section" id="challenges">
      <div className="section-label">
        <h2>The problem</h2>
      </div>
      <div className="challenge-grid">
        <div>
          <h2>Potential is everywhere. Reliable signals are not.</h2>
          <p>
            AI changes what people can produce. It also makes it harder to know who understands,
            who is guessing, and who can make decisions under pressure.
          </p>
        </div>
        <div className="challenge-points">
          <p>Traditional credentials are too slow and too narrow.</p>
          <p>AI output can hide weak reasoning behind polished answers.</p>
          <p>Partners need better ways to identify people ready for meaningful work.</p>
        </div>
      </div>
    </section>
  );
}

function EntryPoints() {
  return (
    <section className="happens-section" id="partners">
      <div className="happens-inner">
        <aside>
          <p>Who it is for</p>
          <ol>
            <li>Candidates</li>
            <li>Teams</li>
            <li>Schools</li>
            <li>Partners</li>
          </ol>
        </aside>
        <div className="happens-content">
          {happens.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LandingLinks() {
  return (
    <section className="spc-section landing-links" aria-label="Explore more">
      <div className="section-label">
        <h2>Explore Novara</h2>
      </div>
      <div className="landing-link-grid">
          <a
            className="landing-link-card why-link"
            href="#why"
            onClick={() => trackAnalyticsEvent("click_explore_card", { card_title: "Why Novara" })}
          >
          <span>Why Novara</span>
          <h2>The thesis behind the company</h2>
          <p>AI makes information abundant. Novara focuses on the judgment layer that remains scarce.</p>
          <strong>Read the thesis</strong>
        </a>
        <a
          className="landing-link-card team-link"
          href="/team"
          onClick={() => trackAnalyticsEvent("click_explore_card", { card_title: "Team" })}
        >
          <span>Team</span>
          <h2>Who is building it</h2>
          <p>Company stewardship, capability design, partner trust, and long-term operating quality.</p>
          <strong>Open team page</strong>
        </a>
        <a
          className="landing-link-card jobs-link"
          href="/jobs"
          onClick={() => trackAnalyticsEvent("click_explore_card", { card_title: "Recruiting" })}
        >
          <span>Recruiting</span>
          <h2>Help build the platform</h2>
          <p>Open tracks for people working across product, partnerships, strategy, and operations.</p>
          <strong>Open jobs page</strong>
        </a>
      </div>
    </section>
  );
}

function UpcomingPilot() {
  return (
    <section className="spc-section pilot-news" id="pilot">
      <div className="section-label">
        <h2>Upcoming</h2>
      </div>
      <div className="pilot-news-inner">
        <div className="pilot-news-copy">
          <p>Founding cohort</p>
          <h2>A pilot is being prepared for early college users.</h2>
          <span>
            Novara is testing early learning experiences with a small founding cohort. Learn what
            Novara is building, get in touch with the team, and see how the founding cohort is
            taking shape.
          </span>
          <a
            className="outline-cta"
            href="/pilot"
            onClick={() => trackAnalyticsEvent("click_pilot_news_cta")}
          >
            <span>Ask about the cohort</span>
            <ArrowIcon />
          </a>
        </div>
        <figure className="pilot-flyer">
          <img
            alt="Novara founding cohort flyer"
            src="/novara-founding-cohort-flyer.png"
          />
        </figure>
      </div>
    </section>
  );
}

function PilotRecruitmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [activeFormStep, setActiveFormStep] = useState(0);
  const [fastTrackSelections, setFastTrackSelections] = useState<string[]>([]);
  const [developmentSelections, setDevelopmentSelections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const hasTrackedPilotFormStart = useRef(false);
  const pilotFormSteps = ["Profile", "Signals", "Goals", "Commitment"];

  const trackPilotFormStart = () => {
    if (hasTrackedPilotFormStart.current) {
      return;
    }

    hasTrackedPilotFormStart.current = true;
    trackAnalyticsEvent("pilot_form_start");
  };

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (next: string[]) => void,
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
    setSubmitted(false);
    setFormError("");
  };

  const validateCurrentStep = () => {
    const currentPanel = formRef.current?.querySelector<HTMLElement>(
      `[data-form-step="${activeFormStep}"]`,
    );

    if (!currentPanel) {
      return true;
    }

    const fields = Array.from(
      currentPanel.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        "input, select, textarea",
      ),
    );

    for (const field of fields) {
      if (!field.reportValidity()) {
        return false;
      }
    }

    if (activeFormStep === 1 && !fastTrackSelections.length) {
      setFormError("Please select at least one fast-track eligibility option.");
      return false;
    }

    if (activeFormStep === 2 && !developmentSelections.length) {
      setFormError("Please select at least one personal development goal.");
      return false;
    }

    setFormError("");
    return true;
  };

  const goToNextFormStep = () => {
    if (!validateCurrentStep()) {
      return;
    }
    setSubmitted(false);
    setActiveFormStep((step) => {
      const nextStep = Math.min(step + 1, pilotFormSteps.length - 1);
      if (nextStep !== step) {
        trackAnalyticsEvent("pilot_form_step_complete", {
          completed_step: step + 1,
          next_step: nextStep + 1,
        });
      }
      return nextStep;
    });
  };

  return (
    <main className="main-frame pilot-page">
      <section className="pilot-hero">
        <div className="pilot-hero-inner">
          <div className="pilot-hero-copy">
            <p>Novara founding cohort</p>
            <h1>Be early. Help shape what Novara becomes.</h1>
            <span>
              Novara is building a capability platform for the AI era. This pilot invites a small
              seed group to test early learning experiences, share feedback, and influence what gets
              built next.
            </span>
            <div className="hero-actions">
              <button
                className="outline-cta primary"
                type="button"
                onClick={() => {
                  trackAnalyticsEvent("click_pilot_start_application");
                  document.getElementById("pilot-form")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Start application</span>
                <ArrowIcon />
              </button>
            </div>
          </div>
          <figure className="pilot-hero-flyer">
            <img alt="Novara founding cohort flyer" src="/novara-founding-cohort-flyer.png" />
          </figure>
        </div>
      </section>

      <section className="spc-section pilot-strip" aria-label="Pilot highlights">
        <div>
          <span>35</span>
          <p>college places</p>
        </div>
        <div>
          <span>$10</span>
          <p>guaranteed for completed required testing and exit survey</p>
        </div>
        <div>
          <span>10</span>
          <p>additional $25 gift cards by drawing among eligible completers</p>
        </div>
      </section>

      <section className="spc-section pilot-section">
        <div className="section-label">
          <h2>What you are signing up for</h2>
        </div>
        <div className="track-cards pilot-step-cards">
          {pilotSteps.map((step, index) => (
            <article className="track-card" key={step.title}>
              <span className="track-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p className="meta">{step.meta}</p>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="spc-section pilot-section">
        <div className="section-label">
          <h2>Who the flyer is for</h2>
        </div>
        <div className="pilot-eligibility">
          <h2>Founding cohort fit</h2>
          <div>
            {pilotEligibility.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="pilot-form-section" id="pilot-form">
        <div className="pilot-form-inner">
          <div className="pilot-form-copy">
            <p>Official intake</p>
            <h2>Apply without leaving this page.</h2>
            <span>
              Complete the intake here. The application is submitted into Novara's official
              response system in the background, without sending applicants away from this page.
            </span>
          </div>
          <form
            action={pilotFormPostUrl}
            className="pilot-google-form"
            method="post"
            ref={formRef}
            onFocus={trackPilotFormStart}
            onSubmit={async (event) => {
              if (activeFormStep !== pilotFormSteps.length - 1) {
                event.preventDefault();
                goToNextFormStep();
                return;
              }
              event.preventDefault();
              trackAnalyticsEvent("pilot_form_submit_attempt");
              if (!fastTrackSelections.length || !developmentSelections.length) {
                setSubmitted(false);
                setFormError("Please complete the required checkbox questions before submitting.");
                trackAnalyticsEvent("pilot_form_submit_blocked", { reason: "missing_required_checkbox" });
                return;
              }
              setFormError("");
              setIsSubmitting(true);
              const form = event.currentTarget;
              try {
                await fetch(pilotFormPostUrl, {
                  method: "POST",
                  body: new FormData(form),
                  mode: "no-cors",
                });
                setSubmitted(true);
                trackAnalyticsEvent("pilot_form_submit_success");
                setFastTrackSelections([]);
                setDevelopmentSelections([]);
                setActiveFormStep(0);
                form.reset();
              } catch {
                setSubmitted(false);
                setFormError("We could not send your application. Please try again.");
                trackAnalyticsEvent("pilot_form_submit_error");
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <input name="fvv" type="hidden" value="1" />
            <input name="pageHistory" type="hidden" value="0" />
            <input name="entry.1311292733" type="hidden" value="Website direct signup" />
            {submitted ? (
              <div className="pilot-success-panel" role="status" aria-live="polite">
                <div className="pilot-success-mark" aria-hidden="true">
                  <span />
                </div>
                <p>Application received</p>
                <h3>You are on the founding cohort list.</h3>
                <span>
                  Thank you for applying. Novara will review the application and follow up with
                  next steps if there is a match for the pilot cohort.
                </span>
                <div className="pilot-success-rail" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            ) : (
              <>
            <div className="pilot-form-progress" aria-label="Application progress">
              {pilotFormSteps.map((step, index) => (
                <button
                  className={index === activeFormStep ? "is-active" : ""}
                  key={step}
                  type="button"
                  onClick={() => {
                    if (index <= activeFormStep || validateCurrentStep()) {
                      trackAnalyticsEvent("pilot_form_step_nav_click", {
                        from_step: activeFormStep + 1,
                        to_step: index + 1,
                      });
                      setActiveFormStep(index);
                    }
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </button>
              ))}
            </div>

            <div className="pilot-form-window">
              <div className="pilot-form-track">
                <div className="pilot-form-panel" data-form-step="0" aria-hidden={activeFormStep !== 0}>
                  <div className="pilot-panel-heading">
                    <p>Step 1</p>
                    <h3>Profile basics</h3>
                  </div>
                  <div className="pilot-panel-grid">
                    <label>
                      Full Name *
                      <input name="entry.639440409" placeholder="Your full name" required type="text" />
                    </label>
                    <label>
                      Email Address *
                      <input name="entry.1289368796" placeholder="you@example.com" required type="email" />
                    </label>
                    <label>
                      Age Group *
                      <select defaultValue="" name="entry.129208249" required>
                        <option value="" disabled>Select one</option>
                        {ageGroups.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Region *
                      <select defaultValue="" name="entry.1772927419" required>
                        <option value="" disabled>Select one</option>
                        {regions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Current School or Employer
                      <input name="entry.1161655588" placeholder="School, employer, or independent" type="text" />
                    </label>
                    <label className="field-wide">
                      Current GPA or Role/Company
                      <input name="entry.1309910543" placeholder="GPA, role, company, or N/A" type="text" />
                    </label>
                  </div>
                </div>

                <div className="pilot-form-panel" data-form-step="1" aria-hidden={activeFormStep !== 1}>
                  <div className="pilot-panel-heading">
                    <p>Step 2</p>
                    <h3>Signals and tools</h3>
                  </div>
                  <div className="pilot-panel-grid">
                    <label className="field-wide">
                      Notable Projects, Research, or Portfolio Links
                      <textarea name="entry.2087564402" placeholder="Links or short description" />
                    </label>
                    <fieldset className="field-wide option-field">
                      <legend>Fast-Track Eligibility *</legend>
                      {fastTrackOptions.map((option) => (
                        <label className="checkbox-field" key={option}>
                          <input
                            checked={fastTrackSelections.includes(option)}
                            name="entry.1788195517"
                            type="checkbox"
                            value={option}
                            onChange={() =>
                              toggleSelection(option, fastTrackSelections, setFastTrackSelections)
                            }
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </fieldset>
                    <label className="field-wide">
                      Prior learning platforms or tools used *
                      <textarea
                        name="entry.183795642"
                        placeholder="Coursera, Khan Academy, Duolingo, AI learning tools, tutoring apps, etc."
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="pilot-form-panel" data-form-step="2" aria-hidden={activeFormStep !== 2}>
                  <div className="pilot-panel-heading">
                    <p>Step 3</p>
                    <h3>Goals and judgment</h3>
                  </div>
                  <div className="pilot-panel-grid">
                    <label className="field-wide">
                      What abilities matter most for your future, and why? *
                      <textarea name="entry.1394160424" placeholder="Short answer" required />
                    </label>
                    <fieldset className="field-wide option-field">
                      <legend>Personal development goals *</legend>
                      {developmentGoals.map((option) => (
                        <label className="checkbox-field" key={option}>
                          <input
                            checked={developmentSelections.includes(option)}
                            name="entry.1286057109"
                            type="checkbox"
                            value={option}
                            onChange={() =>
                              toggleSelection(option, developmentSelections, setDevelopmentSelections)
                            }
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </fieldset>
                    <label className="field-wide">
                      Describe a real-world problem you want to solve
                      <textarea
                        name="entry.935698422"
                        placeholder="What problem matters, and what abilities would you need?"
                      />
                    </label>
                  </div>
                </div>

                <div className="pilot-form-panel" data-form-step="3" aria-hidden={activeFormStep !== 3}>
                  <div className="pilot-panel-heading">
                    <p>Step 4</p>
                    <h3>Availability and contribution</h3>
                  </div>
                  <div className="pilot-panel-grid">
                    <label className="field-wide">
                      How do you imagine AI helping you learn and grow?
                      <textarea name="entry.264859645" placeholder="Short answer" />
                    </label>
                    <label className="field-wide">
                      What would you like to explore or share with other early Novara participants?
                      <textarea
                        name="entry.836059629"
                        placeholder="Topics you are curious about, skills you are developing, projects you are building, or conversations you would enjoy having with other motivated people."
                      />
                    </label>
                    <label className="field-wide">
                      Optional Bonus
                      <textarea
                        name="entry.1946805303"
                        placeholder="Share a time you taught yourself something new, or a prediction about the future."
                      />
                    </label>
                    <fieldset className="field-wide option-field">
                      <legend>Weekly time availability for product engagement *</legend>
                      {availabilityOptions.map((option) => (
                        <label className="checkbox-field" key={option.label}>
                          <input name="entry.963156267" required type="radio" value={option.value} />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </fieldset>
                    <fieldset className="field-wide option-field">
                      <legend>Are you willing to provide feedback and participate in the community? *</legend>
                      {["Yes, I am willing to participate", "No"].map((option) => (
                        <label className="checkbox-field" key={option}>
                          <input name="entry.1031542068" required type="radio" value={option} />
                          <span>{option}</span>
                        </label>
                      ))}
                    </fieldset>
                    <label className="checkbox-field field-wide consent-field">
                      <input required type="checkbox" />
                      <span>
                        I confirm I am 18+ and consent to Novara collecting this information for the pilot. *
                      </span>
                    </label>
                    <p className="pilot-privacy-note field-wide">
                      Novara will use this information only to review pilot participation and related follow-up.
                      For privacy questions, contact <a href="mailto:aaron@novara.tech">aaron@novara.tech</a> or{" "}
                      <a href="mailto:ricardo@novara.tech">ricardo@novara.tech</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pilot-form-controls">
              <button
                disabled={activeFormStep === 0}
                type="button"
                onClick={() => {
                  setFormError("");
                  setActiveFormStep((step) => Math.max(step - 1, 0));
                }}
              >
                Back
              </button>
              {activeFormStep === pilotFormSteps.length - 1 ? (
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending application" : "Submit application"}
                </button>
              ) : (
                <button type="button" onClick={goToNextFormStep}>
                  Continue
                </button>
              )}
            </div>
            <p className={`form-status ${submitted || formError ? "visible" : ""}`}>
              {formError || "Submitted. Your response has been received."}
            </p>
              </>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

function TeamSection() {
  return (
    <section className="team-section" id="team">
      <div className="team-inner">
        <div className="team-heading">
          <h2>The operating team behind the network</h2>
          <p>
            People accountable for capability design, partner trust, and long-term execution.
          </p>
        </div>
        <div className="team-grid">
          {teamAreas.map((area, index) => (
            <article className="team-card" key={area.title}>
              <span className="team-token">{String(index + 1).padStart(2, "0")}</span>
              <p>{area.label}</p>
              <h3>{area.title}</h3>
              <span>{area.body}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JobApplications() {
  const [selectedTrack, setSelectedTrack] = useState(jobTracks[0].title);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="jobs-section" id="jobs">
      <div className="jobs-inner">
        <div className="section-label">
          <h2>Apply for a job</h2>
        </div>
        <div className="jobs-heading">
          <h2>Open tracks for people who want to build the system</h2>
          <p>
            Job interest is separate from general network onboarding. Selected roles are reviewed
            through a structured process.
          </p>
        </div>
        <div className="jobs-grid">
          {jobTracks.map((track) => (
            <button
              className={`job-card ${selectedTrack === track.title ? "active" : ""}`}
              key={track.title}
              type="button"
              onClick={() => {
                setSelectedTrack(track.title);
                setSubmitted(false);
              }}
            >
              <span>{track.status}</span>
              <strong>{track.title}</strong>
              <p>{track.body}</p>
            </button>
          ))}
        </div>
        <div className="job-apply-panel">
          <div>
            <p className="eyebrow">Selected track</p>
            <h3>{selectedTrack}</h3>
            <p>
              Selected roles and partnership tracks are currently being reviewed through a
              structured process. Use this route for role-specific interest, referrals, or
              recruiting conversations.
            </p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label>
              Name
              <input placeholder="Your name" type="text" required />
            </label>
            <label>
              Email
              <input placeholder="you@example.com" type="email" required />
            </label>
            <label>
              Background
              <input placeholder="Role, company, or focus area" type="text" required />
            </label>
            <button type="submit">Apply for this track</button>
            <p className={`form-status ${submitted ? "visible" : ""}`}>
              Received for role review.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function StayInLoop() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const hasTrackedContactFormStart = useRef(false);

  const trackContactFormStart = () => {
    if (hasTrackedContactFormStart.current) {
      return;
    }

    hasTrackedContactFormStart.current = true;
    trackAnalyticsEvent("contact_form_start");
  };

  return (
    <section className="loop-section" id="contact">
      <div className="loop-inner">
        <h2>Contact Novara.</h2>
        <form
          className="intake-form"
          onChange={() => {
            trackContactFormStart();
            if (submitted) {
              setSubmitted(false);
            }
            if (formError) {
              setFormError(false);
            }
          }}
          name="novara-contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={async (event) => {
            event.preventDefault();
            trackAnalyticsEvent("contact_form_submit_attempt");
            const form = event.currentTarget;
            const formData = new FormData(form);

            try {
              const response = await fetch("/__forms.html", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as unknown as string[][]).toString(),
              });

              if (!response.ok) {
                throw new Error("Contact form submission failed");
              }

              setSubmitted(true);
              trackAnalyticsEvent("contact_form_submit_success");
              form.reset();
              setEmail("");
            } catch {
              setFormError(true);
              trackAnalyticsEvent("contact_form_submit_error");
            }
          }}
        >
          <input type="hidden" name="form-name" value="novara-contact" />
          <input type="hidden" name="contact_destination" value="aaron@novara.tech, ricardo@novara.tech" />
          <input type="hidden" name="subject" value="New Novara contact inquiry" />
          <label className="hidden-field">
            Do not fill this out
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
          <label>
            Name
            <input name="name" placeholder="Your name" type="text" required />
          </label>
          <label>
            Email
            <input
              name="email"
              placeholder="you@example.com"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmitted(false);
              }}
            />
          </label>
          <label>
            Path
            <select name="path" defaultValue="" required>
              <option value="" disabled>Select one</option>
              <option>General introduction</option>
              <option>Candidate or contributor</option>
              <option>Team or employer</option>
              <option>School or university</option>
              <option>Strategic partner</option>
              <option>Founding cohort pilot</option>
            </select>
          </label>
          <label>
            City / Region
            <input name="city_region" placeholder="City or region" type="text" required />
          </label>
          <label className="context-field">
            Additional context (optional)
            <textarea
              name="message"
              placeholder="Anything useful for us to know? Role, organization, what prompted you to reach out, or the best way to follow up."
            />
          </label>
          <button className={submitted ? "is-submitted" : ""} type="submit">
            {submitted ? "Received" : "Send message"}
          </button>
          <div
            className={`form-status ${submitted || formError ? "visible" : ""} ${formError ? "error" : ""}`}
            role="status"
            aria-live="polite"
          >
            <span>{formError ? "Not sent." : "Received."}</span>
            <p>
              {formError
                ? "Please email aaron@novara.tech and ricardo@novara.tech directly."
                : "We’ll follow up by email."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-inner">
        {eyebrow ? <p>{eyebrow}</p> : null}
        <h1>{title}</h1>
        <span>{body}</span>
      </div>
    </section>
  );
}

function LandingPage({ onLightChange }: { onLightChange: (isOn: boolean) => void }) {
  return (
    <main className="main-frame">
      <Hero />
      <SquiggleLine onLightChange={onLightChange} />
      <WhyNow />
      <HowToStart />
      <CapabilityPaths />
      <GlobalChallenges />
      <EntryPoints />
      <UpcomingPilot />
      <LandingLinks />
      <StayInLoop />
    </main>
  );
}

function TeamPage() {
  return (
    <main className="main-frame page-main">
      <PageHero
        eyebrow="Team"
        title="The institution behind the network"
        body="Novara needs visible stewardship: people accountable for capability design, partner trust, and long-term operating quality."
      />
      <TeamSection />
      <section className="page-cta">
        <a className="outline-cta large" href="/jobs">
          <span>View open tracks</span>
          <ArrowIcon />
        </a>
      </section>
    </main>
  );
}

function JobsPage() {
  return (
    <main className="main-frame page-main jobs-page">
      <PageHero
        title="Build the capability network"
        body="Open tracks are reviewed separately from general network onboarding. This page is for role-specific interest, referrals, and recruiting conversations."
      />
      <JobApplications />
      <section className="page-cta">
        <a className="outline-cta large" href="/#contact">
          <span>Contact Novara</span>
          <ArrowIcon />
        </a>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer" id="timeline">
      <div className="footer-inner">
        <div className="footer-brand">
          <span>Novara</span>
          <span>Global capability network</span>
          <span>© 2026 All rights reserved.</span>
        </div>
        {footerGroups.map((group) => (
          <ul key={group[0]}>
            {group.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  );
}

function App() {
  const [isLightOn, setIsLightOn] = useState(false);
  const pathname = window.location.pathname;
  const page =
    pathname === "/team" ? (
      <TeamPage />
    ) : pathname === "/jobs" ? (
      <JobsPage />
    ) : pathname === "/pilot" ? (
      <PilotRecruitmentPage />
    ) : (
      <LandingPage onLightChange={setIsLightOn} />
    );
  const isInteriorPage = pathname === "/team" || pathname === "/jobs" || pathname === "/pilot";

  return (
    <div className={`app-shell ${isLightOn || isInteriorPage ? "light-on" : ""}`}>
      <Header isPilot={pathname === "/pilot"} />
      {page}
      {pathname === "/pilot" ? null : <Footer />}
    </div>
  );
}

export default App;
