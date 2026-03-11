import { useEffect } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      syncTouch: true,
      touchMultiplier: 1.08,
      wheelMultiplier: 0.92,
    })

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
    }
  }, [])
}
