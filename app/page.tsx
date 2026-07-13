"use client";

import { FormEvent, TouchEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

const services = [
  { number: "01", title: "Cinema Production", description: "Feature films, short films, and emotionally driven cinematic storytelling that connects with audiences on a deeply human level. From concept to the final cut, every frame is crafted with intention.", media: "cinema", icon: "cinema" },
  { number: "02", title: "Theatre Production", description: "Original theatre productions, live stage storytelling, and immersive performance experiences that transform spaces into worlds of emotion and imagination.", media: "theatre", icon: "theatre" },
  { number: "03", title: "Story Development", description: "Writing, narrative creation, emotional storytelling, and concept development. Every story begins with truth — we help shape that truth into something unforgettable.", media: "story", icon: "story" },
  { number: "04", title: "Creative Collaborations", description: "Artistic partnerships, production collaborations, and creative projects that bring together the best minds and talents to create extraordinary work that transcends boundaries.", media: "collab", icon: "collab" },
];

const serviceIcons: Record<string, JSX.Element> = {
  cinema: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="14" height="10" stroke="#a88745" strokeWidth="0.8" />
      <circle cx="3" cy="5" r="0.8" fill="#a88745" />
      <circle cx="3" cy="11" r="0.8" fill="#a88745" />
      <circle cx="13" cy="5" r="0.8" fill="#a88745" />
      <circle cx="13" cy="11" r="0.8" fill="#a88745" />
      <polygon points="6,5.5 6,10.5 11,8" fill="#a88745" opacity="0.6" />
    </svg>
  ),
  theatre: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 13 L2 4 Q8 1 14 4 L14 13" stroke="#a88745" strokeWidth="0.8" fill="none" />
      <line x1="2" y1="13" x2="14" y2="13" stroke="#a88745" strokeWidth="0.8" />
      <circle cx="8" cy="7" r="1.5" stroke="#a88745" strokeWidth="0.8" />
    </svg>
  ),
  story: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="2" y1="5" x2="14" y2="5" stroke="#a88745" strokeWidth="0.8" />
      <line x1="2" y1="8" x2="11" y2="8" stroke="#a88745" strokeWidth="0.8" />
      <line x1="2" y1="11" x2="13" y2="11" stroke="#a88745" strokeWidth="0.8" />
      <path d="M12 10 L15 8 L12 6" stroke="#a88745" strokeWidth="0.8" fill="none" />
    </svg>
  ),
  collab: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="2.5" stroke="#a88745" strokeWidth="0.8" />
      <circle cx="11" cy="11" r="2.5" stroke="#a88745" strokeWidth="0.8" />
      <path d="M7 6.5 L9 9.5" stroke="#a88745" strokeWidth="0.8" />
    </svg>
  ),
};

const serviceVisuals: Record<string, JSX.Element> = {
  cinema: (
    <svg viewBox="0 0 500 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <radialGradient id="sv1a" cx="60%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#a88745" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#080808" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="sv1b" cx="60%" cy="50%" r="20%">
          <stop offset="0%" stopColor="#f5c060" stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="500" height="200" fill="#0a0806" />
      <rect width="500" height="200" fill="url(#sv1a)" />
      <path d="M420 0 L80 100 L420 200 Z" fill="#f5c060" opacity="0.04" />
      <circle cx="80" cy="100" r="55" fill="none" stroke="#a88745" strokeWidth="1.2" opacity="0.5" />
      <circle cx="80" cy="100" r="35" fill="none" stroke="#a88745" strokeWidth="0.7" opacity="0.35" />
      <circle cx="80" cy="100" r="10" fill="#a88745" opacity="0.4" />
      <line x1="80" y1="45" x2="80" y2="155" stroke="#a88745" strokeWidth="0.6" opacity="0.3" />
      <line x1="25" y1="100" x2="135" y2="100" stroke="#a88745" strokeWidth="0.6" opacity="0.3" />
      <line x1="41" y1="61" x2="119" y2="139" stroke="#a88745" strokeWidth="0.5" opacity="0.2" />
      <line x1="119" y1="61" x2="41" y2="139" stroke="#a88745" strokeWidth="0.5" opacity="0.2" />
      <circle cx="400" cy="60" r="42" fill="none" stroke="#a88745" strokeWidth="1" opacity="0.4" />
      <circle cx="400" cy="60" r="22" fill="none" stroke="#a88745" strokeWidth="0.6" opacity="0.25" />
      <circle cx="400" cy="60" r="7" fill="#a88745" opacity="0.35" />
      <rect x="0" y="170" width="500" height="30" fill="#a88745" opacity="0.06" />
      <rect x="20" y="175" width="18" height="20" rx="2" fill="#a88745" opacity="0.2" />
      <rect x="60" y="175" width="18" height="20" rx="2" fill="#a88745" opacity="0.2" />
      <rect x="100" y="175" width="18" height="20" rx="2" fill="#a88745" opacity="0.2" />
      <rect x="140" y="175" width="18" height="20" rx="2" fill="#a88745" opacity="0.2" />
      <rect x="180" y="175" width="18" height="20" rx="2" fill="#a88745" opacity="0.2" />
      <rect x="220" y="175" width="18" height="20" rx="2" fill="#a88745" opacity="0.2" />
      <circle cx="300" cy="100" r="4" fill="url(#sv1b)" opacity="0.8" />
    </svg>
  ),
  theatre: (
    <svg viewBox="0 0 500 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <radialGradient id="sv2a" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#6f5ba3" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#080808" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="500" height="200" fill="#080510" />
      <rect width="500" height="200" fill="url(#sv2a)" />
      <path d="M30 200 L30 80 Q250 5 470 80 L470 200" fill="none" stroke="#6f5ba3" strokeWidth="2" opacity="0.6" />
      <path d="M70 200 L70 105 Q250 45 430 105 L430 200" fill="none" stroke="#a88745" strokeWidth="1" opacity="0.4" />
      <path d="M110 200 L110 128 Q250 82 390 128 L390 200" fill="none" stroke="#a88745" strokeWidth="0.6" opacity="0.25" />
      <line x1="30" y1="196" x2="470" y2="196" stroke="#a88745" strokeWidth="1.5" opacity="0.5" />
      <path d="M150 0 L110 195 L190 195 Z" fill="#f5c060" opacity="0.05" />
      <path d="M250 0 L210 195 L290 195 Z" fill="#f5c060" opacity="0.05" />
      <path d="M350 0 L310 195 L390 195 Z" fill="#f5c060" opacity="0.05" />
      <path d="M0 0 Q40 60 25 200" stroke="#6f5ba3" strokeWidth="10" fill="none" opacity="0.4" />
      <path d="M500 0 Q460 60 475 200" stroke="#6f5ba3" strokeWidth="10" fill="none" opacity="0.4" />
    </svg>
  ),
  story: (
    <svg viewBox="0 0 500 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <radialGradient id="sv3a" cx="40%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#c870c2" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#080808" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="500" height="200" fill="#08050a" />
      <rect width="500" height="200" fill="url(#sv3a)" />
      <line x1="60" y1="50" x2="350" y2="50" stroke="#e8e0d0" strokeWidth="0.8" opacity="0.2" />
      <line x1="60" y1="70" x2="300" y2="70" stroke="#e8e0d0" strokeWidth="0.8" opacity="0.18" />
      <line x1="60" y1="90" x2="330" y2="90" stroke="#e8e0d0" strokeWidth="0.8" opacity="0.2" />
      <line x1="60" y1="110" x2="280" y2="110" stroke="#e8e0d0" strokeWidth="0.8" opacity="0.15" />
      <line x1="60" y1="130" x2="320" y2="130" stroke="#e8e0d0" strokeWidth="0.8" opacity="0.18" />
      <line x1="60" y1="150" x2="260" y2="150" stroke="#e8e0d0" strokeWidth="0.8" opacity="0.15" />
      <line x1="60" y1="170" x2="310" y2="170" stroke="#e8e0d0" strokeWidth="0.8" opacity="0.12" />
      <path d="M400 20 Q450 60 420 170 Q410 180 405 175 Q415 140 400 20 Z" fill="#a88745" opacity="0.4" />
      <path d="M405 175 L395 185 L402 168 Z" fill="#a88745" opacity="0.5" />
      <path d="M395 178 Q370 195 350 185 Q330 175 340 165" fill="none" stroke="#c870c2" strokeWidth="1" opacity="0.4" />
      <rect x="40" y="30" width="320" height="155" fill="none" stroke="#a88745" strokeWidth="0.5" opacity="0.15" />
    </svg>
  ),
  collab: (
    <svg viewBox="0 0 500 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <radialGradient id="sv4a" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#a88745" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#080808" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="500" height="200" fill="#080808" />
      <rect width="500" height="200" fill="url(#sv4a)" />
      <circle cx="150" cy="100" r="30" fill="none" stroke="#6f5ba3" strokeWidth="1.2" opacity="0.5" />
      <circle cx="250" cy="70" r="25" fill="none" stroke="#a88745" strokeWidth="1" opacity="0.5" />
      <circle cx="350" cy="110" r="30" fill="none" stroke="#c870c2" strokeWidth="1.2" opacity="0.45" />
      <circle cx="250" cy="145" r="22" fill="none" stroke="#a88745" strokeWidth="0.8" opacity="0.4" />
      <line x1="180" y1="100" x2="225" y2="75" stroke="#a88745" strokeWidth="0.7" opacity="0.4" />
      <line x1="275" y1="75" x2="320" y2="105" stroke="#a88745" strokeWidth="0.7" opacity="0.4" />
      <line x1="170" y1="115" x2="228" y2="140" stroke="#6f5ba3" strokeWidth="0.7" opacity="0.35" />
      <line x1="272" y1="145" x2="322" y2="125" stroke="#c870c2" strokeWidth="0.7" opacity="0.35" />
      <line x1="250" y1="95" x2="250" y2="123" stroke="#a88745" strokeWidth="0.6" opacity="0.3" />
      <circle cx="250" cy="105" r="6" fill="#a88745" opacity="0.5" />
      <path d="M50 160 Q150 30 450 60" fill="none" stroke="#a88745" strokeWidth="0.5" opacity="0.12" />
      <path d="M50 180 Q200 50 460 80" fill="none" stroke="#6f5ba3" strokeWidth="0.4" opacity="0.1" />
    </svg>
  ),
};

const values = [
  ["Connection", "Stories that bridge hearts across cultures and borders."],
  ["Transformation", "Narratives that inspire change and personal growth."],
  ["Acceptance", "Celebrating the full spectrum of human experience."],
  ["Authenticity", "Truth at the heart of every story we tell."],
];

const featuredProjects = [
  {
    image: "/source-assets/image-7.webp",
    alt: "The Second Wind film artwork",
    width: 578,
    height: 462,
    tag: "Feature film · 2024",
    title: "The Second Wind",
    description: "A moving narrative inspired by resilience and personal transformation, celebrating second chances and the power of rediscovering purpose. A film for everyone who has ever had to begin again.",
  },
  {
    image: "/source-assets/image-8.jpg",
    alt: "Joba film artwork",
    width: 1919,
    height: 1079,
    tag: "Short film · Hibiscus",
    title: "Joba",
    description: "A poetic and emotional story exploring memory, relationships, and personal connection through cinematic storytelling. Named after the hibiscus — a flower of delicate beauty and quiet strength.",
  },
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
  const projectGridRef = useRef<HTMLDivElement | null>(null);

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

  function scrollProjects(direction: 1 | -1) {
    const el = projectGridRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".project");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sweekaar Productions home">
          <Image
            className="brand-logo"
            src="/sweekaar-logo.svg"
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
          <h2>Storytelling is not only <em>entertainment.</em><br />It is <em>connection.</em><br />It is <em>transformation.</em><br />It is <em>acceptance.</em></h2>
        </div>
        <div className="about-copy">
          <p className="lead">Sweekaar Productions is a cinema and theatre production house founded by Indira Baikerikar, born from a passion for theatre, sports, storytelling, and human journeys.</p>
          <p>The vision behind Sweekaar is simple: to create stories that inspire people to embrace change, rediscover strength, and celebrate life.</p>
          <p>The company works across theatre and film production, creating emotionally driven narratives rooted in authenticity and lived experiences.</p>
          <p>At Sweekaar Productions, storytelling is not only entertainment. It is connection. It is transformation. It is acceptance.</p>
          <p>And that is the spirit behind <em>Sweekaar</em>.</p>
          <a className="text-link" href="#founder">Discover our story <span>→</span></a>
        </div>
        {/* <div className="values-grid">
          {values.map(([title, description]) => (
            <article className="value-card" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div> */}
      </section>

      <section id="studio" className="studio section">
        <div className="shell">
          <p className="eyebrow red">Our Craft</p>
          <div className="studio-heading"><h2>What We <em>Create</em></h2></div>
          <div className="service-grid">
            {services.map(({ number, title, description, media, icon }) => (
              <article className="service-card" key={number}>
                <div className="service-media">{serviceVisuals[media]}</div>
                <div className="service-icon">{serviceIcons[icon]}</div>
                {/* <span className="service-number">{number}</span> */}
                <h3>{title}</h3>
                <p>{description}</p>
                {/* <span className="service-arrow">↗</span> */}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="projects section shell">
        <div className="projects-head"><div><p className="eyebrow red">Featured work</p><h2>Stories in <em>motion.</em></h2></div></div>
        <div className="project-carousel">
          <div className="project-grid" ref={projectGridRef}>
            {featuredProjects.map((project) => (
              <article className="project" key={project.title}>
                <Image src={project.image} alt={project.alt} width={project.width} height={project.height} />
                <div className="project-caption"><span>{project.tag}</span><h3>{project.title}</h3><p>{project.description}</p></div>
              </article>
            ))}
          </div>
          {featuredProjects.length > 3 && (
            <div className="project-nav">
              <button type="button" aria-label="Previous projects" onClick={() => scrollProjects(-1)}>←</button>
              <button type="button" aria-label="Next projects" onClick={() => scrollProjects(1)}>→</button>
            </div>
          )}
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
            <label><span>Email</span><input required type="email" name="email" autoComplete="email" /></label>
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
