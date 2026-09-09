/**
 * Modern ES module adaptation of sirxemic/jquery.ripples.
 * Original project: https://github.com/sirxemic/jquery.ripples
 * MIT License, Copyright (c) 2017 Pim Schreurs.
 */

type RippleConfig = {
  type: number
  arrayType: typeof Float32Array | null
  linearSupport: boolean
  extensions: string[]
}

type RippleOptions = {
  resolution?: number
  dropRadius?: number
  perturbance?: number
  interactive?: boolean
  imageUrl?: string
}

type Program = {
  id: WebGLProgram
  locations: Record<string, WebGLUniformLocation | null>
}

const DEFAULT_OPTIONS = {
  resolution: 256,
  dropRadius: 20,
  perturbance: 0.035,
  interactive: true,
}

const vertexShader = `
attribute vec2 vertex;
varying vec2 coord;
void main() {
  coord = vertex * 0.5 + 0.5;
  gl_Position = vec4(vertex, 0.0, 1.0);
}
`

const dropShader = `
precision highp float;
const float PI = 3.141592653589793;
uniform sampler2D texture;
uniform vec2 center;
uniform float radius;
uniform float strength;
varying vec2 coord;
void main() {
  vec4 info = texture2D(texture, coord);
  float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);
  drop = 0.5 - cos(drop * PI) * 0.5;
  info.r += drop * strength;
  gl_FragColor = info;
}
`

const updateShader = `
precision highp float;
uniform sampler2D texture;
uniform vec2 delta;
varying vec2 coord;
void main() {
  vec4 info = texture2D(texture, coord);
  vec2 dx = vec2(delta.x, 0.0);
  vec2 dy = vec2(0.0, delta.y);
  float average = (
    texture2D(texture, coord - dx).r +
    texture2D(texture, coord - dy).r +
    texture2D(texture, coord + dx).r +
    texture2D(texture, coord + dy).r
  ) * 0.25;
  info.g += (average - info.r) * 2.0;
  info.g *= 0.995;
  info.r += info.g;
  gl_FragColor = info;
}
`

const renderVertexShader = `
precision highp float;
attribute vec2 vertex;
uniform vec2 containerRatio;
varying vec2 ripplesCoord;
varying vec2 backgroundCoord;
void main() {
  backgroundCoord = vertex * 0.5 + 0.5;
  backgroundCoord.y = 1.0 - backgroundCoord.y;
  ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;
  gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);
}
`

const renderShader = `
precision highp float;
uniform sampler2D samplerBackground;
uniform sampler2D samplerRipples;
uniform vec2 delta;
uniform float perturbance;
varying vec2 ripplesCoord;
varying vec2 backgroundCoord;
void main() {
  float height = texture2D(samplerRipples, ripplesCoord).r;
  float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;
  float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;
  vec3 dx = vec3(delta.x, heightX - height, 0.0);
  vec3 dy = vec3(0.0, heightY - height, delta.y);
  vec2 offset = -normalize(cross(dy, dx)).xz;
  float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);
  vec4 color = texture2D(samplerBackground, backgroundCoord + offset * perturbance);
  gl_FragColor = color + vec4(vec3(specular), 0.0);
}
`

let cachedConfig: RippleConfig | null | undefined

function createImageData(width: number, height: number) {
  try {
    return new ImageData(width, height)
  } catch {
    const canvas = document.createElement("canvas")
    return canvas.getContext("2d")?.createImageData(width, height) ?? null
  }
}

function loadConfig(): RippleConfig | null {
  if (cachedConfig !== undefined) return cachedConfig

  const canvas = document.createElement("canvas")
  const gl = canvas.getContext("webgl")
  if (!gl) {
    cachedConfig = null
    return null
  }

  const extensions = {
    OES_texture_float: gl.getExtension("OES_texture_float"),
    OES_texture_half_float: gl.getExtension("OES_texture_half_float"),
    OES_texture_float_linear: gl.getExtension("OES_texture_float_linear"),
    OES_texture_half_float_linear: gl.getExtension("OES_texture_half_float_linear"),
  }

  if (!extensions.OES_texture_float) {
    cachedConfig = null
    return null
  }

  const configs: RippleConfig[] = [
    {
      type: gl.FLOAT,
      arrayType: Float32Array,
      linearSupport: Boolean(extensions.OES_texture_float_linear),
      extensions: ["OES_texture_float"].concat(
        extensions.OES_texture_float_linear ? ["OES_texture_float_linear"] : [],
      ),
    },
  ]

  if (extensions.OES_texture_half_float) {
    configs.push({
      type: extensions.OES_texture_half_float.HALF_FLOAT_OES,
      arrayType: null,
      linearSupport: Boolean(extensions.OES_texture_half_float_linear),
      extensions: ["OES_texture_half_float"].concat(
        extensions.OES_texture_half_float_linear ? ["OES_texture_half_float_linear"] : [],
      ),
    })
  }

  const texture = gl.createTexture()
  const framebuffer = gl.createFramebuffer()

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  cachedConfig = null
  for (const config of configs) {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 32, 32, 0, gl.RGBA, config.type, null)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
      cachedConfig = config
      break
    }
  }

  gl.deleteTexture(texture)
  gl.deleteFramebuffer(framebuffer)
  return cachedConfig
}

function createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
  const compileSource = (type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) throw new Error("Unable to create shader.")

    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compile error.")
    }

    return shader
  }

  const program = gl.createProgram()
  if (!program) throw new Error("Unable to create WebGL program.")

  const vertex = compileSource(gl.VERTEX_SHADER, vertexSource)
  const fragment = compileSource(gl.FRAGMENT_SHADER, fragmentSource)
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.bindAttribLocation(program, 0, "vertex")
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "WebGL program link error.")
  }

  gl.useProgram(program)
  gl.enableVertexAttribArray(0)

  const locations: Program["locations"] = {}
  const shaderCode = `${vertexSource}\n${fragmentSource}`
  const regex = /uniform\s+\w+\s+(\w+)/g
  let match: RegExpExecArray | null
  while ((match = regex.exec(shaderCode))) {
    locations[match[1]] = gl.getUniformLocation(program, match[1])
  }

  return { id: program, locations }
}

function bindTexture(gl: WebGLRenderingContext, texture: WebGLTexture | null, unit = 0) {
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, texture)
}

function makeFallbackWaterTexture() {
  const size = 1024
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext("2d")
  if (!context) return canvas

  const base = context.createLinearGradient(0, 0, size, size)
  base.addColorStop(0, "#fcfcfc")
  base.addColorStop(0.42, "#efeeed")
  base.addColorStop(0.72, "#e5e4e3")
  base.addColorStop(1, "#fafafa")
  context.fillStyle = base
  context.fillRect(0, 0, size, size)

  const glow = context.createRadialGradient(
    size * 0.56,
    size * 0.42,
    0,
    size * 0.56,
    size * 0.42,
    size * 0.72,
  )
  glow.addColorStop(0, "rgba(65, 61, 59, 0.18)")
  glow.addColorStop(0.45, "rgba(151, 147, 144, 0.08)")
  glow.addColorStop(1, "rgba(255, 255, 255, 0)")
  context.fillStyle = glow
  context.fillRect(0, 0, size, size)

  context.globalCompositeOperation = "multiply"
  for (let line = 0; line < 92; line += 1) {
    const y = (line / 91) * size
    const phase = line * 0.77
    context.beginPath()
    for (let x = -24; x <= size + 24; x += 12) {
      const wave =
        Math.sin(x * 0.012 + phase) * (8 + (line % 7)) + Math.sin(x * 0.0038 - phase * 0.6) * 17
      if (x === -24) context.moveTo(x, y + wave)
      else context.lineTo(x, y + wave)
    }
    context.strokeStyle = line % 4 === 0 ? "rgba(35, 32, 30, 0.065)" : "rgba(110, 106, 103, 0.032)"
    context.lineWidth = line % 4 === 0 ? 1.6 : 0.8
    context.stroke()
  }
  context.globalCompositeOperation = "source-over"

  return canvas
}

export function canUseNavigationRipples() {
  return Boolean(loadConfig())
}

export class NavigationRipples {
  private canvas: HTMLCanvasElement
  private gl: WebGLRenderingContext
  private config: RippleConfig
  private options: Required<Omit<RippleOptions, "imageUrl">> & Pick<RippleOptions, "imageUrl">
  private textureDelta: Float32Array
  private textures: WebGLTexture[] = []
  private framebuffers: WebGLFramebuffer[] = []
  private bufferWriteIndex = 0
  private bufferReadIndex = 1
  private quad: WebGLBuffer | null = null
  private backgroundTexture: WebGLTexture | null = null
  private dropProgram: Program | null = null
  private updateProgram: Program | null = null
  private renderProgram: Program | null = null
  private imageUrl?: string
  private imageLoadId = 0
  private fallbackTexture = makeFallbackWaterTexture()
  private animationFrame = 0
  private autoDropTimer = 0
  private destroyed = false
  private running = false
  private resizeObserver: ResizeObserver | null = null
  private pointerDropFrame = 0
  private pendingPointer: { x: number; y: number } | null = null
  private pointerMoveListener = (event: PointerEvent) => this.queuePointerDrop(event)
  private pointerDownListener = (event: PointerEvent) => this.dropAtPointer(event, true)

  constructor(canvas: HTMLCanvasElement, options: RippleOptions = {}) {
    const config = loadConfig()
    const gl = canvas.getContext("webgl", { alpha: true })

    if (!config || !gl) {
      throw new Error("WebGL ripples are not supported in this browser.")
    }

    this.canvas = canvas
    this.gl = gl
    this.config = config
    this.options = { ...DEFAULT_OPTIONS, ...options }
    this.imageUrl = this.options.imageUrl
    this.textureDelta = new Float32Array([1 / this.options.resolution, 1 / this.options.resolution])

    this.config.extensions.forEach((name) => this.gl.getExtension(name))
    this.resize()
    this.initTargets()
    this.initQuad()
    this.initShaders()
    this.initTexture()
    this.loadImage()
    this.setupEvents()
  }

  start() {
    if (this.running || this.destroyed) return

    this.running = true
    this.loop()
    this.scheduleAutoDrop(160)
  }

  setImageUrl(imageUrl: string | null) {
    this.imageUrl = imageUrl || undefined
    return this.loadImage()
  }

  stop() {
    this.running = false
    window.clearTimeout(this.autoDropTimer)
    window.cancelAnimationFrame(this.animationFrame)
  }

  destroy() {
    this.stop()
    this.destroyed = true
    this.resizeObserver?.disconnect()
    window.cancelAnimationFrame(this.pointerDropFrame)
    this.canvas.removeEventListener("pointermove", this.pointerMoveListener)
    this.canvas.removeEventListener("pointerdown", this.pointerDownListener)

    const gl = this.gl
    this.textures.forEach((texture) => gl.deleteTexture(texture))
    this.framebuffers.forEach((framebuffer) => gl.deleteFramebuffer(framebuffer))
    if (this.backgroundTexture) gl.deleteTexture(this.backgroundTexture)
    if (this.quad) gl.deleteBuffer(this.quad)
    ;[this.dropProgram, this.updateProgram, this.renderProgram].forEach((program) => {
      if (program) gl.deleteProgram(program.id)
    })
  }

  drop(x: number, y: number, radius = this.options.dropRadius, strength = 0.018) {
    const gl = this.gl
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    const longestSide = Math.max(width, height)
    if (!longestSide || !this.dropProgram) return

    const dropPosition = new Float32Array([
      (2 * x - width) / longestSide,
      (height - 2 * y) / longestSide,
    ])

    gl.viewport(0, 0, this.options.resolution, this.options.resolution)
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex])
    bindTexture(gl, this.textures[this.bufferReadIndex])
    gl.useProgram(this.dropProgram.id)
    gl.uniform2fv(this.dropProgram.locations.center, dropPosition)
    gl.uniform1f(this.dropProgram.locations.radius, radius / longestSide)
    gl.uniform1f(this.dropProgram.locations.strength, strength)
    this.drawQuad()
    this.swapBuffers()
  }

  private initTargets() {
    const gl = this.gl
    const textureData = this.config.arrayType
      ? new this.config.arrayType(this.options.resolution * this.options.resolution * 4)
      : null

    for (let i = 0; i < 2; i += 1) {
      const texture = gl.createTexture()
      const framebuffer = gl.createFramebuffer()
      if (!texture || !framebuffer) throw new Error("Unable to create ripple target.")

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        this.config.linearSupport ? gl.LINEAR : gl.NEAREST,
      )
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        this.config.linearSupport ? gl.LINEAR : gl.NEAREST,
      )
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        this.options.resolution,
        this.options.resolution,
        0,
        gl.RGBA,
        this.config.type,
        textureData,
      )
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

      this.textures.push(texture)
      this.framebuffers.push(framebuffer)
    }
  }

  private initQuad() {
    const gl = this.gl
    this.quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW)
  }

  private initShaders() {
    const gl = this.gl
    this.dropProgram = createProgram(gl, vertexShader, dropShader)
    this.updateProgram = createProgram(gl, vertexShader, updateShader)
    gl.uniform2fv(this.updateProgram.locations.delta, this.textureDelta)

    this.renderProgram = createProgram(gl, renderVertexShader, renderShader)
    gl.uniform2fv(this.renderProgram.locations.delta, this.textureDelta)
  }

  private initTexture() {
    const gl = this.gl
    this.backgroundTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.backgroundTexture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    this.setTransparentTexture()
  }

  private loadImage(): Promise<boolean> {
    const loadId = ++this.imageLoadId

    if (!this.imageUrl) {
      this.setTexture(this.fallbackTexture)
      return Promise.resolve(true)
    }

    return new Promise((resolve) => {
      const image = new Image()
      image.addEventListener(
        "load",
        () => {
          if (loadId !== this.imageLoadId || this.destroyed) {
            resolve(false)
            return
          }
          this.setTexture(image)
          resolve(true)
        },
        { once: true },
      )
      image.addEventListener(
        "error",
        () => {
          if (loadId === this.imageLoadId) this.setTransparentTexture()
          resolve(false)
        },
        { once: true },
      )
      image.src = this.imageUrl as string
    })
  }

  private setTexture(source: TexImageSource) {
    const gl = this.gl
    gl.bindTexture(gl.TEXTURE_2D, this.backgroundTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
  }

  private setTransparentTexture() {
    const pixels = createImageData(32, 32)
    if (!pixels) return

    const gl = this.gl
    gl.bindTexture(gl.TEXTURE_2D, this.backgroundTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
  }

  private setupEvents() {
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.canvas)

    if (this.options.interactive) {
      this.canvas.addEventListener("pointermove", this.pointerMoveListener, { passive: true })
      this.canvas.addEventListener("pointerdown", this.pointerDownListener, { passive: true })
    }
  }

  private dropAtPointer(event: PointerEvent, big: boolean) {
    const rect = this.canvas.getBoundingClientRect()
    this.drop(
      event.clientX - rect.left,
      event.clientY - rect.top,
      this.options.dropRadius * (big ? 1.8 : 1),
      big ? 0.2 : 0.038,
    )
  }

  private queuePointerDrop(event: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect()
    this.pendingPointer = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    if (this.pointerDropFrame) return

    this.pointerDropFrame = window.requestAnimationFrame(() => {
      this.pointerDropFrame = 0
      if (!this.pendingPointer) return
      this.drop(this.pendingPointer.x, this.pendingPointer.y, this.options.dropRadius, 0.038)
      this.pendingPointer = null
    })
  }

  private resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    const width = Math.max(1, Math.floor(this.canvas.clientWidth * dpr))
    const height = Math.max(1, Math.floor(this.canvas.clientHeight * dpr))

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width
      this.canvas.height = height
    }
  }

  private loop = () => {
    if (!this.running || this.destroyed) return

    this.update()
    this.render()
    this.animationFrame = window.requestAnimationFrame(this.loop)
  }

  private scheduleAutoDrop(delay = 1500) {
    window.clearTimeout(this.autoDropTimer)
    this.autoDropTimer = window.setTimeout(() => {
      if (!this.running || this.destroyed) return

      const width = this.canvas.clientWidth
      const height = this.canvas.clientHeight
      this.drop(
        width * (0.18 + Math.random() * 0.64),
        height * (0.12 + Math.random() * 0.76),
        28 + Math.random() * 34,
        0.025,
      )
      this.scheduleAutoDrop(1200 + Math.random() * 1800)
    }, delay)
  }

  private update() {
    if (!this.updateProgram) return

    const gl = this.gl
    gl.viewport(0, 0, this.options.resolution, this.options.resolution)
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex])
    bindTexture(gl, this.textures[this.bufferReadIndex])
    gl.useProgram(this.updateProgram.id)
    this.drawQuad()
    this.swapBuffers()
  }

  private render() {
    if (!this.renderProgram) return

    const gl = this.gl
    const maxSide = Math.max(this.canvas.width, this.canvas.height)
    const containerRatio = new Float32Array([
      this.canvas.width / maxSide,
      this.canvas.height / maxSide,
    ])

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.enable(gl.BLEND)
    gl.clearColor(0, 0, 0, 0)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(this.renderProgram.id)
    bindTexture(gl, this.backgroundTexture, 0)
    bindTexture(gl, this.textures[0], 1)
    gl.uniform1f(this.renderProgram.locations.perturbance, this.options.perturbance)
    gl.uniform2fv(this.renderProgram.locations.containerRatio, containerRatio)
    gl.uniform1i(this.renderProgram.locations.samplerBackground, 0)
    gl.uniform1i(this.renderProgram.locations.samplerRipples, 1)
    this.drawQuad()
    gl.disable(gl.BLEND)
  }

  private drawQuad() {
    const gl = this.gl
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
  }

  private swapBuffers() {
    this.bufferWriteIndex = 1 - this.bufferWriteIndex
    this.bufferReadIndex = 1 - this.bufferReadIndex
  }
}
