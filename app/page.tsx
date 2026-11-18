"use client";

import { useEffect, useRef } from "react";

const COURSES = [
  {
    n: "01",
    title: "AI Basics",
    desc: "How the models work and what they are really good at.",
  },
  {
    n: "02",
    title: "Prompt Engineering",
    desc: "Getting clean, reliable output from any model.",
  },
  {
    n: "03",
    title: "Graphics Design & Video Editing",
    desc: "Make things people actually want to look at.",
  },
  {
    n: "04",
    title: "Freelance & Portfolio Building",
    desc: "Package the skill into something clients can hire.",
  },
  {
    n: "05",
    title: "Digital Marketing & E-commerce",
    desc: "Run paid, organic, and marketplace storefronts that sell.",
  },
  {
    n: "06",
    title: "Communication & Earning",
    desc: "Pitch, negotiate, and keep the client coming back.",
  },
  {
    n: "07",
    title: "Web Dev with AI",
    desc: "Ship real websites and tools with modern AI tooling.",
  },
];

const STEPS = [
  {
    n: "01",
    h: "Get invited",
    p: "Join the waitlist, or ask a current Aspire student for one of their three invites.",
  },
  {
    n: "02",
    h: "Enroll at your campus",
    p: "Your campus admin approves you, assigns your class, and you are ready to start.",
  },
  {
    n: "03",
    h: "Learn the seven",
    p: "Short video lessons, quizzes, and real assignments graded by teachers and AI.",
  },
  {
    n: "04",
    h: "Earn the certificate",
    p: "Pass the capstone, get a verifiable AIT certificate with a public verification link.",
  },
];

const CAMPUSES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Faisalabad",
  "Multan",
  "Peshawar",
];

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
          <svg className="mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 20 L12 3 L20 20"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M8 14 L16 14" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span>Aspire College</span>
          <span className="sub">AIT</span>
        </a>
        <a className="signin" href="/signin">
          Sign in
          <svg
            className="arrow"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-eyebrow reveal">
            <span className="dot" />
            Admissions open · Spring 2027 cohort
          </div>
          <h1 className="reveal d1">
            The skills that pay, taught <em>at college.</em>
          </h1>
          <p className="lead reveal d2">
            A seven-course Digital Skill Certification from the Aspire Institute of
            Technology. AI, design, marketing, and freelancing — built so you can earn
            before you graduate.
          </p>
          <div className="hero-cta reveal d3">
            <a className="btn-primary" href="/waitlist">
              Join the waitlist
              <svg
                className="arrow"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className="btn-ghost" href="#program">
              Explore the program
            </a>
          </div>

          <div className="hero-meta reveal d4" aria-label="Program at a glance">
            <div>
              <span className="k">7</span>
              <span className="l">Courses</span>
            </div>
            <div>
              <span className="k">1</span>
              <span className="l">AIT Certificate</span>
            </div>
            <div>
              <span className="k">Self-paced</span>
              <span className="l">With deadlines</span>
            </div>
          </div>
        </section>

        {/* THESIS */}
        <section className="thesis" id="program">
          <div className="grid">
            <div className="reveal">
              <div className="section-label">The program</div>
              <h2>A college program for the work that actually exists now.</h2>
            </div>
            <div className="reveal d1">
              <p>
                Degrees take four years. The job market changes every six months. We
                designed the Digital Skill Certification to close that gap.
              </p>
              <p>
                Students move through seven short, practical courses — from the
                fundamentals of AI to selling their first freelance project — and finish
                with a verifiable Aspire Institute of Technology certificate.
              </p>
              <p>
                <strong>
                  No lectures that could have been an email. No busywork. Only the
                  skills your future client will pay for.
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section className="courses">
          <div className="courses-header">
            <h2 className="reveal">Seven courses. One path.</h2>
            <p className="aside reveal d1">
              Each course unlocks the next. The final capstone is reviewed by your
              campus and your certificate is issued the moment it is approved.
            </p>
          </div>

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

        {/* HOW IT WORKS */}
        <section className="how">
          <h2 className="reveal">How you get in, how you finish.</h2>
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

        {/* CAMPUSES */}
        <section className="campuses">
          <div className="campus-label reveal">Delivered across Aspire campuses</div>
          <div className="campus-row">
            {CAMPUSES.map((name, i) => (
              <span className={`reveal d${Math.min(Math.floor(i / 2), 3)}`} key={name}>
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section>
          <div className="final reveal">
            <h2>The next cohort opens soon. Keep your seat.</h2>
            <a className="btn-primary" href="/waitlist">
              Join the waitlist
              <svg
                className="arrow"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div>© 2026 Aspire Group of Colleges · Aspire Institute of Technology</div>
        <nav>
          <a href="#">Program</a>
          <a href="#">Campuses</a>
          <a href="#">Verify a certificate</a>
          <a href="#">Contact</a>
        </nav>
      </footer>
    </>
  );
}
