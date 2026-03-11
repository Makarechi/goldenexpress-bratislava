import { useEffect, useState } from 'react'

type GPUBufferUsageLike = {
  COPY_DST: number
  UNIFORM: number
}

type GPUShaderStageLike = {
  FRAGMENT: number
}

type GPUBindGroupLayoutLike = unknown
type GPUBindGroupLike = unknown
type GPUBufferLike = unknown
type GPURenderPipelineLike = unknown
type GPUShaderModuleLike = unknown
type GPUTextureViewLike = unknown

type GPUCommandEncoderLike = {
  beginRenderPass: (descriptor: {
    colorAttachments: Array<{
      clearValue: { a: number; b: number; g: number; r: number }
      loadOp: 'clear' | 'load'
      storeOp: 'store' | 'discard'
      view: GPUTextureViewLike
    }>
  }) => {
    draw: (count: number) => void
    end: () => void
    setBindGroup: (index: number, bindGroup: GPUBindGroupLike) => void
    setPipeline: (pipeline: GPURenderPipelineLike) => void
  }
  finish: () => unknown
}

type GPUCanvasContextLike = {
  configure: (descriptor: { alphaMode: 'opaque' | 'premultiplied'; device: GPUDeviceLike; format: string }) => void
  getCurrentTexture: () => {
    createView: () => GPUTextureViewLike
  }
}

type GPUDeviceLike = {
  createBindGroup: (descriptor: {
    entries: Array<{
      binding: number
      resource: { buffer: GPUBufferLike }
    }>
    layout: GPUBindGroupLayoutLike
  }) => GPUBindGroupLike
  createBindGroupLayout: (descriptor: {
    entries: Array<{
      binding: number
      buffer: { type: 'uniform' }
      visibility: number
    }>
  }) => GPUBindGroupLayoutLike
  createBuffer: (descriptor: { size: number; usage: number }) => GPUBufferLike
  createCommandEncoder: () => GPUCommandEncoderLike
  createPipelineLayout: (descriptor: { bindGroupLayouts: GPUBindGroupLayoutLike[] }) => unknown
  createRenderPipeline: (descriptor: {
    fragment: {
      entryPoint: string
      module: GPUShaderModuleLike
      targets: Array<{ format: string }>
    }
    layout: unknown
    primitive: { topology: 'triangle-list' }
    vertex: { entryPoint: string; module: GPUShaderModuleLike }
  }) => GPURenderPipelineLike
  createShaderModule: (descriptor: { code: string }) => GPUShaderModuleLike
  queue: {
    submit: (commands: unknown[]) => void
    writeBuffer: (buffer: GPUBufferLike, offset: number, data: Float32Array) => void
  }
}

type GPUAdapterLike = {
  requestDevice: () => Promise<GPUDeviceLike | null>
}

type NavigatorWithGPU = Navigator & {
  gpu?: {
    getPreferredCanvasFormat: () => string
    requestAdapter: () => Promise<GPUAdapterLike | null>
  }
}

type WebGPUBackdropProps = {
  onSupportChange?: (supported: boolean) => void
}

const shaderSource = `
struct Uniforms {
  time: f32,
  width: f32,
  height: f32,
  scroll: f32,
  mouseX: f32,
  mouseY: f32,
  padA: f32,
  padB: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

fn hash(p: vec2<f32>) -> f32 {
  let h = dot(p, vec2<f32>(127.1, 311.7));
  return fract(sin(h) * 43758.5453123);
}

fn noise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2<f32>(0.0, 0.0)), hash(i + vec2<f32>(1.0, 0.0)), u.x),
    mix(hash(i + vec2<f32>(0.0, 1.0)), hash(i + vec2<f32>(1.0, 1.0)), u.x),
    u.y
  );
}

@vertex
fn vertexMain(@builtin(vertex_index) index: u32) -> @builtin(position) vec4<f32> {
  var positions = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -3.0),
    vec2<f32>(-1.0, 1.0),
    vec2<f32>(3.0, 1.0)
  );
  return vec4<f32>(positions[index], 0.0, 1.0);
}

@fragment
fn fragmentMain(@builtin(position) fragCoord: vec4<f32>) -> @location(0) vec4<f32> {
  let resolution = vec2<f32>(uniforms.width, uniforms.height);
  let uv = fragCoord.xy / resolution;

  var p = uv * 2.0 - vec2<f32>(1.0, 1.0);
  p.x = p.x * resolution.x / resolution.y;

  let t = uniforms.time * 0.38;
  let scroll = uniforms.scroll;
  let mouse = vec2<f32>(uniforms.mouseX, uniforms.mouseY) * 2.0 - vec2<f32>(1.0, 1.0);

  let warp = noise(p * 1.8 + vec2<f32>(t, scroll * 2.0));
  let ripples = noise(p * 4.6 - vec2<f32>(t * 1.35, t * 0.5));
  let riverShape = abs(p.y + 0.19 * sin(p.x * 2.25 + t) + (warp - 0.5) * 0.48);
  let river = smoothstep(0.78, 0.16, riverShape);
  let wake = smoothstep(0.55, 0.0, distance(p, mouse * vec2<f32>(1.2, 0.95)));
  let haze = smoothstep(-1.0, 0.82, p.y);

  let navy = vec3<f32>(0.02, 0.06, 0.12);
  let teal = vec3<f32>(0.07, 0.29, 0.35);
  let gold = vec3<f32>(0.95, 0.74, 0.38);
  let mist = vec3<f32>(0.88, 0.92, 0.94);

  var color = mix(navy, teal, haze + warp * 0.12);
  color = mix(color, gold, river * (0.58 + ripples * 0.25));
  color = mix(color, mist, wake * 0.12);

  let glowLine = pow(max(0.0, 1.0 - riverShape * 2.1), 6.0);
  color += glowLine * vec3<f32>(0.22, 0.16, 0.05);
  color += vec3<f32>(0.06, 0.05, 0.02) * pow(max(0.0, ripples - 0.55), 4.0);

  return vec4<f32>(color, 1.0);
}
`

export function WebGPUBackdrop({ onSupportChange }: WebGPUBackdropProps) {
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('[data-webgpu-canvas]')
    if (!canvas) {
      return
    }

    let frameId = 0
    let cleanupResize = () => {}
    let scrollProgress = 0
    const pointer = { x: 0.64, y: 0.38 }

    const nav = navigator as NavigatorWithGPU

    const gpuBufferUsage = (window as Window & { GPUBufferUsage?: GPUBufferUsageLike }).GPUBufferUsage
    const gpuShaderStage = (window as Window & { GPUShaderStage?: GPUShaderStageLike }).GPUShaderStage

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
    }

    const updateScroll = () => {
      scrollProgress = Math.min(1, window.scrollY / Math.max(window.innerHeight * 4, 1))
    }

    canvas.addEventListener('pointermove', updatePointer)
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    const start = async () => {
      if (!nav.gpu || !gpuBufferUsage || !gpuShaderStage) {
        setIsFallback(true)
        onSupportChange?.(false)
        return
      }

      try {
        const adapter = await nav.gpu.requestAdapter()
        if (!adapter) {
          setIsFallback(true)
          onSupportChange?.(false)
          return
        }

        const device = await adapter.requestDevice()
        const context = canvas.getContext('webgpu') as GPUCanvasContextLike | null
        if (!device || !context) {
          setIsFallback(true)
          onSupportChange?.(false)
          return
        }

        const format = nav.gpu.getPreferredCanvasFormat()
        const uniformBuffer = device.createBuffer({
          size: 32,
          usage: gpuBufferUsage.UNIFORM | gpuBufferUsage.COPY_DST,
        })

        const shaderModule = device.createShaderModule({
          code: shaderSource,
        })

        const bindGroupLayout = device.createBindGroupLayout({
          entries: [
            {
              binding: 0,
              visibility: gpuShaderStage.FRAGMENT,
              buffer: { type: 'uniform' },
            },
          ],
        })

        const pipeline = device.createRenderPipeline({
          layout: device.createPipelineLayout({
            bindGroupLayouts: [bindGroupLayout],
          }),
          vertex: {
            module: shaderModule,
            entryPoint: 'vertexMain',
          },
          fragment: {
            module: shaderModule,
            entryPoint: 'fragmentMain',
            targets: [{ format }],
          },
          primitive: {
            topology: 'triangle-list',
          },
        })

        const bindGroup = device.createBindGroup({
          layout: bindGroupLayout,
          entries: [
            {
              binding: 0,
              resource: { buffer: uniformBuffer },
            },
          ],
        })

        const resize = () => {
          const rect = canvas.getBoundingClientRect()
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          canvas.width = Math.max(1, Math.floor(rect.width * dpr))
          canvas.height = Math.max(1, Math.floor(rect.height * dpr))
          context.configure({
            device,
            format,
            alphaMode: 'opaque',
          })
        }

        resize()
        window.addEventListener('resize', resize)
        cleanupResize = () => window.removeEventListener('resize', resize)
        onSupportChange?.(true)

        const uniformData = new Float32Array(8)

        const render = (time: number) => {
          uniformData[0] = time * 0.001
          uniformData[1] = canvas.width
          uniformData[2] = canvas.height
          uniformData[3] = scrollProgress
          uniformData[4] = pointer.x
          uniformData[5] = pointer.y
          uniformData[6] = 0
          uniformData[7] = 0

          device.queue.writeBuffer(uniformBuffer, 0, uniformData)

          const encoder = device.createCommandEncoder()
          const textureView = context.getCurrentTexture().createView()
          const pass = encoder.beginRenderPass({
            colorAttachments: [
              {
                view: textureView,
                clearValue: { r: 0.02, g: 0.05, b: 0.1, a: 1 },
                loadOp: 'clear',
                storeOp: 'store',
              },
            ],
          })

          pass.setPipeline(pipeline)
          pass.setBindGroup(0, bindGroup)
          pass.draw(3)
          pass.end()

          device.queue.submit([encoder.finish()])
          frameId = window.requestAnimationFrame(render)
        }

        frameId = window.requestAnimationFrame(render)
      } catch {
        setIsFallback(true)
        onSupportChange?.(false)
      }
    }

    void start()

    return () => {
      cleanupResize()
      window.cancelAnimationFrame(frameId)
      canvas.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('scroll', updateScroll)
    }
  }, [onSupportChange])

  return (
    <>
      <canvas className="webgpu-backdrop" data-webgpu-canvas aria-hidden="true" />
      {isFallback ? <div className="webgpu-fallback" aria-hidden="true" /> : null}
    </>
  )
}
