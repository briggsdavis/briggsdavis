import { useEffect, useRef } from "react"

const MODEL_URL = "/brand/bd3dlogo.glb"
const ENVIRONMENT_URL = "/brand/logoenv.hdr"

type LogoBackgroundProps = {
  active?: boolean
  introActive?: boolean
  mode?: "navigation" | "site" | "footer"
}

const getBackgroundClassName = (
  mode: LogoBackgroundProps["mode"],
  active: boolean,
  introActive: boolean,
) => {
  if (mode === "site")
    return `absolute inset-0 [&_canvas]:size-full ${
      introActive
        ? "origin-center animate-site-logo-intro will-change-[opacity,filter,transform] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:transform-none"
        : ""
    }`
  if (mode === "footer")
    return "pointer-events-none relative h-[clamp(16rem,28vw,24rem)] w-full [&_canvas]:size-full"
  return `pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-700 [&_canvas]:size-full motion-reduce:opacity-100 motion-reduce:transition-none ${
    active ? "opacity-100 [transition-delay:160ms]" : "opacity-0"
  }`
}

export const NavLogoBackground = ({
  active = true,
  introActive = false,
  mode = "navigation",
}: LogoBackgroundProps) => {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const host = hostRef.current
    if (!host) return

    let frame = 0
    let disposed = false
    let cleanup = () => undefined

    const setupScene = async () => {
      const [THREE, { GLTFLoader }, { HDRLoader }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
        import("three/examples/jsm/loaders/HDRLoader.js"),
      ])

      if (disposed) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
      camera.position.set(0, 0, 4.8)

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: false,
      })
      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = mode === "footer" ? 1.05 : 0.9
      renderer.domElement.setAttribute("aria-hidden", "true")
      host.appendChild(renderer.domElement)

      const tiltGroup = new THREE.Group()
      const logoGroup = new THREE.Group()
      tiltGroup.add(logoGroup)
      scene.add(tiltGroup)
      scene.add(new THREE.AmbientLight(0xffffff, 0.65))

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.1)
      keyLight.position.set(2.5, 2.2, 3)
      scene.add(keyLight)

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.2)
      rimLight.position.set(-2, -1.5, 2.5)
      scene.add(rimLight)

      const resize = () => {
        const { width, height } = host.getBoundingClientRect()
        renderer.setSize(width, height, false)
        camera.aspect = width / Math.max(height, 1)
        camera.updateProjectionMatrix()
      }

      const centerModel = (object: InstanceType<typeof THREE.Object3D>) => {
        const box = new THREE.Box3().setFromObject(object)
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()
        box.getSize(size)
        box.getCenter(center)
        object.position.sub(center)

        const largestAxis = Math.max(size.x, size.y, size.z)
        const targetSize = mode === "footer" ? 2.25 : 1.125
        const scale = largestAxis > 0 ? targetSize / largestAxis : 1
        object.scale.setScalar(scale)
      }

      const loadAssets = async () => {
        const [environment, gltf] = await Promise.all([
          new HDRLoader().loadAsync(ENVIRONMENT_URL),
          new GLTFLoader().loadAsync(MODEL_URL),
        ])

        if (disposed) {
          environment.dispose()
          return
        }

        environment.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = environment
        centerModel(gltf.scene)
        logoGroup.add(gltf.scene)
      }

      let lastFrameTime = performance.now()
      let lastScrollY = window.scrollY
      let lastScrollTime = lastFrameTime
      let scrollImpulse = 0
      let scrollTarget = 0
      let pointerYaw = 0
      let pointerPitch = 0
      let targetPointerYaw = 0
      let targetPointerPitch = 0
      const introStartTime = performance.now()
      let siteRotation = 0

      const handleScroll = () => {
        const now = performance.now()
        const elapsed = Math.max(now - lastScrollTime, 16)
        const distance = Math.abs(window.scrollY - lastScrollY)
        const velocity = distance / elapsed

        scrollTarget = Math.min(1, scrollTarget + velocity * 0.24)
        lastScrollY = window.scrollY
        lastScrollTime = now
      }

      const handlePointerMove = (event: PointerEvent) => {
        const footer = host.closest("footer")
        if (!footer) return

        const rect = footer.getBoundingClientRect()
        const isInside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom

        if (!isInside) {
          targetPointerYaw = 0
          targetPointerPitch = 0
          return
        }

        const x = (event.clientX - rect.left) / Math.max(rect.width, 1)
        const y = (event.clientY - rect.top) / Math.max(rect.height, 1)
        targetPointerYaw = (x - 0.5) * 1.2
        targetPointerPitch = (0.5 - y) * 0.72
      }

      const resetPointer = () => {
        targetPointerYaw = 0
        targetPointerPitch = 0
      }

      const animate = () => {
        const now = performance.now()
        const delta = Math.min((now - lastFrameTime) / 1000, 0.05)
        lastFrameTime = now
        const navigationMenuOpen = document.documentElement.hasAttribute(
          "data-navigation-menu-open",
        )

        if (mode === "site" && !navigationMenuOpen) {
          const rise = 1 - Math.exp(-delta * 8)
          const fall = 1 - Math.exp(-delta * 2.6)
          scrollImpulse +=
            (scrollTarget - scrollImpulse) * (scrollTarget > scrollImpulse ? rise : fall)
          scrollTarget *= Math.exp(-delta * 4.2)
          siteRotation += (0.32 + scrollImpulse * 0.72) * delta

          if (introActive) {
            const progress = Math.min(1, (now - introStartTime) / 800)
            const eased = 1 - Math.pow(1 - progress, 3)
            logoGroup.rotation.y = siteRotation - (1 - eased) * Math.PI * 1.6
            logoGroup.scale.setScalar(0.82 + eased * 0.18)
          } else {
            logoGroup.rotation.y = siteRotation
          }
        } else if (mode === "footer") {
          const pointerEase = 1 - Math.exp(-delta * 6.5)
          pointerYaw += (targetPointerYaw - pointerYaw) * pointerEase
          pointerPitch += (targetPointerPitch - pointerPitch) * pointerEase
          tiltGroup.rotation.y = pointerYaw
          tiltGroup.rotation.x = pointerPitch
        } else {
          logoGroup.rotation.y += (activeRef.current ? 0.27 : 0.09) * delta
        }

        if (mode !== "footer" && !(mode === "site" && navigationMenuOpen)) {
          logoGroup.rotation.x = Math.sin(now * 0.00035) * 0.08
        }
        renderer.render(scene, camera)
        frame = window.requestAnimationFrame(animate)
      }

      resize()
      loadAssets().catch(() => undefined)
      animate()
      window.addEventListener("resize", resize)
      if (mode === "site") window.addEventListener("scroll", handleScroll, { passive: true })
      if (mode === "footer") {
        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        window.addEventListener("pointerleave", resetPointer)
      }
      cleanup = () => {
        window.removeEventListener("resize", resize)
        if (mode === "site") window.removeEventListener("scroll", handleScroll)
        if (mode === "footer") {
          window.removeEventListener("pointermove", handlePointerMove)
          window.removeEventListener("pointerleave", resetPointer)
        }
        renderer.dispose()
        scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        })
        if (scene.environment) scene.environment.dispose()
        renderer.domElement.remove()
      }
    }

    setupScene().catch(() => undefined)

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      cleanup()
    }
  }, [introActive, mode])

  return (
    <div
      ref={hostRef}
      className={getBackgroundClassName(mode, active, introActive)}
      aria-hidden="true"
    />
  )
}
