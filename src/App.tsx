import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

import '@fontsource/instrument-serif/400.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/syne/500.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { BratislavaSkyline } from './components/BratislavaSkyline'
import { GenerativeDanubeArt } from './components/GenerativeDanubeArt'
import { PhysicsPlayground } from './components/PhysicsPlayground'
import { RouteScrollytelling } from './components/RouteScrollytelling'
import { WebGPUBackdrop } from './components/WebGPUBackdrop'
import {
  contactDetails,
  fullRouteStops,
  galleryItems,
  heroMetrics,
  landmarkFeatures,
  physicsChips,
  routeStories,
  servicePillars,
  ticketOptions,
} from './data/siteContent'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const revealViewport = { once: true, amount: 0.25 }
const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`
const heroTourVideo = asset('bratislava-tour.mp4')

function App() {
  const [heroRenderMode, setHeroRenderMode] = useState<'checking' | 'fallback' | 'webgpu'>(
    'checking',
  )

  useSmoothScroll()

  useEffect(() => {
    const topbar = document.querySelector<HTMLElement>('.topbar')
    if (!topbar) {
      return
    }

    const update = () => {
      topbar.classList.toggle('is-scrolled', window.scrollY > 24)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })

    return () => {
      window.removeEventListener('scroll', update)
    }
  }, [])

  const scrollToSection = (selector: string) => {
    const target = document.querySelector<HTMLElement>(selector)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#top"
          onClick={(event) => {
            event.preventDefault()
            scrollToSection('#top')
          }}
        >
          <span className="brand__mark" />
          <span className="brand__text">
            <strong>GoldenExpress</strong>
            <small>Immersive Bratislava city train</small>
          </span>
        </a>

        <nav className="topbar__nav">
          <button onClick={() => scrollToSection('#route')} type="button">
            Route
          </button>
          <button onClick={() => scrollToSection('#experience')} type="button">
            Experience
          </button>
          <button onClick={() => scrollToSection('#contact')} type="button">
            Contact
          </button>
        </nav>

        <a
          className="topbar__cta"
          href={`mailto:${contactDetails.email}?subject=GoldenExpress%20tour%20enquiry`}
        >
          Request a tour
        </a>
      </header>

      <section className="hero section-frame" id="top">
        <WebGPUBackdrop
          onSupportChange={(supported) => {
            setHeroRenderMode(supported ? 'webgpu' : 'fallback')
          }}
        />
        <div className="hero__veil" aria-hidden="true" />

        <div className="hero__grid">
          <div className="hero__copy">
            <motion.span
              className="section-eyebrow"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              GSAP + Framer Motion + Matter.js + WebGPU
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Book a city train that turns Bratislava into one smooth scenic route.
            </motion.h1>

            <motion.p
              className="hero__lead"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              GoldenExpress already has the right product ingredients: castle panoramas, Old Town
              landmarks, multilingual audio guidance, evening rides to the UFO viewpoint and custom
              departures for private groups. This version packages them like a premium Bratislava
              sightseeing offer.
            </motion.p>

            <motion.div
              className="hero__city-strip"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.21, ease: [0.22, 1, 0.36, 1] }}
            >
              {landmarkFeatures.map((feature) => (
                <span className="hero__city-pill" key={feature.title}>
                  {feature.title}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="button button--primary"
                onClick={() => scrollToSection('#route')}
                type="button"
              >
                Explore the route
              </button>
              <a className="button button--ghost" href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}>
                Call {contactDetails.phone}
              </a>
            </motion.div>

            <div className="hero__metrics">
              {heroMetrics.map((metric, index) => (
                <motion.article
                  className="hero__metric-card"
                  key={metric.label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.32 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="hero__visuals">
            <motion.figure
              className="hero__photo hero__photo--primary hero__photo--video"
              initial={{ opacity: 0, y: 40, rotate: -7 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                className="hero__photo-media"
                autoPlay
                loop
                muted
                playsInline
                poster={asset('train-side.jpg')}
                preload="metadata"
              >
                <source src={heroTourVideo} type="video/mp4" />
              </video>
              <figcaption className="hero__video-badge">
                <span>In-motion preview</span>
                <strong>Bratislava city train in an 8-second loop</strong>
              </figcaption>
            </motion.figure>

            <motion.figure
              className="hero__photo hero__photo--secondary"
              initial={{ opacity: 0, y: 44, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 8 }}
              transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={asset('hero-gate.jpg')} alt="Historic Bratislava gate on the route" />
            </motion.figure>

            <motion.div
              className="hero__floating-note"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>
                {heroRenderMode === 'webgpu'
                  ? 'Realtime hero background'
                  : heroRenderMode === 'fallback'
                    ? 'Fallback hero background'
                    : 'Hero render mode'}
              </span>
              <strong>
                {heroRenderMode === 'webgpu'
                  ? 'WebGPU generative river shader'
                  : heroRenderMode === 'fallback'
                    ? 'Layered atmospheric fallback'
                    : 'Checking GPU capabilities'}
              </strong>
            </motion.div>

            <motion.div
              className="hero__ticket-stack"
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {ticketOptions.map((ticket, index) => (
                <motion.article
                  className={`hero-ticket hero-ticket--${index + 1}`}
                  key={ticket.title}
                  whileHover={{ y: -8, rotate: index === 1 ? 3.4 : index === 2 ? -2.2 : 2.2 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  style={{ '--ticket-accent': ticket.accent } as CSSProperties}
                >
                  <span>{ticket.eyebrow}</span>
                  <strong>{ticket.tag}</strong>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="hero__skyline-wrap">
          <BratislavaSkyline compact />
        </div>
      </section>

      <main>
        <section className="manifesto section-frame">
          <GenerativeDanubeArt />

          <div className="section-heading section-heading--narrow">
            <span className="section-eyebrow">Generative art + commercial structure</span>
            <h2>Shaped like a conversion-focused landing page, but rendered as an experience.</h2>
            <p>
              The reference layout inspired the commercial rhythm, while the visuals and factual
              base come from GoldenExpress: route story, gallery imagery, private-ride positioning
              and verified contact details.
            </p>
          </div>

          <div className="manifesto__grid">
            <motion.div
              className="manifesto__media"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={asset('about-train.png')} alt="GoldenExpress historic mini train" />
              <div className="manifesto__badge">
                <span>From the existing GoldenExpress copy</span>
                <strong>Hospitality, tourism and custom rides for nearly two decades</strong>
              </div>
            </motion.div>

            <div className="manifesto__content" id="experience">
              {servicePillars.map((pillar, index) => (
                <motion.article
                  className="service-card"
                  key={pillar.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -8 }}
                >
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="city-atlas section-frame">
          <div className="section-heading">
            <span className="section-eyebrow">Bratislava-first visual language</span>
            <h2>Sell the city through its silhouette, not generic transport graphics.</h2>
            <p>
              The strongest landmarks on the published route already give the design system enough
              material: castle geometry, medieval gates, the Blue Church and the UFO deck over the
              Danube line.
            </p>
          </div>

          <div className="city-atlas__grid">
            <motion.div
              className="city-atlas__scene"
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <BratislavaSkyline />
              <div className="city-atlas__scene-copy">
                <span>Visual route anchor</span>
                <strong>Castle, cathedral spires, bridge line and UFO deck</strong>
                <p>
                  This skyline block turns the site from a generic sightseeing template into
                  something visibly tied to Bratislava.
                </p>
              </div>
            </motion.div>

            <div className="city-atlas__cards">
              {landmarkFeatures.map((feature, index) => (
                <motion.article
                  className="landmark-card"
                  key={feature.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="landmark-card__image">
                    <img src={feature.image} alt={feature.title} />
                    <span>{feature.stop}</span>
                  </div>
                  <div className="landmark-card__copy">
                    <strong>{feature.title}</strong>
                    <p>{feature.copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="ticket-deck section-frame">
          <div className="section-heading">
            <span className="section-eyebrow">Ticket-driven sales blocks</span>
            <h2>Make the tour formats feel bookable, not buried in generic text.</h2>
            <p>
              These cards push the site toward a tourism-sales posture: city loop, night panorama
              ride and private charter are presented as distinct offers with clear emotional roles.
            </p>
          </div>

          <div className="ticket-deck__grid">
            {ticketOptions.map((ticket, index) => (
              <motion.article
                className="ticket-card"
                key={ticket.title}
                initial={{ opacity: 0, rotate: index === 1 ? 2 : -2, y: 40 }}
                whileInView={{ opacity: 1, rotate: 0, y: 0 }}
                viewport={revealViewport}
                transition={{
                  duration: 0.78,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -10, rotate: index === 1 ? 1.1 : -1.1 }}
                style={{ '--ticket-accent': ticket.accent } as CSSProperties}
              >
                <div className="ticket-card__topline">
                  <span>{ticket.eyebrow}</span>
                  <strong>{ticket.tag}</strong>
                </div>
                <h3>{ticket.title}</h3>
                <p>{ticket.copy}</p>
                <a href={`mailto:${contactDetails.email}?subject=GoldenExpress%20availability%20request`}>
                  Ask for availability
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <RouteScrollytelling stories={routeStories} />

        <section className="stop-cloud section-frame">
          <div className="section-heading section-heading--compact">
            <span className="section-eyebrow">Published stop list</span>
            <h2>The full route base currently promoted by GoldenExpress.</h2>
          </div>

          <div className="stop-cloud__grid">
            {fullRouteStops.map((stop) => (
              <span className="stop-cloud__pill" key={stop}>
                {stop}
              </span>
            ))}
          </div>
        </section>

        <section className="physics-section section-frame">
          <div className="section-heading">
            <span className="section-eyebrow">Physics-based UI + Matter.js</span>
            <h2>Let the interface fall, collide and invite play instead of sitting still.</h2>
            <p>
              These route tokens carry gravity, density, inertia and collision. Users can drag them
              around the stage, turning the attraction list into a tactile playground.
            </p>
          </div>

          <div className="physics-section__layout">
            <div className="physics-section__copy">
              <div className="physics-section__callout">
                <strong>Interaction brief</strong>
                <p>
                  Grab the chips, shake the stack and watch the bodies settle. The section is driven
                  by Matter.js instead of simple keyframe transforms.
                </p>
              </div>

              <ul className="physics-section__legend">
                <li>Gravity pulls each token into a shared floor.</li>
                <li>Different density values change how the chips settle and rebound.</li>
                <li>Mouse constraints turn the block cloud into a playable route toy.</li>
              </ul>
            </div>

            <div className="physics-section__canvas-shell">
              <PhysicsPlayground items={physicsChips} />
            </div>
          </div>
        </section>

        <section className="gallery section-frame">
          <div className="section-heading">
            <span className="section-eyebrow">Gallery built from localized source images</span>
            <h2>Visual proof for the route, vehicle and evening atmosphere.</h2>
          </div>

          <div className="gallery__grid">
            {galleryItems.map((item, index) => (
              <motion.figure
                className="gallery__card"
                key={item.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{
                  duration: 0.72,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -10, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
              >
                <img src={item.image} alt={item.title} />
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.caption}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer section-frame" id="contact">
        <div className="footer__card">
          <div className="footer__intro">
            <span className="section-eyebrow">Contact base from goldenexpress.eu</span>
            <h2>Ready to turn this concept into the production GoldenExpress website.</h2>
            <p>
              The contact block below uses the current company, email and phone details published on
              the existing GoldenExpress site.
            </p>

            <div className="footer__actions">
              <a className="button button--primary" href={`mailto:${contactDetails.email}`}>
                Email {contactDetails.email}
              </a>
              <a
                className="button button--ghost"
                href={contactDetails.facebook}
                target="_blank"
                rel="noreferrer"
              >
                Facebook page
              </a>
            </div>
          </div>

          <div className="footer__details">
            <div>
              <span>Company</span>
              <strong>{contactDetails.company}</strong>
            </div>
            <div>
              <span>Address</span>
              <strong>{contactDetails.address.join(', ')}</strong>
            </div>
            <div>
              <span>Email</span>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </div>
            <div>
              <span>Phone</span>
              <a href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}>{contactDetails.phone}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
