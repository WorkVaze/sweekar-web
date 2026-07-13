"use client";

import { FormEvent, TouchEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

const services = [
  ["01", "Cinema Production", "Feature films, short films, and emotionally driven cinematic storytelling, crafted from first concept through the final cut."],
  ["02", "Theatre Production", "Original productions and live stage storytelling that turn shared spaces into worlds of emotion and imagination."],
  ["03", "Story Development", "Writing, narrative creation, and concept development. Every unforgettable story begins with an honest human truth."],
  ["04", "Creative Collaborations", "Artistic partnerships that bring together exceptional talent to make work which moves beyond boundaries."],
];

const values = [
  ["Connection", "Stories that bridge hearts across cultures and borders."],
  ["Transformation", "Narratives that inspire change and personal growth."],
  ["Acceptance", "Celebrating the full spectrum of human experience."],
  ["Authenticity", "Truth at the heart of every story we tell."],
];

type FounderChapter = {
  number: string;
  chapter: string;
  titlePlain: string;
  titleAccent: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  quote?: string;
  intro?: { name: string; roles: string };
};

const founderChapters: FounderChapter[] = [
  {
    number: "01",
    chapter: "Chapter One — Origins",
    titlePlain: "The ",
    titleAccent: "Creative Journey",
    intro: { name: "Indira Baikerikar", roles: "Founder · Producer · Theatre Artist · Filmmaker · Storyteller" },
    paragraphs: [
      "Born in Mumbai and raised in Assam, Indira pursued science and music before studying textiles. She later built her own garment business in Mumbai for over twelve years, showcasing work at major fashion platforms and exporting designs internationally.",
      "Fashion became one of her earliest creative expressions — teaching her design thinking, storytelling through aesthetics, and artistic identity.",
      "Indira Baikerikar is a creator whose journey reflects reinvention, courage, and passion across multiple creative worlds.",
    ],
    image: "/source-assets/image-1.jpg",
    imageAlt: "Indira Baikerikar at Cannes",
  },
  {
    number: "02",
    chapter: "Chapter Two — Fashion",
    titlePlain: "Fashion As The First ",
    titleAccent: "Creative Canvas",
    paragraphs: [
      "Fashion was Indira's first canvas. Her entrepreneurial journey introduced her to creativity, visual storytelling, craftsmanship, and building meaningful artistic identity through design.",
      "Years later, her understanding of aesthetics, individuality, and human expression naturally evolved into theatre and cinema storytelling.",
      "Even on international platforms like Cannes, her fashion choices reflected elegance, culture, individuality, and storytelling through style.",
    ],
    image: "/source-assets/image-3.jpg",
    imageAlt: "Indira Baikerikar in a designer gown",
  },
  {
    number: "03",
    chapter: "Chapter Three — Resilience",
    titlePlain: "The Athlete ",
    titleAccent: "Within",
    paragraphs: [
      "For over thirteen years, Indira dedicated herself to athletics and fitness. Sports shaped discipline, resilience, consistency, and purpose — qualities that continue to define her creative work today.",
      "Her experiences with athletes and fitness communities deepened her understanding of perseverance, transformation, and human strength.",
    ],
    image: "/source-assets/image-4.jpg",
    imageAlt: "Indira Baikerikar running a marathon",
  },
  {
    number: "04",
    chapter: "Chapter Four — Theatre",
    titlePlain: "Theatre & ",
    titleAccent: "Performance",
    paragraphs: [
      "Theatre became another turning point in Indira's creative journey. Working with theatre productions helped her discover storytelling, performance, emotion, and human connection in a deeper way.",
      "Theatre taught timing, stage language, emotional rhythm, and artistic expression — foundations that later shaped her filmmaking journey.",
    ],
    image: "/source-assets/image-2.jpg",
    imageAlt: "Indira Baikerikar in character",
  },
  {
    number: "05",
    chapter: "Chapter Five — Cinema",
    titlePlain: "Cinema & ",
    titleAccent: "Sweekaar",
    paragraphs: [
      "In 2024, Indira founded Sweekaar Productions — bringing together everything she had learned across fashion, sports, theatre, and storytelling.",
      "Her debut production, The Second Wind, emerged from emotional truth, resilience, and the belief that life always offers new beginnings.",
      "The film reflects the values that define her work: authenticity, reinvention, purpose, and human transformation.",
    ],
    quote: "Life always gives us a second chance. It's never over till we are done.",
    image: "/source-assets/image-6.jpg",
    imageAlt: "Sweekaar Productions logo",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % founderChapters.length);
    }, 6000);
    return () => clearInterval(id);
  }, [isPaused]);

  function onFounderTouchStart(event: TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function onFounderTouchEnd(event: TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      setCurrentSlide((slide) =>
        delta < 0
          ? (slide + 1) % founderChapters.length
          : (slide - 1 + founderChapters.length) % founderChapters.length
      );
    }
    touchStartX.current = null;
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });

    if (response.ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sweekaar Productions home">
          <Image
            className="brand-logo"
            src="/sweekaar-logo.png"
            alt="Sweekaar Productions"
            width={2251}
            height={2251}
            priority
          />
        </a>
        <button className="menu-toggle" type="button" aria-expanded={isMenuOpen} aria-controls="site-nav" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span /> <span />
          <span className="sr-only">Toggle navigation</span>
        </button>
        <nav id="site-nav" className={isMenuOpen ? "site-nav open" : "site-nav"}>
          {[["About", "#about"], ["Founder", "#founder"], ["Studio", "#studio"], ["Projects", "#projects"]].map(([label, href]) => <a href={href} key={label} onClick={closeMenu}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s talk <span>↗</span></a>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-image" />
        <div className="hero-content shell">
          <p className="eyebrow">Cinema · Theatre · Human stories</p>
          <h1>Stories Beyond <em>Performance.</em><br></br>Art Beyond <em>Boundaries.</em></h1>
          <p className="hero-copy">Sweekaar Productions is a creative platform dedicated to cinema and theatre that celebrates resilience, transformation, and authentic storytelling.</p>
          <a className="button button-light" href="#projects">Explore our work <span>↘</span></a>
        </div>
        <div className="hero-index"><span>01</span><i /> <span>05</span></div>
      </section>

      <section id="founder" className="founder-carousel">
        <div
          className="founder-slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onFounderTouchStart}
          onTouchEnd={onFounderTouchEnd}
        >
          <div className="founder-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {founderChapters.map((c, i) => (
              <div className="founder-slide" key={c.number}>
                <div className={i % 2 === 1 ? "slide-inner reverse" : "slide-inner"}>
                  <div className="slide-image">
                    <Image src={c.image} alt={c.imageAlt} width={853} height={853} />
                    <span className="chapter-number" aria-hidden="true">{c.number}</span>
                  </div>
                  <div className="slide-content">
                    {c.intro && (
                      <div className="founder-intro">
                        <h2>{c.intro.name}</h2>
                        <p className="founder-roles">{c.intro.roles}</p>
                      </div>
                    )}
                    <p className="eyebrow red">{c.chapter}</p>
                    <h3>{c.titlePlain}<em>{c.titleAccent}</em></h3>
                    {c.paragraphs.map((p, pi) => <p key={pi}>{p}</p>)}
                    {c.quote && <blockquote className="slide-quote">{c.quote}</blockquote>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="founder-dots" role="tablist" aria-label="Founder journey chapters">
          {founderChapters.map((c, i) => (
            <button
              key={c.number}
              type="button"
              role="tab"
              className={i === currentSlide ? "founder-dot active" : "founder-dot"}
              aria-selected={i === currentSlide}
              aria-label={`Go to ${c.chapter}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </section>

      <section id="about" className="about section shell">
        <div className="section-intro">
          <p className="eyebrow red">Our foundation - About Sweekaar</p>
          <h2>Storytelling is not only <em>entertainment.</em> <br></br>It is <em>connection.</em><br></br> It is <em>transformation.</em> <br></br>It is <em>acceptance.</em> </h2>
        </div>
        <div className="about-copy">
          <p className="lead">Sweekaar Productions is a cinema and theatre production house founded by Indira Baikerikar, born from a passion for theatre, sports, storytelling, and human journeys.</p>
          <p>The vision behind Sweekaar is simple: to create stories that inspire people to embrace change, rediscover strength, and celebrate life.</p>
          <p>The company works across theatre and film production, creating emotionally driven narratives rooted in authenticity and lived experiences.</p>
          <p>At Sweekaar Productions, storytelling is not only entertainment. It is connection. It is transformation. It is acceptance.</p>
          <p>And that is the spirit behind <em>Sweekaar</em>.</p>
          <a className="text-link" href="#founder">Discover our story <span>→</span></a>
        </div>
        <div className="values-grid">
          {values.map(([title, description]) => (
            <article className="value-card" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="studio" className="studio section">
        <div className="shell">
          <p className="eyebrow red">What we do</p>
          <div className="studio-heading"><h2>Built for the <em>art</em> of feeling.</h2><p>From a seed of truth to a story that lives with its audience, we make room for every part of the creative process.</p></div>
          <div className="service-grid">
            {services.map(([number, title, description]) => (
              <article className="service-card" key={number}>
                <span className="service-number">{number}</span>
                <div className="service-icon">✦</div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="service-arrow">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="projects section shell">
        <div className="projects-head"><div><p className="eyebrow red">Featured work</p><h2>Stories in <em>motion.</em></h2></div><p>Each project is an invitation to feel more deeply, look more closely, and begin again.</p></div>
        <div className="project-grid">
          <article className="project primary-project"><Image src="/source-assets/image-7.jpg" alt="The Second Wind film artwork" width={578} height={462} /><div className="project-caption"><span>Feature film · 2024</span><h3>The Second Wind</h3><p>A story of resilience, second chances, and finding purpose anew.</p></div></article>
          <article className="project"><Image src="/source-assets/image-8.jpg" alt="Joba film artwork" width={1919} height={1079} /><div className="project-caption"><span>Short film · Hibiscus</span><h3>Joba</h3><p>A poetic exploration of memory, relationships, and quiet strength.</p></div></article>
        </div>
      </section>

      <section className="stage">
        <div className="stage-image"><Image src="/source-assets/image-5.jpg" alt="A live theatre performance" width={576} height={895} /></div>
        <div className="stage-content"><p className="eyebrow">Live experiences</p><h2>Theatre is where the story <em>breathes.</em></h2><p>Original productions, immersive stage experiences, and performance projects that bring audience and artist into the same moment.</p><a className="button button-outline" href="#contact">Work with us <span>↗</span></a></div>
      </section>

      <section id="contact" className="contact section">
        <div className="shell contact-grid">
          <div className="contact-intro"><p className="eyebrow red">Begin a conversation</p><h2>Let&apos;s make something <em>matter.</em></h2><p>Have a story, collaboration, or production in mind? We&apos;d love to hear from you.</p><a href="mailto:hello@sweekaarproductions.com">hello@sweekaarproductions.com</a><span>Mumbai, Maharashtra, India</span></div>
          <form className="enquiry-form" onSubmit={submitEnquiry}>
            <label><span>Full name</span><input required name="name" autoComplete="name" /></label>
            <label><span>Email address</span><input required type="email" name="email" autoComplete="email" /></label>
            <label><span>Project type</span><select required name="projectType" defaultValue=""><option value="" disabled>Select a project type</option><option>Film production</option><option>Theatre production</option><option>Story development</option><option>Creative collaboration</option><option>Other</option></select></label>
            <label><span>Tell us about it</span><textarea required name="message" rows={5} /></label>
            <button className="button button-dark" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"} <span>↗</span></button>
            {status === "success" && <p className="form-status success" role="status">Thank you—your enquiry is on its way.</p>}
            {status === "error" && <p className="form-status error" role="alert">Something went wrong. Please email us directly instead.</p>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner">
          <div className="footer-contact">
            <p>Mumbai, Maharashtra, India</p>
            <a href="mailto:hello@sweekaarproductions.com">hello@sweekaarproductions.com</a>
          </div>
          <div className="footer-socials" aria-label="Social links">
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
            <a href="#">LinkedIn</a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Sweekaar Productions</p>
        </div>
      </footer>
    </main>
  );
}
