import { useEffect, useRef } from "react"

const MODEL_URL = "/images/bd3dlogo.glb"
const ENVIRONMENT_URL = "/images/logoenv.hdr"

type LogoBackgroundProps = {
  active?: boolean
  mode?: "navigation" | "site" | "footer"
}

const getBackgroundClassName = (mode: LogoBackgroundProps["mode"], active: boolean) => {
  if (mode === "site") return "site-logo-background"
  if (mode === "footer") return "footer-logo-visual"
  return `nav-logo-background ${active ? "is-active" : ""}`
}

export const NavLogoBackground = ({
  active = true,
  mode = "navigation",
}: LogoBackgroundProps) => {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
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

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
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

        if (mode === "site") {
          const rise = 1 - Math.exp(-delta * 8)
          const fall = 1 - Math.exp(-delta * 2.6)
          scrollImpulse += (scrollTarget - scrollImpulse) * (scrollTarget > scrollImpulse ? rise : fall)
          scrollTarget *= Math.exp(-delta * 4.2)
          logoGroup.rotation.y += (0.32 + scrollImpulse * 0.72) * delta
        } else if (mode === "footer") {
          const pointerEase = 1 - Math.exp(-delta * 6.5)
          pointerYaw += (targetPointerYaw - pointerYaw) * pointerEase
          pointerPitch += (targetPointerPitch - pointerPitch) * pointerEase
          tiltGroup.rotation.y = pointerYaw
          tiltGroup.rotation.x = pointerPitch
        } else {
          logoGroup.rotation.y += (activeRef.current ? 0.27 : 0.09) * delta
        }

        if (mode !== "footer") {
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
  }, [mode])

  return (
    <div
      ref={hostRef}
      className={getBackgroundClassName(mode, active)}
      aria-hidden="true"
    />
  )
}
