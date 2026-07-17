import { useEffect, useRef, useState } from "react";

const capabilityPaths = [
  {
    title: "Judgment",
    body: "Makes good calls when the answer is not obvious.",
    color: "var(--paper)",
  },
  {
    title: "Systems Thinking",
    body: "Sees the incentives, bottlenecks, and second-order effects.",
    color: "var(--amber)",
  },
  {
    title: "Long-term Thinking",
    body: "Can reason across years, not only quarters.",
    color: "var(--steel)",
  },
  {
    title: "Human-AI Collaboration",
    body: "Uses AI as leverage without outsourcing responsibility.",
    color: "var(--moss)",
  },
];

const tracks = [
  {
    title: "Assess",
    meta: "Capability signals",
    body: "Understand how someone thinks, decides, and learns.",
  },
  {
    title: "Connect",
    meta: "Trusted network",
    body: "Bring high-potential people and serious partners into the same system.",
  },
  {
    title: "Route",
    meta: "Opportunities",
    body: "Match capability to roles, research, partners, and long-term work.",
  },
];

const happens = [
  {
    title: "Exceptional candidates",
    body: "Get assessed for judgment, structural thinking, and long-term capability.",
  },
  {
    title: "Strategic partners",
    body: "Find people and programs aligned with serious capability needs.",
  },
  {
    title: "Researchers and builders",
    body: "Contribute to assessment, learning theory, and human-AI collaboration.",
  },
  {
    title: "City and ecosystem leads",
    body: "Build local nodes without making city partnerships the whole story.",
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

const footerGroups = [
  ["Capability System", "Assessment", "Network", "Opportunity Layer"],
  ["Engage", "Candidates", "City Partners", "Strategic Partners", "Researchers"],
  ["Careers", "Open Tracks", "Role Review", "Recruiting Inquiries"],
  ["Timeline", "Future Capability Summit", "Learning Theory Conference", "Contact"],
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

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    ["System", "/#system"],
    ["Signals", "/#network"],
    ["Paths", "/#tracks"],
    ["Team", "/team"],
    ["Jobs", "/jobs"],
    ["Apply", "/#apply"],
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="apply-block" href="/#apply">
          Apply
        </a>
        <div className="nav-shell">
          <nav className="main-nav" aria-label="Primary navigation">
            {links.slice(0, 5).map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
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
                <a href={href} key={href} onClick={() => setIsMenuOpen(false)}>
                  {label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="top">
      <h1>Novara helps exceptional judgment find its place in the AI era</h1>
      <p>
        We identify, connect, and support people with rare judgment, structural understanding,
        and long-term thinking.
      </p>
      <a className="outline-cta" href="/#system">
        <span>Explore the system</span>
        <ArrowIcon />
      </a>
    </section>
  );
}

function SquiggleLine({ onLightChange }: { onLightChange: (isOn: boolean) => void }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const lastLightStateRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pathLength = path.getTotalLength();
    let frame = 0;

    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const render = () => {
      const viewportHeight = window.innerHeight || 1;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.getBoundingClientRect().height;
      const startScroll = Math.max(0, sectionTop - viewportHeight * 0.55);
      const baseEndScroll = sectionTop + sectionHeight * 0.7;
      const endScroll = startScroll + (baseEndScroll - startScroll) / 2.16;
      const scrollRange = Math.max(1, endScroll - startScroll);
      const viewportWidth = window.innerWidth || window.visualViewport?.width || 1;
      const viewportToScreenRatio = viewportWidth / Math.max(1, window.screen.width);
      const shouldResolveWideLayout = viewportWidth >= 2200 || viewportToScreenRatio >= 1.7;
      const rawProgress = (window.scrollY - startScroll) / scrollRange;
      const progress = Math.max(0, Math.min(1, rawProgress));
      const visualProgress = reduceMotion || shouldResolveWideLayout
        ? 1
        : progress >= 0.985 ? 1 : progress;
      const activeLength = pathLength * visualProgress;

      if (shouldResolveWideLayout) {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      } else {
        path.style.strokeDasharray = `${pathLength}`;
        path.style.strokeDashoffset = `${pathLength - activeLength}`;
      }
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
        <path
          className="squiggle-guide"
          d={squigglePathData}
        />
        <path
          className="squiggle-path"
          ref={pathRef}
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
        <h2>The system</h2>
      </div>
      <div className="intro-grid">
        <div>
          <h3>From raw capability to meaningful opportunity</h3>
          <p>
            Novara is building the operating layer for a world where information is abundant and
            judgment is scarce.
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
          <a className="track-card" href="#apply" key={track.title}>
            <span className="track-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{track.title}</h3>
            <p className="meta">{track.meta}</p>
            <p>{track.body}</p>
          </a>
        ))}
      </div>
      <div className="center-cta">
        <a className="outline-cta large" href="#apply">
          <span>Get started</span>
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
        <h2>What we look for</h2>
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
        <a className="outline-cta" href="#tracks">
          Choose a path
        </a>
      </div>
    </section>
  );
}

function WhatHappens() {
  return (
    <section className="happens-section" id="tracks">
      <div className="happens-inner">
        <aside>
          <p>Who it is for</p>
          <ol>
            <li>Candidates</li>
            <li>Partners</li>
            <li>Builders</li>
            <li>City nodes</li>
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
        <h2>Next</h2>
      </div>
      <div className="landing-link-grid">
        <a className="landing-link-card team-link" href="/team">
          <span>Credibility</span>
          <h2>Meet the people building Novara</h2>
          <p>Team, advisors, operating ownership, and the public structure behind the network.</p>
          <strong>Open team page</strong>
        </a>
        <a className="landing-link-card jobs-link" href="/jobs">
          <span>Recruiting</span>
          <h2>View current open tracks</h2>
          <p>Role categories, selected track review, and the job-specific application path.</p>
          <strong>Open jobs page</strong>
        </a>
      </div>
    </section>
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

  return (
    <section className="loop-section" id="apply">
      <div className="loop-inner">
        <h2>Join the network or start a partnership conversation</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (email.trim()) {
              setSubmitted(true);
            }
          }}
        >
          <label>
            Email
            <input
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmitted(false);
              }}
            />
          </label>
          <button type="submit">Submit intake</button>
          <p className={`form-status ${submitted ? "visible" : ""}`}>
            Received. We will route this through the broader Novara intake list.
          </p>
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
      <HowToStart />
      <CapabilityPaths />
      <WhatHappens />
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
        <a className="outline-cta large" href="/#apply">
          <span>Join general intake</span>
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
    ) : (
      <LandingPage onLightChange={setIsLightOn} />
    );
  const isInteriorPage = pathname === "/team" || pathname === "/jobs";

  return (
    <div className={`app-shell ${isLightOn || isInteriorPage ? "light-on" : ""}`}>
      <Header />
      {page}
      <Footer />
    </div>
  );
}

export default App;
