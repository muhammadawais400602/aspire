"use client";

import { useEffect, useRef } from "react";

const PAIN = [
  "My degree ends in two years and I still don't earn a rupee.",
  "Every job post wants experience I was never allowed to get.",
  "I see people my age billing in dollars and I don't even know where to start.",
  "I can prompt ChatGPT — but I can't turn that into income.",
  "My college doesn't teach any of this, and the free YouTube rabbit hole goes nowhere.",
  "By the time I graduate, AI will have taken the job I was studying for.",
];

const PATH_SLOW = [
  "Finish your degree in 4 years",
  "Graduate with no portfolio",
  "Hope someone hires you",
  "Compete in rupees",
  "Start at zero at 22",
];

const PATH_FAST = [
  { text: "Finish your degree with a portfolio", bold: true },
  { text: "Already have paid clients", bold: false },
  { text: "Verifiable AIT certificate", bold: false },
  { text: "Earn in dollars", bold: false },
  { text: "Start now. Be earning by 20.", bold: false },
];

const COURSES = [
  { n: "01", title: "AI Basics", desc: "How the models actually work. What they're good at." },
  { n: "02", title: "Prompt Engineering", desc: "Clean, reliable output from any model." },
  { n: "03", title: "Graphics & Video", desc: "Make things people want to look at." },
  { n: "04", title: "Freelance & Portfolio", desc: "Package your skill into something a client can hire." },
  { n: "05", title: "Marketing & E-commerce", desc: "Paid, organic and marketplace storefronts that sell." },
  { n: "06", title: "Communication & Earning", desc: "Pitch, negotiate, and keep clients coming back." },
  { n: "07", title: "Web Dev with AI", desc: "Ship real websites and tools with modern AI tooling." },
];

const STEPS = [
  { n: "01", h: "Get invited", p: "Join the waitlist, or ask a current Aspire student for one of their three invites." },
  { n: "02", h: "Enroll at your campus", p: "Your campus admin approves you, assigns your class, and you are ready to start." },
  { n: "03", h: "Learn and build", p: "Video lessons, quizzes and real assignments graded by teachers and AI." },
  { n: "04", h: "Earn the certificate", p: "Pass the capstone, get a verifiable AIT certificate with a public verification link." },
];

const STATS = [
  { k: "100+", l: "Campuses" },
  { k: "250K+", l: "Students" },
  { k: "10 yrs", l: "In operation" },
  { k: "1", l: "Verifiable certificate" },
];

function Crest() {
  return (
    <span className="crest" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4 20 L12 3 L20 20" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M8 14 L16 14" stroke="currentColor" strokeWidth="2.4" />
      </svg>
    </span>
  );
}

function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      items.forEach((el) => io.observe(el));
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="nav" ref={navRef}>
        <a className="brand" href="#">
          <Crest />
          <span>Aspire</span>
          <span className="divider" aria-hidden="true" />
          <span className="ait">AIT</span>
        </a>
        <a className="signin" href="/signin">
          Sign in
          <Arrow size={12} />
        </a>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="eyebrow reveal">
            Aspire Institute of Technology · Digital Skill Certification
          </div>
          <h1 className="display h-xl reveal d1">
            AI SKILLS<br />THAT PAY. <em>taught</em><br />AT COLLEGE.
          </h1>
          <p className="lead reveal d2">
            A seven-course certification from Aspire. Turn your college years into client
            income — from zero, in one semester. Delivered across campuses nationwide.
          </p>
          <div className="hero-cta reveal d3">
            <a className="btn-crimson" href="/waitlist">
              Join the waitlist
              <Arrow />
            </a>
            <a className="btn-ghost" href="#program">How it works</a>
          </div>
          <div className="hero-proof reveal d4">
            <span><span className="bullet" /><b>100+</b> Campuses</span>
            <span><span className="bullet" /><b>250,000+</b> Students</span>
            <span><span className="bullet" />Backed by <b>Aspire Group of Colleges</b></span>
          </div>
        </section>

        {/* PAIN */}
        <section className="pain">
          <div className="eyebrow reveal">Sound familiar?</div>
          <h2 className="display h-lg reveal d1">
            YOUR DEGREE <em>won&rsquo;t</em> HIRE YOU.
          </h2>
          <ol>
            {PAIN.map((line, i) => (
              <li className={`reveal d${Math.min(Math.floor(i / 2), 3)}`} key={i}>
                {line}
              </li>
            ))}
          </ol>
        </section>

        {/* PATHS */}
        <section className="paths">
          <div className="eyebrow reveal">Two paths</div>
          <h2 className="display h-lg reveal d1">
            THE SLOW WAY. OR THE <em>aspire</em> WAY.
          </h2>
          <div className="paths-grid">
            <div className="path left reveal d2">
              <div className="path-label">The slow way</div>
              <ul>
                {PATH_SLOW.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="path right reveal d3">
              <div className="path-label">The Aspire way</div>
              <ul>
                {PATH_FAST.map((item) => (
                  <li key={item.text}>
                    {item.bold ? <><span>Finish your degree </span><b>with a portfolio</b></> : item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section className="courses" id="program">
          <div className="eyebrow reveal">The curriculum</div>
          <h2 className="display h-lg reveal d1">
            SEVEN COURSES. <em>one</em> AIT CERTIFICATE.
          </h2>
          <ol className="course-list">
            {COURSES.map((c) => (
              <li className="course-row reveal" key={c.n}>
                <span className="num">{c.n}</span>
                <span className="title">{c.title}</span>
                <span className="desc">{c.desc}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* HOW */}
        <section className="how">
          <div className="eyebrow reveal">The path in</div>
          <h2 className="display h-lg reveal d1">
            GET IN. BUILD. <em>earn.</em>
          </h2>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className={`step reveal d${i}`} key={s.n}>
                <span className="idx">{s.n}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BACKED */}
        <section className="backed">
          <div className="eyebrow reveal">Not a bootcamp</div>
          <div className="grid">
            <h2 className="display h-md reveal d1">
              A COLLEGE PROGRAM.<br /><em>a</em> REAL ONE.
            </h2>
            <p className="reveal d2">
              AIT runs inside the Aspire Group of Colleges — a decade-old network of over
              a hundred campuses across Pakistan. Every certificate is reviewed by a
              campus and verifiable from a public URL. No shortcuts, no shell credentials.
            </p>
          </div>
          <div className="stats">
            {STATS.map((s, i) => (
              <div className={`stat reveal d${i}`} key={s.l}>
                <span className="k">{s.k}</span>
                <span className="l">{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL */}
        <section>
          <div className="final reveal">
            <h2 className="display h-lg">BE THE <em>first</em> TO JOIN.</h2>
            <a className="btn-crimson" href="/waitlist">
              Join the waitlist
              <Arrow />
            </a>
            <p className="microcopy">
              No payment at this stage. We&rsquo;ll email you when invites open for your city.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand-block">
          <div className="brand">
            <Crest />
            <span>Aspire</span>
            <span className="divider" aria-hidden="true" />
            <span className="ait">AIT</span>
          </div>
          <p>
            Aspire Institute of Technology is the digital skills arm of the Aspire Group
            of Colleges. Aspire Tower, 4D PIA Road, Wapda Town, Lahore.
          </p>
        </div>
        <div className="col">
          <h4>Program</h4>
          <a href="#">Curriculum</a>
          <a href="#">Campuses</a>
          <a href="#">Fees</a>
        </div>
        <div className="col">
          <h4>More</h4>
          <a href="#">Verify a certificate</a>
          <a href="#">For partners</a>
          <a href="#">Contact</a>
        </div>
        <div className="legal">
          <span>© 2026 Aspire Group of Colleges</span>
          <span>Aspire Institute of Technology · AIT</span>
        </div>
      </footer>
    </>
  );
}
