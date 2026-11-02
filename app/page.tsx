"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const images = {
  hero: "/images/hero-kitchen.webp",
  intro: "/images/intro-kitchen.webp",
  kitchen: "/images/service-kitchen.webp",
  bathroom: "/images/service-bathroom.webp",
  stone: "/images/material-stone.webp",
  countertops: "/images/service-countertops.webp",
  cabinets: "/images/service-cabinets.webp",
  flooring: "/images/service-flooring.webp",
  basement: "/images/service-basement.webp",
  visualizer: "/images/visualizer-room.webp",
};

const services = [
  {
    number: "01",
    title: "Kitchen Renovations",
    description: "A clear plan, better materials and a kitchen made for the way your home actually works.",
    image: images.kitchen,
    className: "service-card--feature",
  },
  {
    number: "02",
    title: "Bathroom Renovations",
    description: "Quiet, durable rooms with considered stone, tile and storage at every touchpoint.",
    image: images.bathroom,
    className: "",
  },
  {
    number: "03",
    title: "Quartz, Granite & Marble",
    description: "Selected slabs, precise fabrication and an installation that lets the material lead.",
    image: images.countertops,
    className: "",
  },
  {
    number: "04",
    title: "Kitchen Cabinets & Vanities",
    description: "Joinery and storage that give the whole room a calmer, more finished rhythm.",
    image: images.cabinets,
    className: "",
  },
  {
    number: "05",
    title: "Flooring & Tiling",
    description: "A grounded material palette that carries cleanly from one room into the next.",
    image: images.flooring,
    className: "",
  },
  {
    number: "06",
    title: "Basement Renovations",
    description: "Thoughtful lower levels that feel like part of the home—not an afterthought.",
    image: images.basement,
    className: "service-card--wide",
  },
];

const materials = [
  { name: "Quartz", note: "Consistent, practical, quietly expressive.", image: images.stone },
  { name: "Granite", note: "Natural movement with a lasting presence.", image: images.countertops },
  { name: "Marble", note: "Soft veining and a sense of history.", image: images.bathroom },
  { name: "Other surfaces", note: "A considered range for the right room.", image: images.flooring },
];

const brands = ["Cambria", "Caesarstone", "LX Hausys", "HanStone Quartz", "Quora Stone", "MSI"];
const navItems = [
  { label: "Home", target: "home" },
  { label: "Services", target: "services" },
  { label: "Materials", target: "materials" },
  { label: "Gallery", target: "gallery" },
  { label: "Contact", target: "contact" },
];

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function scrollToSection(target: string, closeMenu?: () => void) {
  const section = document.getElementById(target);
  if (!section) return;
  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
  closeMenu?.();
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "not-configured">("idle");

  useReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("loading");
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setFormState("not-configured");
  };

  return (
    <div className="site-shell min-h-screen">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="site-header__inner">
       
<button 
  className="wordmark" 
  type="button" 
  onClick={() => scrollToSection("home")} 
  aria-label="Rahma Granites home"
>
  <Image 
    src="/logo.png" 
    alt="Rahma Granites Logo" 
    width={40} 
    height={40} 
    className="wordmark__logo" 
  />
  <span className="wordmark__name">Rahma Granites</span>
</button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button key={item.target} type="button" onClick={() => scrollToSection(item.target)}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="site-header__actions">
            <a className="header-phone" href="tel:+19057257777" aria-label="Call Rahma Granites at 905 725 7777">
              <Phone size={14} strokeWidth={1.7} />
              <span>(905) 725-7777</span>
            </a>
            <button className="header-estimate" type="button" onClick={() => scrollToSection("contact")}>
              Free estimate <ArrowUpRight size={15} strokeWidth={1.6} />
            </button>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>

        <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`} aria-hidden={!menuOpen}>
          <div className="mobile-nav__links">
            {navItems.map((item) => (
              <button key={item.target} type="button" tabIndex={menuOpen ? 0 : -1} onClick={() => scrollToSection(item.target, () => setMenuOpen(false))}>
                <span>{item.label}</span>
                <ArrowUpRight size={17} strokeWidth={1.5} />
              </button>
            ))}
          </div>
          <div className="mobile-nav__footer">
            <a href="tel:+19057257777"><Phone size={15} /> Call the showroom</a>
            <button type="button" onClick={() => scrollToSection("contact", () => setMenuOpen(false))}>Request an estimate</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero__image" src={images.hero} alt="Contemporary kitchen with a pale stone island and warm oak cabinetry" fetchPriority="high" />
          <div className="hero__veil" />
          <div className="hero__content content-width">
            <div className="eyebrow eyebrow--light hero__eyebrow" data-reveal>Oshawa · Ontario · Since 2003</div>
            <h1 data-reveal>Spaces worth<br />coming home to.</h1>
            <p className="hero__copy" data-reveal>Beautiful kitchens, refined stone surfaces and thoughtfully finished spaces — designed around the way you live.</p>
            <div className="hero__actions" data-reveal>
              <button className="button button--light" type="button" onClick={() => scrollToSection("gallery")}>
                Explore our work <ArrowUpRight size={16} strokeWidth={1.5} />
              </button>
              <button className="button button--line-light" type="button" onClick={() => scrollToSection("contact")}>
                Request a free estimate <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <button className="hero__scroll" type="button" onClick={() => scrollToSection("introduction")} aria-label="Scroll to introduction">
            <span>Scroll to explore</span><ArrowDown size={17} strokeWidth={1.4} />
          </button>
          <div className="hero__index">01 <span>/</span> 10</div>
        </section>

        <section className="intro section" id="introduction">
          <div className="content-width intro__grid">
            <div className="intro__image-wrap" data-reveal>
              <img src={images.intro} alt="Light-filled kitchen with pale stone and oak details" loading="lazy" />
              <span className="image-caption">Material / Light / Proportion</span>
            </div>
            <div className="intro__copy" data-reveal>
              <h2>Your home deserves<br /><em>more than ordinary.</em></h2>
              <p>Rahma Granites brings together carefully selected materials, experienced craftsmanship and complete renovation services to create spaces that feel right for years to come.</p>
              <button className="text-link" type="button" onClick={() => scrollToSection("services")}>How we work <ArrowUpRight size={16} strokeWidth={1.5} /></button>
            </div>
          </div>
        </section>

        <section className="services section section--soft" id="services">
          <div className="content-width">
            <div className="section-heading section-heading--split" data-reveal>
              <div>
                <h2>Good rooms begin<br /><em>with good decisions.</em></h2>
              </div>
              <p>From the first material conversation to the final installation, we keep the details clear and the process considered.</p>
            </div>
            <div className="services__grid">
              {services.map((service) => (
                <article className={`service-card ${service.className}`} key={service.number} data-reveal>
                  <div className="service-card__image-wrap">
                    <img src={service.image} alt={`${service.title} renovation detail`} loading="lazy" />
                    <span className="service-card__number">{service.number}</span>
                  </div>
                  <div className="service-card__body">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button className="card-link" type="button" onClick={() => scrollToSection("contact")} aria-label={`Ask about ${service.title}`}>
                      Enquire <ArrowUpRight size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="materials section" id="materials">
          <div className="content-width">
            <div className="section-heading section-heading--materials" data-reveal>
              <div>
                <h2>Choose the surface<br /><em>that sets the tone.</em></h2>
              </div>
              <p>Stone changes a room quietly. We help you compare the movement, finish and feel until the right choice becomes clear.</p>
            </div>
            <div className="material-rail" data-reveal>
              {materials.map((material, index) => (
                <article className="material-card" key={material.name}>
                  <div className="material-card__image-wrap">
                    <img src={material.image} alt={`${material.name} surface texture`} loading="lazy" />
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{material.name}</h3>
                  <p>{material.note}</p>
                </article>
              ))}
            </div>
            <div className="brand-line" data-reveal>
              <span className="brand-line__label">Available through our showroom</span>
              <div className="brand-line__names">
                {brands.map((brand) => <span key={brand}>{brand}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="visualizer section section--soft" id="visualizer">
          <div className="content-width visualizer__grid">
            <div className="visualizer__image-wrap" data-reveal>
              <img src={images.visualizer} alt="Neutral living room with a visible floor plane for visualizer preview" loading="lazy" />
              <div className="visualizer__tag">Room / Floor / Preview</div>
            </div>
            <div className="visualizer__copy" data-reveal>
              <h2>See it in<br /><em>your space.</em></h2>
              <p>Explore how selected flooring can look in your own room before making a decision.</p>
              <a className="button button--dark" href="#contact">Ask about a visualizer preview <ArrowUpRight size={16} strokeWidth={1.5} /></a>
              <small>Our live visualizer connection will be linked here when the provider URL is available. We do not show a simulated upload experience.</small>
            </div>
          </div>
        </section>

        <section className="gallery section" id="gallery">
          <div className="content-width">
            <div className="section-heading section-heading--split" data-reveal>
              <div>
                <h2>A place for the work<br /><em>to speak for itself.</em></h2>
              </div>
              <p>Verified completed-project photography will live here. Until it is connected, we would rather leave the space clear than mistake inspiration for proof.</p>
            </div>
            <div className="gallery__frame" data-reveal>
              <div className="gallery__large-placeholder"><span>Project imagery</span><strong>Coming soon</strong></div>
              <div className="gallery__side-stack">
                <div className="gallery__small-placeholder"><span>01 / Kitchen</span><strong>Reserved for Rahma work</strong></div>
                <div className="gallery__small-placeholder"><span>02 / Bathroom</span><strong>Reserved for Rahma work</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="why section section--soft" id="why">
          <div className="content-width why__grid">
            <div data-reveal>
              <h2>Experience that<br /><em>shows in the details.</em></h2>
            </div>
            <div className="why__facts" data-reveal>
              <div className="fact"><strong>20+</strong><span>years of experience</span></div>
              <div className="fact"><strong>01</strong><span>Oshawa showroom</span></div>
              <div className="fact"><strong>∞</strong><span>material + installation</span></div>
              <div className="fact"><strong>02</strong><span>kitchen + bathroom expertise</span></div>
            </div>
          </div>
        </section>

        <section className="testimonials section" id="testimonials">
          <div className="content-width testimonials__inner" data-reveal>
            <div className="testimonials__message">
              <span className="quote-mark">“</span>
              <p>Verified customer reviews will appear here once the existing review source is connected.</p>
              <span className="testimonials__note">No invented quotes. No placeholder ratings.</span>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="content-width contact__grid">
            <div className="contact__intro" data-reveal>
              <h2>Let’s talk about<br /><em>your project.</em></h2>
              <p>Tell us what you have in mind. Our team can help you explore the right materials and next steps.</p>
              <div className="contact__details">
                <a href="tel:+19057257777"><Phone size={16} /> <span>(905) 725-7777</span></a>
                <a href="mailto:sales@rahmagranites.com"><Mail size={16} /> <span>sales@rahmagranites.com</span></a>
                <span><MapPin size={16} /> <span>133 Taunton Rd W Unit 16<br />Oshawa, ON L1G 3T4</span></span>
              </div>
            </div>
            <form className="estimate-form" onSubmit={handleSubmit} data-reveal>
              <div className="estimate-form__topline"><span>Free estimate</span><span>01 / 05</span></div>
              <div className="form-row">
                <label htmlFor="full-name">Full name <span>*</span></label>
                <input id="full-name" name="fullName" type="text" placeholder="Your name" required minLength={2} />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email <span>*</span></label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="form-row">
                <label htmlFor="phone">Phone <span>*</span></label>
                <input id="phone" name="phone" type="tel" placeholder="(905) 000-0000" required minLength={7} />
              </div>
              <div className="form-row">
                <label htmlFor="project-type">Project type <span>*</span></label>
                <select id="project-type" name="projectType" required defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Kitchen renovation</option>
                  <option>Bathroom renovation</option>
                  <option>Countertops</option>
                  <option>Cabinets &amp; vanities</option>
                  <option>Flooring &amp; tiling</option>
                  <option>Basement renovation</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="A little about your project" rows={3} />
              </div>
              <button className="button button--light form-submit" type="submit" disabled={formState === "loading"}>
                {formState === "loading" ? "Preparing…" : "Send project details"} <ArrowUpRight size={16} strokeWidth={1.5} />
              </button>
              <p className={`form-status ${formState === "not-configured" ? "form-status--visible" : ""}`} role="status">
                {formState === "not-configured" ? "Your details are ready, but no form endpoint is connected yet. Please call or email the showroom directly so nothing is lost." : "We’ll keep this simple and get back to you with a clear next step."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-width site-footer__top">
          <div className="site-footer__brand">
            <button className="wordmark wordmark--footer" type="button" onClick={() => scrollToSection("home")}>
              <span className="wordmark__mark">RG</span>
              <span className="wordmark__name">Rahma Granites</span>
            </button>
            <p>Kitchen, bathroom, countertop and home renovation in Oshawa, Ontario.</p>
          </div>
          <div className="site-footer__column">
            <span className="footer-label">Explore</span>
            {navItems.slice(1).map((item) => <button key={item.target} type="button" onClick={() => scrollToSection(item.target)}>{item.label} <ChevronRight size={13} /></button>)}
          </div>
          <div className="site-footer__column site-footer__contact">
            <span className="footer-label">Visit / call</span>
            <a href="tel:+19057257777">(905) 725-7777</a>
            <a href="mailto:sales@rahmagranites.com">sales@rahmagranites.com</a>
            <span>133 Taunton Rd W Unit 16<br />Oshawa, ON L1G 3T4</span>
          </div>
          <div className="site-footer__column site-footer__hours">
            <span className="footer-label">Showroom hours</span>
            <span>Mon–Fri <b>9:30 AM–6:00 PM</b></span>
            <span>Saturday <b>9:30 AM–4:00 PM</b></span>
            <span>Sunday <b>By appointment</b></span>
          </div>
        </div>
        <div className="content-width site-footer__bottom">
          <span>© {new Date().getFullYear()} Rahma Granites. All rights reserved.</span>
          <span>Built around the way you live.</span>
        </div>
      </footer>
    </div>
  );
}
