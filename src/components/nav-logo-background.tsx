import { useEffect, useRef } from "react"

const MODEL_URL = "/images/bd3dlogo.glb"
const ENVIRONMENT_URL = "/images/logoenv.hdr"

export const NavLogoBackground = ({ active }: { active: boolean }) => {
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
      renderer.toneMappingExposure = 0.9
      renderer.domElement.setAttribute("aria-hidden", "true")
      host.appendChild(renderer.domElement)

      const logoGroup = new THREE.Group()
      scene.add(logoGroup)
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
        const scale = largestAxis > 0 ? 1.125 / largestAxis : 1
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

      const animate = () => {
        logoGroup.rotation.y += activeRef.current ? 0.0045 : 0.0015
        logoGroup.rotation.x = Math.sin(performance.now() * 0.00035) * 0.08
        renderer.render(scene, camera)
        frame = window.requestAnimationFrame(animate)
      }

      resize()
      loadAssets().catch(() => undefined)
      animate()
      window.addEventListener("resize", resize)
      cleanup = () => {
        window.removeEventListener("resize", resize)
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
  }, [])

  return (
    <div
      ref={hostRef}
      className={`nav-logo-background ${active ? "is-active" : ""}`}
      aria-hidden="true"
    />
  )
}
