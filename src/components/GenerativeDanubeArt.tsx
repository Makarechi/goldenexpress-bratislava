import { useEffect } from 'react'

import { createNoise2D } from 'simplex-noise'

type GenerativeDanubeArtProps = {
  compact?: boolean
}

export function GenerativeDanubeArt({ compact = false }: GenerativeDanubeArtProps) {
  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('[data-generative-danube]')
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const noise2D = createNoise2D()
    let frameId = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(dpr, dpr)
    }

    const draw = (time: number) => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const t = time * 0.00022

      context.clearRect(0, 0, width, height)

      const lineCount = compact ? 10 : 18
      for (let line = 0; line < lineCount; line += 1) {
        const baseY = height * (0.12 + (line / Math.max(lineCount - 1, 1)) * 0.76)
        context.beginPath()

        for (let x = 0; x <= width + 24; x += 18) {
          const xFactor = x / Math.max(width, 1)
          const wave =
            noise2D(xFactor * 2.6 + line * 0.11, t + line * 0.08) * (compact ? 18 : 34) +
            Math.sin(xFactor * 8 + t * 6 + line * 0.7) * (compact ? 5 : 9)
          const y = baseY + wave

          if (x === 0) {
            context.moveTo(x, y)
          } else {
            context.lineTo(x, y)
          }
        }

        const alpha = compact ? 0.18 : 0.24
        context.strokeStyle =
          line % 3 === 0
            ? `rgba(244, 184, 92, ${alpha})`
            : line % 3 === 1
              ? `rgba(122, 210, 195, ${alpha})`
              : `rgba(142, 189, 255, ${alpha})`
        context.lineWidth = line % 4 === 0 ? 2.4 : 1.1
        context.stroke()
      }

      for (let dot = 0; dot < (compact ? 10 : 18); dot += 1) {
        const x = ((dot * 73.23 + t * 1600) % width + width) % width
        const y = height * (0.18 + (dot % 7) * 0.11) + Math.sin(t * 9 + dot) * 14
        context.beginPath()
        context.fillStyle =
          dot % 2 === 0 ? 'rgba(244, 184, 92, 0.26)' : 'rgba(122, 210, 195, 0.22)'
        context.arc(x, y, compact ? 2 : 3.2, 0, Math.PI * 2)
        context.fill()
      }

      frameId = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frameId = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [compact])

  return <canvas className="generative-danube" data-generative-danube aria-hidden="true" />
}
