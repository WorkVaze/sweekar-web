"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

const services = [
  ["01", "Cinema Production", "Feature films, short films, and emotionally driven cinematic storytelling, crafted from first concept through the final cut."],
  ["02", "Theatre Production", "Original productions and live stage storytelling that turn shared spaces into worlds of emotion and imagination."],
  ["03", "Story Development", "Writing, narrative creation, and concept development. Every unforgettable story begins with an honest human truth."],
  ["04", "Creative Collaborations", "Artistic partnerships that bring together exceptional talent to make work which moves beyond boundaries."],
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
          <h1>Stories that stay <em>with you.</em></h1>
          <p className="hero-copy">Sweekaar Productions creates cinema and theatre rooted in resilience, transformation, and authentic human connection.</p>
          <a className="button button-light" href="#projects">Explore our work <span>↘</span></a>
        </div>
        <div className="hero-index"><span>01</span><i /> <span>05</span></div>
      </section>

      <section id="about" className="about section shell">
        <div className="section-intro">
          <p className="eyebrow red">Our foundation</p>
          <h2>More than a production house. <em>A space for stories.</em></h2>
        </div>
        <div className="about-copy">
          <p className="lead">Sweekaar Productions is a cinema and theatre production house founded by Indira Baikerikar, born from a passion for theatre, sports, storytelling, and human journeys.</p>
          <p>We create emotionally driven narratives rooted in lived experience—work that inspires people to embrace change, rediscover strength, and celebrate life.</p>
          <a className="text-link" href="#founder">Discover our story <span>→</span></a>
        </div>
        <p className="background-word">SWEEKAAR</p>
      </section>

      <section id="founder" className="founder">
        <div className="founder-image"><Image src="/source-assets/image-3.jpg" alt="Indira Baikerikar" width={853} height={853} /></div>
        <div className="founder-content">
          <p className="eyebrow red">The visionary</p>
          <h2>Indira<br /><em>Baikerikar</em></h2>
          <p>A creator whose journey reflects reinvention, courage, and passion across multiple creative worlds.</p>
          <p>From fashion and athletics to theatre and cinema, each chapter has deepened her belief in the power of personal transformation.</p>
          <div className="founder-note"><span>01</span> Founder, Sweekaar Productions</div>
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

      <footer className="footer"><div className="shell footer-inner"><a className="brand" href="#home" aria-label="Sweekaar Productions home"><Image className="brand-logo" src="/sweekaar-logo.png" alt="Sweekaar Productions" width={2251} height={2251} /></a><p>© {new Date().getFullYear()} Sweekaar Productions.<br />Cinema. Theatre. Human Stories.</p><div><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div></div></footer>
    </main>
  );
}
