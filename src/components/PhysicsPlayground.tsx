import { useEffect, useRef } from 'react'

import type { PhysicsChip } from '../data/siteContent'

type PhysicsPlaygroundProps = {
  items: PhysicsChip[]
}

type MatterBody = import('matter-js').Body

type BodyMeta = {
  accent: string
  label: string
  width: number
  height: number
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const limit = Math.min(radius, width / 2, height / 2)
  context.beginPath()
  context.moveTo(x + limit, y)
  context.lineTo(x + width - limit, y)
  context.quadraticCurveTo(x + width, y, x + width, y + limit)
  context.lineTo(x + width, y + height - limit)
  context.quadraticCurveTo(x + width, y + height, x + width - limit, y + height)
  context.lineTo(x + limit, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - limit)
  context.lineTo(x, y + limit)
  context.quadraticCurveTo(x, y, x + limit, y)
  context.closePath()
}

export function PhysicsPlayground({ items }: PhysicsPlaygroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = canvas?.parentElement
    if (!canvas || !wrapper) {
      return
    }

    let animationFrame = 0
    let resizeFrame = 0
    let cleanupWorld = () => {}

    const boot = async () => {
      const matterModule = await import('matter-js')
      const Matter = ('default' in matterModule ? matterModule.default : matterModule) as typeof import('matter-js')

      const context = canvas.getContext('2d')
      if (!context) {
        return
      }

      const launchScene = () => {
        cleanupWorld()

        const bounds = wrapper.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const width = Math.max(bounds.width, 320)
        const height = Math.max(bounds.height, 420)

        canvas.width = Math.floor(width * dpr)
        canvas.height = Math.floor(height * dpr)
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        const engine = Matter.Engine.create()
        engine.gravity.y = 0.88

        const world = engine.world
        const bodies: MatterBody[] = []
        const bodyMeta = new Map<MatterBody, BodyMeta>()

        const walls = [
          Matter.Bodies.rectangle(width / 2, height + 30, width + 120, 60, {
            isStatic: true,
          }),
          Matter.Bodies.rectangle(width / 2, -30, width + 120, 60, {
            isStatic: true,
          }),
          Matter.Bodies.rectangle(-30, height / 2, 60, height + 120, {
            isStatic: true,
          }),
          Matter.Bodies.rectangle(width + 30, height / 2, 60, height + 120, {
            isStatic: true,
          }),
        ]

        items.forEach((item, index) => {
          const chipWidth = 156 + item.label.length * 7.6
          const chipHeight = 70
          const body = Matter.Bodies.rectangle(
            width * (0.18 + (index % 4) * 0.18),
            -120 - index * 76,
            chipWidth,
            chipHeight,
            {
              restitution: 0.82,
              friction: 0.01,
              frictionAir: 0.008,
              density: 0.0014 + index * 0.00007,
              chamfer: { radius: 26 },
            },
          )

          Matter.Body.setAngularVelocity(body, (index % 2 === 0 ? 1 : -1) * 0.012)
          bodies.push(body)
          bodyMeta.set(body, {
            accent: item.accent,
            label: item.label,
            width: chipWidth,
            height: chipHeight,
          })
        })

        const mouse = Matter.Mouse.create(canvas)
        mouse.pixelRatio = dpr
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse,
          constraint: {
            stiffness: 0.2,
            damping: 0.18,
            render: { visible: false },
          },
        })

        Matter.World.add(world, [...walls, ...bodies, mouseConstraint])

        let previousTime = performance.now()

        const draw = (time: number) => {
          const delta = Math.min(time - previousTime, 32)
          previousTime = time
          Matter.Engine.update(engine, delta)

          context.setTransform(1, 0, 0, 1, 0, 0)
          context.clearRect(0, 0, canvas.width, canvas.height)
          context.setTransform(dpr, 0, 0, dpr, 0, 0)

          const gradient = context.createLinearGradient(0, 0, width, height)
          gradient.addColorStop(0, 'rgba(7, 22, 37, 0.98)')
          gradient.addColorStop(1, 'rgba(12, 34, 56, 0.96)')
          context.fillStyle = gradient
          context.fillRect(0, 0, width, height)

          context.strokeStyle = 'rgba(255, 255, 255, 0.05)'
          context.lineWidth = 1
          for (let x = 0; x <= width; x += 44) {
            context.beginPath()
            context.moveTo(x, 0)
            context.lineTo(x, height)
            context.stroke()
          }

          bodies.forEach((body) => {
            const meta = bodyMeta.get(body)
            if (!meta) {
              return
            }

            context.save()
            context.translate(body.position.x, body.position.y)
            context.rotate(body.angle)

            context.shadowColor = 'rgba(0, 0, 0, 0.22)'
            context.shadowBlur = 24
            context.shadowOffsetY = 12
            roundedRect(
              context,
              -meta.width / 2,
              -meta.height / 2,
              meta.width,
              meta.height,
              24,
            )
            context.fillStyle = `${meta.accent}22`
            context.fill()

            context.shadowColor = 'transparent'
            context.lineWidth = 1.6
            context.strokeStyle = `${meta.accent}cc`
            roundedRect(
              context,
              -meta.width / 2,
              -meta.height / 2,
              meta.width,
              meta.height,
              24,
            )
            context.stroke()

            context.fillStyle = '#f8f4ea'
            context.font = '600 15px "Syne", sans-serif'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillText(meta.label, 0, 2)

            context.restore()
          })

          animationFrame = window.requestAnimationFrame(draw)
        }

        animationFrame = window.requestAnimationFrame(draw)

        cleanupWorld = () => {
          window.cancelAnimationFrame(animationFrame)
          Matter.Mouse.clearSourceEvents(mouse)
          Matter.World.clear(world, false)
          Matter.Engine.clear(engine)
        }
      }

      launchScene()

      const observer = new ResizeObserver(() => {
        window.cancelAnimationFrame(resizeFrame)
        resizeFrame = window.requestAnimationFrame(launchScene)
      })
      observer.observe(wrapper)

      cleanupWorld = ((originalCleanup) => () => {
        observer.disconnect()
        originalCleanup()
      })(cleanupWorld)
    }

    void boot()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.cancelAnimationFrame(resizeFrame)
      cleanupWorld()
    }
  }, [items])

  return <canvas className="physics-playground" ref={canvasRef} />
}
