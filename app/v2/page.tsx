"use client";

import { useEffect, useRef, useState } from "react";

const COLLAB_IMG =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";
const CHAIRMAN_IMG =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80";

function MIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontFamily: '"Material Symbols Outlined"' }}
    >
      {name}
    </span>
  );
}

function StatCounter({
  target,
  suffix = "",
  duration = 1500,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function HeroAnimation() {
  const courses = ["AI", "PRMPT", "GFX", "FREE", "MKT", "COM", "WEB"];
  const nodes = courses.map((label, i) => {
    const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 100 + 72 * Math.cos(angle),
      y: 100 + 72 * Math.sin(angle),
      label,
    };
  });

  return (
    <div className="absolute inset-0 bg-[#0B0D10] overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 200 112"
      >
        <defs>
          <pattern id="hero-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#C9A74B" strokeWidth="0.15" />
          </pattern>
        </defs>
        <rect width="200" height="112" fill="url(#hero-grid)" />
      </svg>

      <div className="relative h-full p-3 sm:p-4 flex gap-3 sm:gap-4">
        {/* Terminal pane */}
        <div className="flex-1 min-w-0 bg-black/50 border border-white/10 rounded-lg flex flex-col overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-white/40 font-mono text-[10px] sm:text-xs truncate">
              aspire · lab terminal
            </span>
          </div>
          <div className="flex-1 p-3 sm:p-4 font-mono text-[11px] sm:text-[13px] leading-relaxed space-y-1.5 overflow-hidden">
            <div className="term-line" style={{ animationDelay: "0.2s" }}>
              <span className="text-white/40">$</span>{" "}
              <span className="text-[#A9F2A9]">aspire login --campus lahore</span>
            </div>
            <div className="term-line" style={{ animationDelay: "1.0s" }}>
              <span className="text-[#C9A74B]">✓</span>{" "}
              <span className="text-white/70">authenticated · student_A</span>
            </div>
            <div className="term-line" style={{ animationDelay: "1.9s" }}>
              <span className="text-white/40">$</span>{" "}
              <span className="text-[#A9F2A9]">run capstone --task portfolio</span>
            </div>
            <div className="term-line" style={{ animationDelay: "2.8s" }}>
              <span className="text-white/50">› compiling sections ·</span>{" "}
              <span className="text-[#C9A74B]">07 / 07</span>
            </div>
            <div className="term-line" style={{ animationDelay: "3.7s" }}>
              <span className="text-[#C9A74B]">✓</span>{" "}
              <span className="text-white/70">deployed · ait.edu.pk/s/8f3a</span>
            </div>
            <div className="term-line" style={{ animationDelay: "4.6s" }}>
              <span className="text-white/40">$</span>{" "}
              <span className="cursor-blink text-white">▍</span>
            </div>
          </div>
        </div>

        {/* Node graph pane */}
        <div className="hidden sm:flex w-[38%] shrink-0 bg-black/50 border border-white/10 rounded-lg flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between shrink-0">
            <span className="text-white/40 font-mono text-[10px]">CURRICULAR NODES</span>
            <span className="text-[#C9A74B] font-mono text-[10px]">07</span>
          </div>
          <div className="flex-1 flex items-center justify-center p-3">
            <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px]">
              {nodes.map((n, i) => (
                <line
                  key={`l-${i}`}
                  x1="100"
                  y1="100"
                  x2={n.x}
                  y2={n.y}
                  stroke="#C9A74B"
                  strokeOpacity="0.28"
                  strokeWidth="0.6"
                />
              ))}
              {nodes.map((n, i) => (
                <g key={`n-${i}`}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="5"
                    fill="#C8102E"
                    className="node-pulse"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  />
                  <text
                    x={n.x}
                    y={n.y - 10}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.65)"
                    fontSize="6"
                    fontFamily="monospace"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <circle
                cx="100"
                cy="100"
                r="16"
                fill="rgba(0,0,0,0.5)"
                stroke="#C9A74B"
                strokeWidth="0.8"
                opacity="0.85"
              />
              <circle
                cx="100"
                cy="100"
                r="16"
                fill="none"
                stroke="#C9A74B"
                strokeWidth="0.6"
                className="ring-pulse"
              />
              <text
                x="100"
                y="104"
                textAnchor="middle"
                fill="#C9A74B"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                AIT
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const PAIN = [
  { icon: "schedule", line: "My degree ends in two years and I still don't earn a rupee." },
  { icon: "work_off", line: "Every job post wants experience I was never allowed to get." },
  { icon: "currency_exchange", line: "I see people my age billing in dollars and I don't even know where to start." },
  { icon: "psychology", line: "I can prompt ChatGPT — but I can't turn that into income." },
  { icon: "school", line: "My college doesn't teach any of this, and the free YouTube rabbit hole goes nowhere." },
  { icon: "smart_toy", line: "By the time I graduate, AI will have taken the job I was studying for." },
];

const COURSES = [
  { n: "01", title: "AI Basics", desc: "How the models actually work. What they're good at.", tag: "Core Theory" },
  { n: "02", title: "Prompt Engineering", desc: "Clean, reliable output from any model.", tag: "Precision Engineering" },
  { n: "03", title: "Graphics & Video", desc: "Make things people want to look at.", tag: "Creative Suite" },
  { n: "04", title: "Freelance & Portfolio", desc: "Package your skill into something a client can hire.", tag: "Packaging & Delivery" },
  { n: "05", title: "Marketing & E-commerce", desc: "Paid, organic and marketplace storefronts that sell.", tag: "E-com Architecture" },
  { n: "06", title: "Communication & Earning", desc: "Pitch, negotiate, and keep clients coming back.", tag: "Dollar Rails Setup", highlight: true },
  { n: "07", title: "Web Dev with AI", desc: "Ship real websites and tools with modern AI tooling.", tag: "Capstone Deployment", secondary: true },
];

const MARQUEE = [
  "Earn in dollars",
  "AI basics",
  "Payoneer",
  "Prompt engineering",
  "Wise",
  "Graphics & video",
  "Upwork",
  "Freelance & portfolio",
  "Fiverr",
  "Marketing & e-commerce",
  "Daraz",
  "Communication & earning",
  "Web dev with AI",
];

const WINS = [
  { amount: "$350", platform: "Payoneer", who: "Student A · Lahore", what: "Social media pack for a dental clinic in the UK.", foot: "Cleared via Payoneer", side: "2 Days Work" },
  { amount: "$1,040", platform: "Upwork", who: "Student B · Karachi", what: "Three short editing contracts across one month.", foot: "Direct Contract", side: "Month 1 Cohort", tag: "secondary" },
  { amount: "$85", platform: "Fiverr", who: "Student C · Multan", what: "First order, five days after publishing the gig.", foot: "Level 0 Debut", side: "5 Stars" },
  { amount: "$400", platform: "Wise · retainer", who: "Student D · Islamabad", what: "Monthly content retainer for a UK startup.", foot: "Recurring Wire", side: "Contract signed", tag: "tertiary" },
];

const FAQS = [
  {
    q: "Do I need to be an existing Aspire college student to enroll?",
    a: "AIT is open to current Aspire students as well as external applicants through campus-specific quotas. External applicants are assigned to the nearest Aspire campus facility for terminal and faculty access.",
  },
  {
    q: "How are Payoneer and Wise accounts configured in Pakistan?",
    a: "Course 06 guides students through identity verification, CNIC/passport compliance, and linking local Pakistani bank accounts (such as Meezan, HBL, or standard commercial banks) for direct automated settlement in PKR.",
  },
  {
    q: "What hardware or computer specifications do I need?",
    a: "Because AIT operates physical on-campus labs, all heavy model computing is handled on Aspire campus workstations. Any basic laptop or mobile device suffices for home assignment review.",
  },
  {
    q: "How does the public verification URL work for employers?",
    a: "Every graduate receives a persistent permalink under the ait.edu.pk registry. International recruiters can view the candidate's verified grade, Capstone live artifacts, and issuing campus dean signoff with no login required.",
  },
  {
    q: "What happens if I miss physical lab sessions?",
    a: "Lab sessions are recorded and paired with digital telemetry checkpoints. However, a minimum 75% physical campus attendance is required to sit for the final Capstone certification.",
  },
  {
    q: "Is there a money-back policy or need-based scholarship?",
    a: "Aspire offers merit-based and need-based fee remissions directly assessed at your campus administration office. If you are unable to continue within the first 14 days, prorated refunds are handled on-site.",
  },
];

function ScrollProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? Math.max(0, Math.min(100, (h.scrollTop / total) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-transparent pointer-events-none">
      <div className="h-full bg-primary origin-left" style={{ width: `${p}%` }} />
    </div>
  );
}

function CursorSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--x", `${cx}px`);
      el.style.setProperty("--y", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    parent.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(420px circle at var(--x, 50%) var(--y, 30%), rgba(118, 0, 9, 0.10), transparent 68%)",
      }}
    />
  );
}

function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0, 0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return (
    <span
      ref={ref}
      className={`inline-flex transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

function SceneProblem() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 text-center">
      <div className="flex items-end gap-6 sm:gap-14 mb-10">
        <div className="scene-fade-up">
          <div className="font-mono text-[10px] sm:text-xs text-white/40 tracking-widest mb-2">
            YEARS SPENT
          </div>
          <div className="font-sans text-5xl sm:text-7xl font-extrabold text-white leading-none">
            4
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-white/40 mt-2">
            on your degree
          </div>
        </div>
        <div className="scene-fade-up scene-delay-1 font-sans text-3xl sm:text-5xl text-white/25 pb-5">
          ·
        </div>
        <div className="scene-fade-up scene-delay-2">
          <div className="font-mono text-[10px] sm:text-xs text-white/40 tracking-widest mb-2">
            EARNED SO FAR
          </div>
          <div className="font-sans text-5xl sm:text-7xl font-extrabold text-primary leading-none">
            0
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-white/40 mt-2">PKR</div>
        </div>
      </div>
      <p className="scene-fade-up scene-delay-4 text-white font-sans text-lg sm:text-2xl uppercase tracking-tight max-w-md font-bold">
        Your degree ends.{" "}
        <span className="text-primary">Your income hasn&apos;t started.</span>
      </p>
    </div>
  );
}

function SceneCourses() {
  const courses = ["AI", "PROMPT", "GFX", "FREE", "MKT", "COM", "WEB"];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 text-center">
      <div className="scene-fade-up text-[10px] sm:text-xs font-mono text-[#C9A74B] tracking-[0.25em] mb-4">
        THE CURRICULUM
      </div>
      <h3 className="scene-fade-up scene-delay-1 text-white font-sans text-2xl sm:text-4xl font-extrabold uppercase mb-10 max-w-md">
        Seven courses. <span className="text-primary">one</span> path.
      </h3>
      <div className="flex gap-2 sm:gap-3 flex-wrap justify-center max-w-2xl">
        {courses.map((c, i) => (
          <div
            key={c}
            className={`scene-fade-up scene-delay-${Math.min(i + 2, 8)} px-3 py-2 bg-white/5 border border-[#C9A74B]/40 rounded font-mono text-[10px] sm:text-xs text-white`}
          >
            <span className="text-[#C9A74B] mr-1">0{i + 1}</span>
            {c}
          </div>
        ))}
      </div>
      <p className="scene-fade-up scene-delay-8 text-white/50 font-mono text-[10px] sm:text-xs mt-8">
        One semester · delivered across 100+ campuses
      </p>
    </div>
  );
}

function SceneShip() {
  const files = [
    { name: "portfolio.site", status: "shipped", when: "wk 02" },
    { name: "ad-30s.mp4", status: "shipped", when: "wk 04" },
    { name: "brand-kit.ai", status: "shipping", when: "wk 06" },
    { name: "pitch-deck.pdf", status: "queued", when: "wk 08" },
  ];
  return (
    <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-center">
      <div className="scene-fade-up text-[10px] sm:text-xs font-mono text-[#C9A74B] tracking-[0.25em] mb-3">
        LEARN BY SHIPPING
      </div>
      <h3 className="scene-fade-up scene-delay-1 text-white font-sans text-2xl sm:text-4xl font-extrabold uppercase mb-8 max-w-lg">
        Real work. <span className="text-primary">every</span> week.
      </h3>
      <div className="space-y-2 max-w-xl bg-black/40 border border-white/10 rounded-lg p-3">
        <div className="scene-fade-up scene-delay-1 flex items-center justify-between px-3 pb-2 border-b border-white/10 font-mono text-[10px] text-white/40">
          <span>FILE</span>
          <span className="flex items-center gap-4">
            <span>STATUS</span>
            <span>DEADLINE</span>
          </span>
        </div>
        {files.map((f, i) => (
          <div
            key={f.name}
            className={`scene-fade-up scene-delay-${i + 2} flex items-center justify-between px-3 py-2 bg-white/5 rounded font-mono text-[11px] sm:text-xs`}
          >
            <span className="text-white/80">{f.name}</span>
            <span className="flex items-center gap-4">
              <span
                className={
                  f.status === "shipped"
                    ? "text-[#A9F2A9]"
                    : f.status === "shipping"
                    ? "text-[#C9A74B]"
                    : "text-white/40"
                }
              >
                {f.status.toUpperCase()}
              </span>
              <span className="text-white/40">{f.when}</span>
            </span>
          </div>
        ))}
      </div>
      <p className="scene-fade-up scene-delay-6 text-white/50 font-mono text-[10px] sm:text-xs mt-6 max-w-lg">
        AI gives instant feedback. Teachers finalize the grade.
      </p>
    </div>
  );
}

function SceneDollars() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 text-center">
      <div className="scene-fade-up text-[10px] sm:text-xs font-mono text-[#C9A74B] tracking-[0.25em] mb-3">
        PAYOUT ARCHITECTURE
      </div>
      <h3 className="scene-fade-up scene-delay-1 text-white font-sans text-2xl sm:text-4xl font-extrabold uppercase mb-10">
        Dollars. <span className="text-primary">directly.</span>
      </h3>
      <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs max-w-3xl flex-wrap justify-center">
        <div className="scene-fade-up scene-delay-2 px-3 py-2 bg-white/5 border border-white/20 rounded text-white">
          International Client
        </div>
        <span className="scene-fade-up scene-delay-3 text-[#C9A74B]">→</span>
        <div className="scene-fade-up scene-delay-3 px-3 py-2 bg-white/5 border border-[#C9A74B]/40 rounded text-white">
          Freelance Platform
        </div>
        <span className="scene-fade-up scene-delay-4 text-[#C9A74B]">→</span>
        <div className="scene-fade-up scene-delay-4 px-3 py-2 bg-primary text-white border border-primary rounded font-semibold">
          Payoneer · Wise
        </div>
        <span className="scene-fade-up scene-delay-5 text-[#C9A74B]">→</span>
        <div className="scene-fade-up scene-delay-5 px-3 py-2 bg-white/5 border border-white/20 rounded text-white">
          PKR · Local Bank
        </div>
      </div>
      <div className="scene-fade-up scene-delay-6 mt-10 flex items-baseline gap-2">
        <span className="font-mono text-[10px] sm:text-xs text-white/40">
          FIRST-COHORT PROJECTION ·
        </span>
        <span className="font-sans text-xl sm:text-3xl font-extrabold text-primary">
          $200 – $1,500
        </span>
        <span className="font-mono text-[10px] sm:text-xs text-white/40">/ MONTH</span>
      </div>
      <p className="scene-fade-up scene-delay-7 text-white/40 font-mono text-[10px] sm:text-xs mt-3 max-w-md">
        Set up during Course 06 · CNIC verified, local bank linked
      </p>
    </div>
  );
}

function SceneCTA() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 text-center">
      <div className="scene-fade-up text-[10px] sm:text-xs font-mono text-[#C9A74B] tracking-[0.25em] mb-4">
        SPRING 2027 COHORT
      </div>
      <h3 className="scene-fade-up scene-delay-1 text-white font-sans text-3xl sm:text-5xl font-extrabold uppercase mb-6 leading-none">
        Be the <span className="text-primary">first</span> to join.
      </h3>
      <p className="scene-fade-up scene-delay-2 text-white/60 max-w-md mb-8 text-sm sm:text-base">
        Invites open per campus. First-come allocation.
      </p>
      <div className="scene-fade-up scene-delay-3">
        <div className="scene-cta-pulse inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-sans font-bold uppercase tracking-widest rounded-full text-xs sm:text-sm">
          Reserve your seat
          <span>→</span>
        </div>
      </div>
      <p className="scene-fade-up scene-delay-4 mt-6 text-white/40 font-mono text-[10px] sm:text-xs">
        No payment at this stage.
      </p>
    </div>
  );
}

function ExplainerVideo() {
  const SCENES = [
    { id: "problem", label: "The gap", duration: 11000, Component: SceneProblem },
    { id: "courses", label: "Seven courses", duration: 13000, Component: SceneCourses },
    { id: "ship", label: "Ship weekly", duration: 12000, Component: SceneShip },
    { id: "dollars", label: "Dollar rails", duration: 13000, Component: SceneDollars },
    { id: "cta", label: "Join", duration: 9000, Component: SceneCTA },
  ];

  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const duration = SCENES[idx].duration;
    const start = performance.now() - elapsed;
    let raf = 0;
    const tick = (t: number) => {
      const e = t - start;
      if (e >= duration) {
        setIdx((i) => (i + 1) % SCENES.length);
        setElapsed(0);
        return;
      }
      setElapsed(e);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, playing]);

  const CurrentScene = SCENES[idx].Component;
  const totalDur = SCENES.reduce((s, x) => s + x.duration, 0);
  const totalElapsed =
    SCENES.slice(0, idx).reduce((s, x) => s + x.duration, 0) + elapsed;

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  };

  return (
    <div className="absolute inset-0 bg-[#0B0D10] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-5 py-2.5 flex items-center justify-between text-white/60 font-mono text-[10px] sm:text-xs border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>AIT · PROGRAM OVERVIEW</span>
        </div>
        <span className="text-white/40">
          {fmt(totalElapsed)} / {fmt(totalDur)}
        </span>
      </div>

      {/* Scene stage */}
      <div className="flex-1 relative">
        <CurrentScene key={idx} />
      </div>

      {/* Controls */}
      <div className="px-4 sm:px-5 py-3 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors shrink-0"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <rect x="1.5" y="1" width="2.5" height="8" />
                <rect x="6" y="1" width="2.5" height="8" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M2 1 L9 5 L2 9 Z" />
              </svg>
            )}
          </button>
          <div className="flex-1 flex gap-1">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setIdx(i);
                  setElapsed(0);
                }}
                className="flex-1 h-0.5 bg-white/15 rounded-full relative overflow-hidden"
                aria-label={`Scene ${i + 1}: ${s.label}`}
              >
                <div
                  className="absolute inset-0 bg-primary origin-left"
                  style={{
                    transform: `scaleX(${
                      i < idx ? 1 : i === idx ? elapsed / SCENES[idx].duration : 0
                    })`,
                    transition: i === idx ? "none" : "transform 0.3s ease",
                    transformOrigin: "left center",
                  }}
                />
              </button>
            ))}
          </div>
          <span className="text-white/40 font-mono text-[10px] shrink-0">
            {idx + 1}/{SCENES.length}
          </span>
        </div>
      </div>
    </div>
  );
}

function HorizontalCourseScroll({ courses }: { courses: typeof COURSES }) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(mql.matches && !reduced.matches);
    const update = () => setEnabled(mql.matches && !reduced.matches);
    mql.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mql.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const parent = parentRef.current;
    const track = trackRef.current;
    if (!parent || !track) return;
    const count = courses.length;
    const update = () => {
      const rect = parent.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = parent.offsetHeight - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const translatePct = progress * (count - 1) * 100;
      track.style.transform = `translateX(-${translatePct}vw)`;
      setActiveIdx(Math.round(progress * (count - 1)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled, courses.length]);

  if (!enabled) {
    // Fallback: vertical stack on mobile or reduced-motion
    return (
      <section className="py-24 px-gutter max-w-7xl mx-auto w-full" id="curriculum">
        <div className="reveal text-center max-w-3xl mx-auto mb-16">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            The curriculum
          </span>
          <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2">
            SEVEN COURSES. one AIT CERTIFICATE.
          </h2>
        </div>
        <div className="space-y-4">
          {courses.map((c, i) => (
            <div
              key={c.n}
              className={`reveal reveal-d${Math.min(i, 6)} bg-surface-container-lowest rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm`}
            >
              <div className="flex items-start gap-5">
                <span className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-base shrink-0">
                  {c.n}
                </span>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">{c.title}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">{c.desc}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-low text-on-surface-variant">
                {c.tag}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={parentRef}
      className="relative w-full bg-surface"
      style={{ height: `${courses.length * 90}vh` }}
      id="curriculum"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Heading overlay */}
        <div className="pt-16 text-center px-gutter pointer-events-none">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            The curriculum · horizontal path
          </span>
          <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2">
            SEVEN COURSES. one AIT CERTIFICATE.
          </h2>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 overflow-hidden flex items-center">
          <div ref={trackRef} className="flex h-full w-max will-change-transform">
            {courses.map((c, i) => (
              <div
                key={c.n}
                className="w-screen h-full shrink-0 flex items-center justify-center px-8 sm:px-16"
              >
                <div className="max-w-3xl w-full">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-label-sm text-primary tracking-widest">
                      COURSE · {c.n}
                    </span>
                    <span className="font-mono text-label-sm text-on-surface-variant">
                      {i + 1} / {courses.length}
                    </span>
                  </div>
                  <h3 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface uppercase font-extrabold leading-[0.95] mb-6">
                    {c.title}
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8">
                    {c.desc}
                  </p>
                  <div className="inline-flex px-4 py-2 bg-primary-fixed text-primary font-label-lg font-bold rounded-full">
                    {c.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="pb-10 flex items-center justify-center gap-2">
          {courses.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full transition-all duration-500 ${
                i === activeIdx ? "w-10 bg-primary" : "w-5 bg-on-surface-variant/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll<HTMLElement>(".reveal");

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <ScrollProgressBar />
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/85 backdrop-blur-xl border-b border-surface-container-highest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md shrink-0">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary">
              <MIcon name="school" className="text-lg" />
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">Aspire</span>
              <span className="text-on-surface-variant font-body-sm text-body-sm">·</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-normal">AIT</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <a
              className="hidden sm:inline-flex font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
              href="/signin"
            >
              Sign in
            </a>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-colors"
            >
              Waitlist
              <MIcon name="arrow_forward" className="text-base" />
            </a>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          {/* SECTION 1: HERO */}
          <section className="relative w-full py-20 lg:py-28 px-gutter overflow-hidden bg-surface">
            <CursorSpotlight />
            <div className="hero-glow-animate absolute top-1/4 left-1/2 w-[700px] h-[360px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-primary-fixed/50 text-on-primary-fixed-variant font-label-md text-label-md mb-space-lg shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Aspire Institute of Technology · Digital Skill Certification</span>
              </div>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface max-w-4xl tracking-tight leading-[1.08] mb-space-lg uppercase font-extrabold">
                AI SKILLS THAT PAY.{" "}
                <span className="text-primary underline decoration-primary/20 underline-offset-8">
                  taught AT COLLEGE.
                </span>
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-space-xl">
                A seven-course certification from Aspire. Turn your college years into client income — from zero, in one semester. Delivered across campuses nationwide.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md w-full sm:w-auto mb-space-xl">
                <Magnetic strength={0.22}>
                  <a
                    href="#waitlist"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-space-xl py-4 bg-primary text-on-primary font-label-lg text-label-lg rounded-xl shadow-md hover:bg-primary-container hover:shadow-lg transition-all duration-200"
                  >
                    <span>Join the waitlist</span>
                    <MIcon name="arrow_forward" className="text-lg" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <a
                    href="#curriculum"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-space-lg py-4 bg-surface-container-lowest text-on-surface font-label-lg text-label-lg rounded-xl shadow-sm hover:bg-surface-container-low transition-all duration-200"
                  >
                    <MIcon name="play_circle" className="text-lg text-primary" />
                    <span>How it works</span>
                  </a>
                </Magnetic>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-label-md text-label-md text-on-surface-variant py-2 px-space-lg rounded-full bg-surface-container-low mb-16">
                <span className="flex items-center gap-1.5">
                  <MIcon name="domain" className="text-primary text-base" /> 100+ Campuses
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1.5">
                  <MIcon name="groups" className="text-primary text-base" /> 250,000+ Students
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1.5">
                  <MIcon name="verified" className="text-primary text-base" /> Backed by Aspire Group of Colleges
                </span>
              </div>

              {/* Hero visual card */}
              <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest p-2 sm:p-3 mb-16">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                  <ExplainerVideo />
                </div>
                <p className="mt-4 font-body-sm text-body-sm text-on-surface-variant max-w-2xl mx-auto">
                  A sixty-second overview of the AIT program — the gap it fills, what you&apos;ll
                  learn, and how students earn in dollars.
                </p>
              </div>

              {/* Infographic 1: Earning Pipeline */}
              <div className="w-full max-w-5xl bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-container-high">
                  <div className="text-left">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                      Operational model
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">The earning pipeline</h3>
                  </div>
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm rounded-full">
                    Zero-to-dollar architecture
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-tertiary-container to-primary/40 -z-0" />
                  {[
                    { n: "01", h: "Campus Lab", p: "Assigned physical terminal with instructor oversight at your local Aspire facility.", icon: "laptop_chromebook", foot: "Dedicated Hardware" },
                    { n: "02", h: "AI Skill Sprints", p: "7 progressive courses building high-value automation, prompt systems, and digital assets.", icon: "memory", foot: "Real Code & Prompts" },
                    { n: "03", h: "Client Contract", p: "Verified project launch on Upwork, Fiverr, and international B2B direct accounts.", icon: "handshake", foot: "International Accounts" },
                    { n: "04", h: "Dollar Rails", p: "Live setup of Payoneer and Wise with direct Pakistani clearing into local banks.", icon: "payments", foot: "Direct PKR Settlement", gold: true },
                  ].map((s) => (
                    <div
                      key={s.n}
                      className="relative z-10 bg-surface-container-low rounded-xl p-5 text-left transition-transform hover:-translate-y-1"
                    >
                      <div
                        className={`w-10 h-10 rounded-full ${
                          s.gold ? "bg-tertiary-container text-on-tertiary" : "bg-primary text-on-primary"
                        } flex items-center justify-center font-headline-sm font-bold mb-3 shadow-md`}
                      >
                        {s.n}
                      </div>
                      <h4 className="font-headline-sm text-base font-bold text-on-surface mb-1">{s.h}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{s.p}</p>
                      <div
                        className={`mt-4 flex items-center gap-1 ${
                          s.gold ? "text-tertiary" : "text-primary"
                        } font-label-sm text-label-sm`}
                      >
                        <MIcon name={s.icon} className="text-sm" /> {s.foot}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: MARQUEE */}
          <section className="w-full bg-surface-container-low py-4 overflow-hidden shadow-inner">
            <div className="flex items-center gap-6 whitespace-nowrap animate-marquee w-max">
              {[...MARQUEE, ...MARQUEE].map((word, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-lowest rounded-full font-label-sm text-label-sm text-on-surface shadow-sm">
                    {i % 5 === 0 && <MIcon name="paid" className="text-primary text-sm" />}
                    {word}
                  </span>
                  <span className="text-outline-variant">•</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-on-primary rounded-full font-label-sm text-label-sm shadow-sm font-semibold">
                Verifiable certificate
              </span>
            </div>
          </section>

          {/* SECTION 3: THREE PILLARS */}
          <section className="py-24 px-gutter max-w-7xl mx-auto w-full">
            <div className="reveal text-center max-w-3xl mx-auto mb-16">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                What makes it different
              </span>
              <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2">
                THREE REASONS we&apos;re DIFFERENT.
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-headline-md font-bold mb-6">
                    01
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
                    Real campus. Not a Discord.
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Every student is attached to a physical Aspire campus. Real teachers, real accountability, real deadlines — the things an online course never gives you.
                  </p>
                </div>
                <div className="relative w-full h-48 rounded-xl overflow-hidden">
                  <img
                    alt="Aspire students collaborating"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={COLLAB_IMG}
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-on-surface/80 backdrop-blur rounded font-label-sm text-label-sm text-surface">
                    Physical Lab Cohorts
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-headline-md font-bold mb-6">
                    02
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-3">A verifiable certificate.</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Not a PDF from a random bootcamp. An AIT certificate with a public verification link an employer can scan without a login.
                  </p>
                </div>
                <div className="bg-surface-container-low rounded-xl p-4 font-mono text-xs text-on-surface space-y-2">
                  <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
                    <span className="flex items-center gap-1.5 text-primary font-bold">
                      <MIcon name="verified_user" className="text-sm" /> PUBLIC LEDGER
                    </span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-label-sm">STATUS: ACTIVE</span>
                  </div>
                  <div className="space-y-1 py-1 font-mono text-[11px] text-on-surface-variant">
                    <p className="truncate">
                      <span className="text-on-surface font-semibold">HASH:</span> 0x8F3a...c92B4
                    </p>
                    <p>
                      <span className="text-on-surface font-semibold">ISSUER:</span> Aspire Institute of Technology
                    </p>
                    <p>
                      <span className="text-on-surface font-semibold">STUDENT:</span> Verified Graduate
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-primary font-label-sm text-label-sm">
                    <span>ait.edu.pk/verify/8f3a</span>
                    <MIcon name="open_in_new" className="text-sm" />
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-headline-md font-bold mb-6">
                    03
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Built for dollars.</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Two of the seven courses teach Payoneer, Wise, Upwork and Fiverr end-to-end — set up for how Pakistani students actually get paid.
                  </p>
                </div>
                <div className="bg-surface-container-low rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      Supported Payout Rails:
                    </span>
                    <span className="text-primary font-bold text-label-sm">PKR 0% Fee Tier</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Payoneer → Bank", "Wise Business", "Upwork Direct", "Fiverr Revenue"].map((p) => (
                      <div
                        key={p}
                        className="bg-surface-container-lowest p-2.5 rounded-lg text-center font-label-sm text-label-sm font-bold text-on-surface shadow-sm"
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: PAIN */}
          <section className="py-24 px-gutter bg-surface-container-low w-full">
            <div className="max-w-7xl mx-auto">
              <div className="reveal text-center max-w-3xl mx-auto mb-16">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Sound familiar?
                </span>
                <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2">
                  YOUR DEGREE won&apos;t HIRE YOU.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PAIN.map((p, i) => (
                  <div key={i} className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col">
                    <span className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center font-bold mb-4">
                      <MIcon name={p.icon} className="text-lg" />
                    </span>
                    <p className="font-headline-sm text-base text-on-surface font-semibold leading-relaxed">
                      &ldquo;{p.line}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: TWO PATHS */}
          <section className="py-24 px-gutter max-w-7xl mx-auto w-full">
            <div className="reveal text-center max-w-3xl mx-auto mb-16">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Two paths
              </span>
              <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2">
                THE SLOW WAY. OR THE aspire WAY.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
              {/* Slow Way */}
              <div className="bg-surface-container-low rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-surface-container-high">
                    <h3 className="font-headline-md text-headline-md text-on-surface-variant font-bold">The Slow Way</h3>
                    <MIcon name="close" className="text-error" />
                  </div>
                  <ul className="space-y-6">
                    {[
                      ["Finish degree in 4 yrs", "Pure theory detached from commercial freelance realities."],
                      ["Graduate with no portfolio", "Zero live codebases or production digital deliverables to show."],
                      ["Hope someone hires you", "Sending identical CVs into cold job portals with 5,000 applicants."],
                      ["Compete in rupees", "Fighting for depreciating local salary bands that fail to meet inflation."],
                      ["Start at zero at 22", "Beginning unpaid apprenticeships four years behind schedule."],
                    ].map(([b, d]) => (
                      <li key={b} className="flex items-start gap-4 text-on-surface-variant">
                        <MIcon name="cancel" className="text-error mt-0.5" />
                        <div>
                          <strong className="text-on-surface block font-headline-sm text-base">{b}</strong>
                          <p className="font-body-sm text-body-sm">{d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Aspire Way */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden ring-2 ring-primary/20">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-surface-container-high">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary font-bold">The Aspire Way</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Accelerated collegiate model</p>
                    </div>
                    <span className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm rounded-full font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                  <ul className="space-y-6">
                    {[
                      ["Finish degree with a portfolio", "Live production artifacts hosted on custom domain registries."],
                      ["Already have paid clients", "Delivered real work for commercial clients before final exams."],
                      ["Verifiable AIT certificate", "Backed by Aspire institutional authority, scan-verifiable anywhere."],
                      ["Earn in dollars", "International contracts settling directly into Payoneer and Wise."],
                      ["Start now. Be earning by 20.", "Financial independence while finishing your regular studies.", true],
                    ].map(([b, d, hl]) => (
                      <li key={b as string} className="flex items-start gap-4">
                        <MIcon name="check_circle" className="text-primary mt-0.5" />
                        <div>
                          <strong
                            className={`block font-headline-sm text-base ${
                              hl ? "text-primary font-bold" : "text-on-surface"
                            }`}
                          >
                            {b}
                          </strong>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Trajectory SVG */}
            <div className="w-full bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                    Income & momentum trajectory
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Age 18 to age 22 projected curve</h4>
                </div>
                <div className="flex items-center gap-4 text-label-sm mt-2 sm:mt-0">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-outline" /> Traditional Student
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-primary" /> AIT Certified Student
                  </span>
                </div>
              </div>
              <div className="reveal w-full h-44 relative">
                <svg className="w-full h-full stroke-current" fill="none" viewBox="0 0 800 160">
                  <line stroke="#f1f1f0" strokeWidth="1" x1="50" x2="750" y1="20" y2="20" />
                  <line stroke="#f1f1f0" strokeWidth="1" x1="50" x2="750" y1="70" y2="70" />
                  <line stroke="#f1f1f0" strokeWidth="1" x1="50" x2="750" y1="120" y2="120" />
                  <path d="M 50 140 Q 300 140, 500 135 T 750 110" stroke="#8d706d" strokeDasharray="4 4" strokeWidth="2.5" />
                  <path className="trajectory-path" d="M 50 140 C 200 135, 300 80, 500 50 S 680 25, 750 15" stroke="#760009" strokeWidth="3.5" />
                  <circle cx="50" cy="140" fill="#760009" r="4" />
                  <circle cx="350" cy="90" fill="#760009" r="5" />
                  <circle cx="750" cy="15" fill="#760009" r="6" />
                  <circle cx="750" cy="110" fill="#8d706d" r="4" />
                </svg>
              </div>
              <div className="flex justify-between text-on-surface-variant font-mono text-label-sm px-6 pt-2 flex-wrap gap-2">
                <span>Age 18 (Start Degree)</span>
                <span>Age 19 (First Dollar Contract)</span>
                <span>Age 20 (Portfolio Maturity)</span>
                <span>Age 22 (Graduation + Retainers)</span>
              </div>
            </div>
          </section>

          {/* SECTION 6: WINS */}
          <section className="py-24 px-gutter bg-surface-container-low w-full">
            <div className="max-w-7xl mx-auto">
              <div className="reveal text-center max-w-3xl mx-auto mb-16">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  What earning looks like
                </span>
                <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2">
                  REAL MONEY. real STUDENTS.
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 italic">
                  Example outcomes — Real amounts, real platforms, representative student names. Replace with the first cohort&apos;s own wins at launch.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {WINS.map((w, i) => (
                  <div
                    key={i}
                    className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`px-2.5 py-1 rounded text-label-sm font-bold ${
                            w.tag === "secondary"
                              ? "bg-secondary-container text-on-secondary-fixed"
                              : w.tag === "tertiary"
                              ? "bg-tertiary-fixed text-on-tertiary-fixed"
                              : "bg-surface-container-high text-on-surface"
                          }`}
                        >
                          {w.platform}
                        </span>
                        <MIcon name="check_circle" className="text-primary text-base" />
                      </div>
                      <div className="font-display-md text-display-md text-primary font-extrabold mb-1">{w.amount}</div>
                      <div className="font-headline-sm text-sm font-semibold text-on-surface mb-2">{w.who}</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{w.what}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between font-label-sm text-on-surface-variant">
                      <span>{w.foot}</span>
                      <span className="text-primary font-semibold">{w.side}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7A: CURRICULUM OVERVIEW */}
          <section className="py-24 px-gutter max-w-7xl mx-auto w-full">
            <div className="reveal text-center max-w-3xl mx-auto mb-16">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                The curriculum
              </span>
              <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2">
                SEVEN COURSES. one AIT CERTIFICATE.
              </h2>
            </div>

            {/* Skill Stack */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold">Tiered structure</span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Skill stack architecture</h4>
                </div>
                <span className="px-3 py-1 bg-primary-fixed/50 text-on-primary-fixed-variant rounded-full font-label-sm font-bold">
                  7 MODULES / 1 SEMESTER
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { tier: "TIER 01", h: "Foundational Intelligence", p: "Courses 1 & 2: Machine paradigms, latent spaces, and rigorous prompt synthesis." },
                  { tier: "TIER 02", h: "Commercial Production", p: "Courses 3 & 4: Visual asset generation, multi-media editing, and portfolio engineering." },
                  { tier: "TIER 03", h: "Global Dollar Earning", p: "Courses 5, 6 & 7: E-commerce, client closing, Payoneer rails, and full AI web shipping." },
                ].map((t) => (
                  <div key={t.tier} className="p-4 rounded-xl bg-surface-container-low text-left">
                    <span className="px-2 py-0.5 bg-primary text-on-primary rounded font-mono text-label-sm">
                      {t.tier}
                    </span>
                    <h5 className="font-headline-sm text-base font-bold text-on-surface mt-2 mb-1">{t.h}</h5>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{t.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7B: HORIZONTAL COURSE SCROLL */}
          <HorizontalCourseScroll courses={COURSES} />

          {/* SECTION 8: HOW IT WORKS */}
          <section className="py-24 px-gutter bg-surface-container-low w-full">
            <div className="max-w-7xl mx-auto">
              <div className="reveal text-center max-w-3xl mx-auto mb-16">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  The path in
                </span>
                <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2">
                  GET IN. BUILD. earn.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { n: "1", h: "Get invited", p: "Join the waitlist, or ask a current Aspire student for one of their three invites." },
                  { n: "2", h: "Enroll at campus", p: "Your campus admin approves you, assigns your class, and you are ready to start." },
                  { n: "3", h: "Learn and build", p: "Video lessons, quizzes and real assignments graded by teachers and AI." },
                  { n: "4", h: "Earn certificate", p: "Pass the capstone, get a verifiable AIT certificate with a public verification link." },
                ].map((s) => (
                  <div key={s.n} className="bg-surface-container-lowest rounded-2xl p-6 text-left shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md font-bold mb-6">
                      {s.n}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">{s.h}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{s.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: FOUNDER */}
          <section className="py-24 px-gutter max-w-7xl mx-auto w-full">
            <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-14 shadow-md flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-5/12 shrink-0">
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img
                    alt="Chairman — placeholder"
                    className="w-full h-full object-cover"
                    src={CHAIRMAN_IMG}
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-surface-container-lowest/90 backdrop-blur rounded font-label-sm text-label-sm text-on-surface font-bold">
                    Chairman&apos;s Desk
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-7/12 text-left">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  A message from our chairman
                </span>
                <blockquote className="font-display-md text-headline-lg lg:text-display-md text-on-surface font-bold leading-snug mt-4 mb-6">
                  &ldquo;We built Aspire so Pakistani students could walk into the future on their own terms. AIT is the next step. If the world is moving to AI, our students lead it — not watch it pass.&rdquo;
                </blockquote>
                <div className="border-t border-surface-container-high pt-6">
                  <p className="font-headline-sm text-headline-sm text-on-surface font-bold">Syed Omer Nazar Shah</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Founder &amp; Chairman, Aspire Group of Colleges
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 10: BACKED */}
          <section className="py-24 px-gutter bg-surface-container-low w-full">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl text-left">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Not a bootcamp
                </span>
                <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2 mb-6">
                  A COLLEGE PROGRAM. a REAL ONE.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
                  AIT runs inside the Aspire Group of Colleges — a decade-old network of over a hundred campuses across Pakistan. Every certificate is reviewed by a campus and verifiable from a public URL. No shortcuts, no shell credentials.
                </p>
              </div>
              <div className="w-full lg:w-auto grid grid-cols-2 gap-4 shrink-0">
                {[
                  { num: 100, suffix: "+", l: "Campuses" },
                  { num: 250, suffix: "K+", l: "Students" },
                  { num: 10, suffix: " yrs", l: "In operation" },
                  { num: 1, suffix: "", l: "Verifiable Certificate" },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className={`reveal reveal-d${i} bg-surface-container-lowest p-6 rounded-2xl shadow-sm text-center`}
                  >
                    <div className="font-display-lg text-display-lg text-primary font-extrabold leading-none mb-2">
                      <StatCounter target={s.num} suffix={s.suffix} />
                    </div>
                    <div className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 11: PRICING */}
          <section className="py-24 px-gutter max-w-4xl mx-auto w-full text-center" id="pricing">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              The fee
            </span>
            <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2 mb-12">
              A COLLEGE FEE. not A BOOTCAMP BILL.
            </h2>
            <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-12 shadow-xl border border-surface-container-high text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-surface-container-high gap-4">
                <div>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                    The seven-course AIT certification
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Complete digital skill &amp; earning curriculum
                  </p>
                </div>
                <div className="px-4 py-2 bg-primary-fixed/50 text-primary font-label-lg font-bold rounded-xl text-center">
                  Institutional Rate
                </div>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed mb-8">
                Fee is set per campus and kept at a level Pakistani students can actually pay. Need-based support is available — speak to your campus admin after your waitlist spot opens.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "All 7 courses + capstone included",
                  "Pay by Card, JazzCash, Easypaisa, bank transfer",
                  "Unlocks when payment clears",
                  "Verifiable public certificate on ledger registry",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body-md text-body-md text-on-surface">
                    <MIcon name="check" className="text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-primary text-on-primary font-label-lg text-label-lg rounded-xl shadow-md hover:bg-primary-container transition-all"
              >
                <span>Find my campus fee</span>
                <MIcon name="arrow_forward" className="text-base" />
              </a>
            </div>
          </section>

          {/* SECTION 12: FAQ */}
          <section className="py-24 px-gutter bg-surface-container-low w-full" id="faq">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Questions
                </span>
                <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2">
                  ASKED. answered.
                </h2>
              </div>
              <div className="space-y-4">
                {FAQS.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-surface-container-lowest rounded-2xl p-6 shadow-sm open:shadow-md transition-all"
                  >
                    <summary className="flex items-center justify-between cursor-pointer font-headline-sm text-base font-bold text-on-surface list-none">
                      <span>{f.q}</span>
                      <MIcon
                        name="expand_more"
                        className="text-primary transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="pt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed border-t border-surface-container-high mt-4">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 13: WAITLIST */}
          <section className="py-24 px-gutter max-w-4xl mx-auto w-full text-center" id="waitlist">
            <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Limited Cohort Seats
              </span>
              <h2 className="font-display-md text-display-md-mobile md:text-display-md text-on-surface uppercase font-extrabold mt-2 mb-4">
                BE THE first TO JOIN.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mb-8">
                Reserve your priority allocation before public registrations open nationwide.
              </p>
              <form
                className="max-w-md mx-auto space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Priority allocation registered. Please check your inbox.");
                }}
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    className="flex-1 px-4 py-3.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner font-body-md"
                    placeholder="Enter your student or personal email"
                    required
                    type="email"
                  />
                  <button
                    className="px-6 py-3.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-xl shadow-md hover:bg-primary-container transition-all whitespace-nowrap"
                    type="submit"
                  >
                    Join the waitlist →
                  </button>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant pt-2">
                  No payment at this stage. We&apos;ll email you when invites open for your city.
                </p>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-low border-t border-surface-container-highest">
        <div className="max-w-7xl mx-auto px-gutter py-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl">
            <div className="lg:col-span-2 space-y-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-on-primary">
                  <MIcon name="school" className="text-sm" />
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">Aspire · AIT</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                Aspire Institute of Technology delivers industry-aligned digital skill certification and executive digital education, under the academic heritage of the Aspire Group of Colleges.
              </p>
              <div className="flex items-start gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                <MIcon name="location_on" className="text-primary text-[18px] mt-0.5" />
                <span>Aspire Tower, Wapda Town, Lahore, Punjab, Pakistan</span>
              </div>
            </div>
            <div className="space-y-space-sm">
              <h3 className="font-headline-sm text-base font-semibold text-on-surface">Curriculum</h3>
              <ul className="space-y-space-xs font-body-sm text-body-sm">
                {["AI & Software Engineering", "Cloud & Cyber Systems", "Data Science & Analytics", "Product & UI/UX Design"].map(
                  (x) => (
                    <li key={x} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
                      {x}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="space-y-space-sm">
              <h3 className="font-headline-sm text-base font-semibold text-on-surface">Institutional</h3>
              <ul className="space-y-space-xs font-body-sm text-body-sm">
                {["Faculty Directory", "Accreditation & Partners", "Campuses & Innovation Labs", "Career Placement Cell"].map(
                  (x) => (
                    <li key={x} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
                      {x}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="space-y-space-sm">
              <h3 className="font-headline-sm text-base font-semibold text-on-surface">Verification &amp; Trust</h3>
              <ul className="space-y-space-xs font-body-sm text-body-sm">
                {["Credential Verification", "Digital Diploma Registry", "Privacy Policy", "Terms of Enrollment"].map(
                  (x) => (
                    <li key={x} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
                      {x}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="pt-space-lg border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              © 2026 Aspire Institute of Technology (AIT) · Aspire Group of Colleges. All rights reserved.
            </p>
            <div className="flex items-center gap-space-md font-label-md text-label-md text-on-surface-variant">
              <span className="hover:text-primary cursor-pointer transition-colors">Lahore Campus</span>
              <span>•</span>
              <span className="hover:text-primary cursor-pointer transition-colors">ISO 9001</span>
              <span>•</span>
              <span className="hover:text-primary cursor-pointer transition-colors">HEC Alignment</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
