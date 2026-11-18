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

const PILLARS = [
  {
    n: "01",
    title: "Real campus. Not a Discord.",
    emphasis: "Discord.",
    body: "Every student is attached to a physical Aspire campus. Real teachers, real accountability, real deadlines — the things an online course never gives you.",
  },
  {
    n: "02",
    title: "A verifiable certificate.",
    emphasis: "verifiable",
    body: "Not a PDF from a random bootcamp. An AIT certificate with a public verification link an employer can scan without a login.",
  },
  {
    n: "03",
    title: "Built for dollars.",
    emphasis: "dollars.",
    body: "Two of the seven courses teach Payoneer, Wise, Upwork and Fiverr end-to-end — set up for how Pakistani students actually get paid.",
  },
];

const FAQS = [
  {
    q: "Who can apply?",
    a: "Any student with an invite or an approved waitlist spot. You don't need to be enrolled at an Aspire college to apply, but your campus admin needs to approve you before you start.",
  },
  {
    q: "How do the invites work?",
    a: "Every enrolled student gets three invites to share. A current student can send you one, or we send you one when your waitlist spot opens for your city.",
  },
  {
    q: "Can I do this alongside my FSc, BSc or current college?",
    a: "Yes — and most students do. Lessons are self-paced with deadlines. Expect around six to eight hours a week.",
  },
  {
    q: "Is this instead of a degree?",
    a: "No. AIT is a certification, not a degree replacement. It runs alongside your studies and gives you earning skills before you graduate.",
  },
  {
    q: "How do I actually get paid in dollars from Pakistan?",
    a: "Courses four and six walk you through Payoneer, Wise, Upwork and Fiverr step by step, including Pakistan-specific bank setup and the paperwork clients ask for.",
  },
  {
    q: "How is the certificate verified?",
    a: "Every certificate carries a unique ID and a public verification page. Employers scan the QR on the certificate and see the student name, campus, program and date — no login required.",
  },
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
  "Verifiable certificate",
];

const WINS = [
  { amount: "350", currency: "$", platform: "Payoneer", who: "Student A · Lahore", what: "Social media pack for a dental clinic." },
  { amount: "1,040", currency: "$", platform: "Upwork", who: "Student B · Karachi", what: "Three short editing contracts across one month." },
  { amount: "85", currency: "$", platform: "Fiverr", who: "Student C · Multan", what: "First order, five days after publishing the gig." },
  { amount: "400", currency: "$", platform: "Wise · retainer", who: "Student D · Islamabad", what: "Monthly content retainer for a UK startup." },
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

        {/* MARQUEE */}
        <section className="marquee-band" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((word, i) => (
              <span
                className={i % 3 === 1 ? "gold" : i % 5 === 2 ? "outlined" : ""}
                key={i}
              >
                {word}
              </span>
            ))}
          </div>
        </section>

        {/* PILLARS */}
        <section className="pillars">
          <div className="eyebrow reveal">What makes it different</div>
          <h2 className="display h-lg reveal d1">
            THREE REASONS <em>we&rsquo;re</em> DIFFERENT.
          </h2>
          <div className="pillars-grid">
            {PILLARS.map((p, i) => (
              <div className={`pillar reveal d${i + 1}`} key={p.n}>
                <span className="pillar-idx">{p.n}</span>
                <h3>
                  {p.title.split(p.emphasis)[0]}
                  <em>{p.emphasis}</em>
                </h3>
                <p>{p.body}</p>
              </div>
            ))}
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

        {/* WINS */}
        <section className="wins">
          <div className="eyebrow reveal">What earning looks like</div>
          <h2 className="display h-lg reveal d1">
            REAL MONEY. <em>real</em> STUDENTS.
          </h2>
          <p className="wins-note reveal d2">
            <b>Example outcomes</b> &nbsp;· &nbsp;Real amounts, real platforms, representative student names. Replace with the first cohort&rsquo;s own wins at launch.
          </p>
          <div className="wins-grid">
            {WINS.map((w, i) => (
              <div className={`win reveal d${Math.min(i, 3)}`} key={w.who}>
                <span className="amount">
                  <span className="currency">{w.currency}</span>
                  {w.amount}
                </span>
                <span className="platform">{w.platform}</span>
                <div className="caption">
                  <span className="who">{w.who}</span>
                  <span className="what">{w.what}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOUNDER */}
        <section className="founder">
          <div className="eyebrow reveal">A message from our chairman</div>
          <blockquote className="reveal d1">
            &ldquo;We built Aspire so Pakistani students could walk into the future on their own terms. AIT is the next step. If the world is moving to AI, our students <em>lead it</em> — not watch it pass.&rdquo;
          </blockquote>
          <div className="attrib reveal d2">
            <span className="name">Syed Omer Nazar Shah</span>
            <span className="role">Founder &amp; Chairman, Aspire Group of Colleges</span>
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

        {/* PRICING */}
        <section className="pricing">
          <div className="eyebrow reveal">The fee</div>
          <h2 className="display h-lg reveal d1">
            A COLLEGE FEE. <em>not</em> A BOOTCAMP BILL.
          </h2>
          <div className="price-card reveal d2">
            <div className="left">
              <h3>The seven-course AIT certification</h3>
              <p>
                Fee is set per campus and kept at a level Pakistani students can actually
                pay. Need-based support is available — speak to your campus admin after
                your waitlist spot opens.
              </p>
            </div>
            <div className="right">
              <ul>
                <li>All 7 courses + the capstone, included.</li>
                <li>Pay by Card, JazzCash, Easypaisa, or bank transfer.</li>
                <li>The course unlocks the moment your payment clears.</li>
                <li>Verifiable AIT certificate on completion.</li>
              </ul>
              <a className="btn-crimson" href="/waitlist">
                Find my campus fee
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="eyebrow reveal">Questions</div>
          <h2 className="display h-lg reveal d1">
            ASKED. <em>answered.</em>
          </h2>
          <ul className="faq-list">
            {FAQS.map((f, i) => (
              <li className={`faq-item reveal d${Math.min(i, 3)}`} key={f.q}>
                <details>
                  <summary>
                    <span>{f.q}</span>
                    <span className="plus" aria-hidden="true" />
                  </summary>
                  <div className="answer">{f.a}</div>
                </details>
              </li>
            ))}
          </ul>
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
