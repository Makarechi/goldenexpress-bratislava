import { startTransition, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import type { RouteStory } from '../data/siteContent'

type RouteScrollytellingProps = {
  stories: RouteStory[]
}

export function RouteScrollytelling({ stories }: RouteScrollytellingProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    const root = rootRef.current
    const progress = progressRef.current
    if (!root || !progress) {
      return
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 961px)', () => {
      const imageShell = root.querySelector<HTMLElement>('[data-story-image-shell]')

      gsap.set(progress, { scaleY: 0, transformOrigin: 'top center' })

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: `+=${stories.length * 720}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(progress, {
            scaleY: Math.max(self.progress, 0.02),
            duration: 0.18,
            overwrite: true,
            ease: 'power2.out',
          })

          if (imageShell) {
            gsap.to(imageShell, {
              rotate: -6 + self.progress * 12,
              yPercent: -3 + self.progress * 6,
              duration: 0.28,
              overwrite: true,
              ease: 'power2.out',
            })
          }

          const nextIndex = Math.min(
            stories.length - 1,
            Math.round(self.progress * (stories.length - 1)),
          )

          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex
            startTransition(() => {
              setActiveIndex(nextIndex)
            })
          }
        },
      })

      return () => {
        trigger.kill()
      }
    })

    mm.add('(max-width: 960px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-story-mobile-panel]')
      gsap.from(cards, {
        opacity: 0,
        y: 42,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 72%',
        },
      })
    })

    return () => {
      mm.revert()
    }
  }, [stories])

  const activeStory = stories[activeIndex]

  return (
    <section className="route-story section-frame" id="route" ref={rootRef}>
      <div className="section-heading">
        <span className="section-eyebrow">Smooth scroll + scrollytelling</span>
        <h2>Scroll the route like a guided train sequence, not a static brochure.</h2>
        <p>
          The content shifts with scroll position: imagery, featured stop, highlights and motion cues
          all track the route progress in a pinned GSAP timeline.
        </p>
      </div>

      <div className="route-story__stage">
        <div className="route-story__visual">
          <div className="route-story__image-shell" data-story-image-shell>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStory.id}
                src={activeStory.image}
                alt={activeStory.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            <motion.div
              className="route-story__image-meta"
              key={`${activeStory.id}-meta`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{activeStory.label}</span>
              <strong>{activeStory.note}</strong>
            </motion.div>
          </div>

          <div className="route-story__map-card">
            <div className="route-story__rail">
              <span className="route-story__rail-track" />
              <span className="route-story__rail-progress" ref={progressRef} />
            </div>

            <img
              className="route-story__map"
              src="/assets/route-map.jpg"
              alt="GoldenExpress Bratislava route map"
            />

            {stories.map((story, index) => (
              <span
                className={`route-story__marker ${activeIndex === index ? 'is-active' : ''}`}
                key={story.id}
                style={
                  {
                    left: `${story.mapX}%`,
                    top: `${story.mapY}%`,
                    '--marker-accent': story.accent,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>

        <div className="route-story__panels">
          <div className="route-story__panel-shell">
            <AnimatePresence mode="wait">
              <motion.article
                className="route-story__panel route-story__panel--active"
                key={activeStory.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="route-story__panel-label">{activeStory.label}</span>
                <h3>{activeStory.title}</h3>
                <p>{activeStory.copy}</p>

                <div className="route-story__focus-list">
                  {activeStory.focusStops.map((focusStop) => (
                    <span className="route-story__focus-pill" key={focusStop}>
                      {focusStop}
                    </span>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="route-story__step-list">
            {stories.map((story, index) => (
              <article
                className={`route-story__step ${activeIndex === index ? 'is-active' : ''}`}
                data-story-step
                key={story.id}
              >
                <span className="route-story__step-index">{story.label}</span>
                <strong>{story.note}</strong>
                <p>{story.focusStops.join(' • ')}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="route-story__mobile-panels">
          {stories.map((story) => (
            <article className="route-story__panel route-story__panel--mobile" data-story-mobile-panel key={story.id}>
              <span className="route-story__panel-label">{story.label}</span>
              <h3>{story.title}</h3>
              <p>{story.copy}</p>

              <div className="route-story__focus-list">
                {story.focusStops.map((focusStop) => (
                  <span className="route-story__focus-pill" key={focusStop}>
                    {focusStop}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
