import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function createScreenTexture(label, index) {
  const canvas = document.createElement('canvas')
  canvas.width = 1400
  canvas.height = 900
  const context = canvas.getContext('2d')
  const palettes = [
    ['#eaffd4', '#6dbb77', '#0b392b'],
    ['#d9fff1', '#4a9b82', '#092a21'],
    ['#f0ffd2', '#a5c95d', '#19331f'],
  ]
  const [light, middle, dark] = palettes[index % palettes.length]
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, dark)
  gradient.addColorStop(0.55, middle)
  gradient.addColorStop(1, light)
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = 'rgba(238,255,220,.42)'
  context.lineWidth = 2
  for (let radius = 90; radius < 760; radius += 105) {
    context.beginPath()
    context.arc(canvas.width * 0.7, canvas.height * 0.35, radius, 0, Math.PI * 2)
    context.stroke()
  }
  context.fillStyle = 'rgba(244,255,228,.9)'
  context.font = '500 42px Arial'
  context.fillText(`PORTFOLIO / 0${index + 1}`, 76, 92)
  context.font = '500 148px Georgia'
  context.fillText(label, 72, 690)
  context.font = '400 28px Arial'
  context.fillText('MOVE HORIZONTALLY TO EXPLORE', 78, 760)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createWorkScreenTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1400
  canvas.height = 900
  const context = canvas.getContext('2d')
  const imageUrls = [
    '/about/photo-05.jpg',
    '/about/photo-01.jpg',
    '/about/photo-02.jpg',
  ]
  const images = imageUrls.map(() => null)
  let disposed = false

  const drawCover = (image, x, y, width, height) => {
    if (!image?.complete || !image.naturalWidth) {
      const placeholder = context.createLinearGradient(x, y, x + width, y + height)
      placeholder.addColorStop(0, '#174e35')
      placeholder.addColorStop(1, '#061912')
      context.fillStyle = placeholder
      context.fillRect(x, y, width, height)
      return
    }
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
    const sourceWidth = width / scale
    const sourceHeight = height / scale
    const sourceX = (image.naturalWidth - sourceWidth) * 0.5
    const sourceY = (image.naturalHeight - sourceHeight) * 0.42
    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      x,
      y,
      width,
      height,
    )
  }

  const draw = () => {
    if (disposed) return
    const background = context.createRadialGradient(700, 400, 40, 700, 430, 860)
    background.addColorStop(0, '#174c32')
    background.addColorStop(0.5, '#092a1d')
    background.addColorStop(1, '#020b08')
    context.fillStyle = background
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.strokeStyle = 'rgba(181, 226, 153, .09)'
    context.lineWidth = 1
    for (let x = 0; x <= canvas.width; x += 72) {
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, canvas.height)
      context.stroke()
    }
    for (let y = 0; y <= canvas.height; y += 72) {
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(canvas.width, y)
      context.stroke()
    }

    context.fillStyle = 'rgba(232, 255, 216, .92)'
    context.font = '500 32px Arial'
    context.fillText('01 / SELECTED WORK', 66, 76)
    context.textAlign = 'right'
    context.fillStyle = 'rgba(213, 238, 196, .64)'
    context.font = '400 23px Arial'
    context.fillText('THE REEL IS READY', 1334, 76)
    context.textAlign = 'center'
    context.fillStyle = '#f0ffdf'
    context.shadowColor = 'rgba(186, 255, 137, .7)'
    context.shadowBlur = 22
    context.font = '500 76px Georgia'
    context.fillText('SELECTED WORK', 700, 188)
    context.shadowBlur = 0

    const reelX = 85
    const reelY = 265
    const reelWidth = 1230
    const reelHeight = 440
    context.fillStyle = '#010503'
    context.fillRect(reelX, reelY, reelWidth, reelHeight)

    context.fillStyle = '#163b2c'
    for (let x = reelX + 18; x < reelX + reelWidth - 20; x += 52) {
      context.fillRect(x, reelY + 13, 29, 29)
      context.fillRect(x, reelY + reelHeight - 42, 29, 29)
    }

    const frameY = reelY + 58
    const frameHeight = reelHeight - 116
    const frameWidth = 388
    images.forEach((image, index) => {
      const x = reelX + 24 + index * (frameWidth + 9)
      drawCover(image, x, frameY, frameWidth, frameHeight)
      context.fillStyle = '#010503'
      context.fillRect(x + frameWidth, frameY, 9, frameHeight)
    })

    context.fillStyle = 'rgba(226, 249, 208, .78)'
    context.font = '400 23px Arial'
    context.fillText('GAME DESIGN  ·  PRODUCT  ·  ILLUSTRATION', 700, 785)
    texture.needsUpdate = true
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.userData.disposeWorkTexture = () => {
    disposed = true
  }
  draw()

  imageUrls.forEach((url, index) => {
    const image = new Image()
    image.onload = () => {
      images[index] = image
      draw()
    }
    image.src = url
  })

  return texture
}

function createWorkBackdropTexture(initialAspect = 16 / 10) {
  const canvas = document.createElement('canvas')
  canvas.width = 1400
  canvas.height = Math.round(canvas.width / initialAspect)
  const context = canvas.getContext('2d')
  let disposed = false
  let texture = null

  const draw = () => {
    if (disposed) return
    const width = canvas.width
    const height = canvas.height
    const background = context.createRadialGradient(
      width * 0.5,
      height * 0.43,
      width * 0.025,
      width * 0.5,
      height * 0.43,
      Math.max(width, height) * 0.72,
    )
    background.addColorStop(0, '#174832')
    background.addColorStop(0.42, '#0a2c1f')
    background.addColorStop(1, '#03140e')
    context.fillStyle = background
    context.fillRect(0, 0, width, height)

    context.strokeStyle = 'rgba(181, 226, 153, .075)'
    context.lineWidth = 1
    const gridSize = Math.max(42, Math.round(width / 20))
    for (let x = 0; x <= width; x += gridSize) {
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, height)
      context.stroke()
    }
    for (let y = 0; y <= height; y += gridSize) {
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(width, y)
      context.stroke()
    }

    const glow = context.createRadialGradient(
      width * 0.52,
      height * 0.47,
      0,
      width * 0.52,
      height * 0.47,
      width * 0.26,
    )
    glow.addColorStop(0, 'rgba(171, 216, 130, .16)')
    glow.addColorStop(1, 'rgba(171, 216, 130, 0)')
    context.fillStyle = glow
    context.fillRect(0, 0, width, height)
    if (texture) texture.needsUpdate = true
  }

  texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.userData.setAspect = (aspect) => {
    if (!Number.isFinite(aspect) || aspect <= 0) return
    canvas.height = Math.max(512, Math.round(canvas.width / aspect))
    draw()
  }
  texture.userData.disposeWorkTexture = () => {
    disposed = true
  }
  draw()
  return texture
}

export default function HeroScene({
  apiRef,
  workViewportRef,
  onTransitionPhase,
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const stage = mount.closest('.hero-stage')
    const hero = mount.closest('.hero')
    const workSection = workViewportRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(46, 1, 0.02, 100)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    // Start much closer to the desk/window composition. This keeps the camera
    // front-on while letting the window frame nearly touch the viewport edges,
    // matching the intended wide desktop crop.
    const initialCamera = new THREE.Vector3(2.6, 1.56, -0.55)
    const initialTarget = new THREE.Vector3(-2.45, 1.8, -0.32)
    const currentTarget = initialTarget.clone()
    camera.position.copy(initialCamera)
    camera.lookAt(initialTarget)

    scene.add(new THREE.HemisphereLight(0xcbe6be, 0x06140f, 1.35))
    const sun = new THREE.DirectionalLight(0xf5ffd0, 3.5)
    sun.position.set(2.5, 8, 5)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    sun.shadow.camera.near = 0.1
    sun.shadow.camera.far = 30
    scene.add(sun)
    const screenLight = new THREE.PointLight(0xb6ff8a, 0, 9, 2)
    scene.add(screenLight)

    const screenTextures = [
      createScreenTexture('GAME', 0),
      createScreenTexture('PRODUCT', 1),
      createScreenTexture('VISUAL', 2),
    ]
    const workScreenTexture = createWorkBackdropTexture()
    let screen = null
    let screenBody = null
    let screenMaterial = null
    let workScreen = null
    let workScreenMaterial = null
    let screenIndex = 0
    const screenCenter = new THREE.Vector3(-2.66, 1.5, -1.97)
    let screenApproach = initialCamera.clone()
    let screenThrough = initialCamera.clone()
    let throughTarget = initialTarget.clone()
    let towardCamera = new THREE.Vector3(1, 0, 0)
    const portalBounds = {
      left: window.innerWidth * 0.46,
      top: window.innerHeight * 0.32,
      right: window.innerWidth * 0.72,
      bottom: window.innerHeight * 0.68,
    }

    const loader = new GLTFLoader()
    loader.load('/hero/hero-scene.glb', (gltf) => {
      const modelRoot = gltf.scene
      modelRoot.traverse((object) => {
        if (!object.isMesh) return
        object.castShadow = true
        object.receiveShadow = true
        if (object.name === 'screen') {
          screenBody = object
          object.material = new THREE.MeshStandardMaterial({
            color: '#101b17',
            roughness: 0.24,
            metalness: 0.12,
            side: THREE.DoubleSide,
          })
          return
        }
        const material = object.material?.clone?.()
        if (!material) return
        const materialName = material.name || ''
        if (materialName.includes('老木')) {
          material.color.set('#17442f')
          material.roughness = 0.48
        } else if (materialName.includes('RAL')) {
          material.color.set('#244c37')
          material.roughness = 0.74
        } else if (materialName.includes('钢') || materialName.includes('铝')) {
          material.color.set('#111d18')
          material.metalness = 0.46
          material.roughness = 0.34
        } else {
          material.color?.multiplyScalar?.(0.45)
        }
        material.side = THREE.DoubleSide
        object.material = material
      })
      if (screenBody) {
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(
            [
              -0.94, 1.035, 0.94,
              -0.94, 1.035, -0.94,
              0.94, 1.035, -0.94,
              0.94, 1.035, 0.94,
            ],
            3,
          ),
        )
        geometry.setAttribute(
          'uv',
          new THREE.Float32BufferAttribute(
            [
              1, 1,
              0, 1,
              0, 0,
              1, 0,
            ],
            2,
          ),
        )
        geometry.setIndex([0, 1, 2, 0, 2, 3])
        geometry.computeVertexNormals()
        screenMaterial = new THREE.MeshStandardMaterial({
          map: screenTextures[0],
          emissive: new THREE.Color(0xb7ff92),
          emissiveMap: screenTextures[0],
          emissiveIntensity: 0.72,
          transparent: true,
          opacity: 1,
          roughness: 0.2,
          metalness: 0,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -2,
          depthTest: false,
          depthWrite: false,
        })
        screen = new THREE.Mesh(geometry, screenMaterial)
        screen.name = 'interactive-screen'
        screen.renderOrder = 3
        screenBody.add(screen)

        workScreenMaterial = new THREE.MeshBasicMaterial({
          map: workScreenTexture,
          color: new THREE.Color(0xffffff),
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          depthTest: false,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -3,
          polygonOffsetUnits: -3,
        })
        workScreen = new THREE.Mesh(geometry.clone(), workScreenMaterial)
        workScreen.name = 'work-screen-backdrop'
        workScreen.renderOrder = 4
        screenBody.add(workScreen)
      }
      scene.add(modelRoot)
      if (screen) {
        screen.updateWorldMatrix(true, false)
        screen.getWorldPosition(screenCenter)
        towardCamera = initialCamera.clone().sub(screenCenter).normalize()
        const topLeft = screen.localToWorld(new THREE.Vector3(-0.94, 1.035, 0.94))
        const topRight = screen.localToWorld(new THREE.Vector3(0.94, 1.035, 0.94))
        const bottomLeft = screen.localToWorld(new THREE.Vector3(-0.94, 1.035, -0.94))
        const screenWidth = topLeft.distanceTo(topRight)
        const screenHeight = topLeft.distanceTo(bottomLeft)
        const screenAspect = screenWidth / Math.max(screenHeight, 0.001)
        workScreenTexture.userData.setAspect?.(screenAspect)
        const verticalFov = THREE.MathUtils.degToRad(camera.fov)
        const horizontalFov =
          2 * Math.atan(Math.tan(verticalFov * 0.5) * camera.aspect)
        const verticalCoverDistance =
          (screenHeight * 0.5) / Math.tan(verticalFov * 0.5)
        const horizontalCoverDistance =
          (screenWidth * 0.5) / Math.tan(horizontalFov * 0.5)
        const distance =
          Math.min(verticalCoverDistance, horizontalCoverDistance) * 0.9
        screenApproach = screenCenter
          .clone()
          .add(towardCamera.clone().multiplyScalar(Math.max(distance, 0.38)))
        screenThrough = screenCenter.clone().sub(towardCamera.clone().multiplyScalar(1.45))
        throughTarget = screenCenter.clone().sub(towardCamera.clone().multiplyScalar(6))
        screenLight.position.copy(screenCenter).add(towardCamera.multiplyScalar(0.42))
      }
      stage.classList.add('model-ready')
    })

    const pointer = { x: 0, y: 0, smoothX: 0, smoothY: 0 }
    const raycaster = new THREE.Raycaster()
    const pointerNdc = new THREE.Vector2()
    let screenHovered = false
    let dragOrigin = null
    let slide = null
    let autoScrollFrame = null
    let autoScrolling = false
    let autoScrollDirection = 0
    let autoTransitionComplete = false
    let forcedHeroProgress = null
    let forcedPortalProgress = null
    let lockedScrollY = window.scrollY
    let previousScrollY = window.scrollY
    let previousInlineScrollBehavior = ''
    let reverseWheelAmount = 0
    let reverseWheelTimestamp = 0

    const normalizeWorkPortal = (destinationIsWork) => {
      if (!workSection) return
      workSection.style.setProperty(
        '--work-portal-content-opacity',
        destinationIsWork ? '1' : '0',
      )
      workSection.style.setProperty(
        '--work-portal-background-opacity',
        destinationIsWork ? '1' : '0',
      )
      workSection.style.setProperty(
        '--work-reel-opacity',
        destinationIsWork ? '1' : '0',
      )
      workSection.style.setProperty(
        '--work-reel-scale',
        destinationIsWork ? '1' : '0.65',
      )
      workSection.style.setProperty(
        '--work-reel-blur',
        destinationIsWork ? '0px' : '6px',
      )
      workSection.style.setProperty(
        '--work-ui-opacity',
        destinationIsWork ? '1' : '0',
      )
    }

    const stopAutoScroll = (complete = false, notify = true) => {
      if (autoScrollFrame !== null) cancelAnimationFrame(autoScrollFrame)
      autoScrollFrame = null
      autoScrolling = false
      autoScrollDirection = 0
      autoTransitionComplete = complete
      forcedHeroProgress = null
      forcedPortalProgress = null
      stage.classList.remove('hero-transition-active')
      document.documentElement.style.scrollBehavior = previousInlineScrollBehavior
      previousScrollY = window.scrollY
      normalizeWorkPortal(complete)
      if (notify) onTransitionPhase(complete ? 'work' : 'hero')
    }

    const startAutoTransition = (direction) => {
      if (autoScrolling && direction === autoScrollDirection) return
      if (!autoScrolling && direction > 0 && autoTransitionComplete) return

      const reversing = autoScrolling
      if (reversing && autoScrollFrame !== null) {
        cancelAnimationFrame(autoScrollFrame)
        autoScrollFrame = null
      }
      const rect = hero.getBoundingClientRect()
      const scrollRange = Math.max(rect.height - window.innerHeight, 1)
      const actualProgress = THREE.MathUtils.clamp(-rect.top / scrollRange, 0, 1)
      const startProgress = forcedHeroProgress ?? actualProgress
      const startPortalProgress =
        forcedPortalProgress ??
        (direction > 0
          ? 0
          : THREE.MathUtils.smoothstep(actualProgress, 0.48, 0.98))
      const targetProgress = direction > 0 ? 1 : 0
      const targetPortalProgress = direction > 0 ? 1 : 0
      const targetY = direction > 0 ? hero.offsetTop + hero.offsetHeight : hero.offsetTop
      if (Math.abs(targetProgress - startProgress) <= 0.002) {
        autoTransitionComplete = direction > 0
        return
      }

      autoScrolling = true
      autoScrollDirection = direction
      stage.classList.add('hero-transition-active')
      onTransitionPhase(direction > 0 ? 'hero-to-work' : 'work-to-hero')
      forcedHeroProgress = startProgress
      forcedPortalProgress = startPortalProgress
      lockedScrollY = window.scrollY
      if (!reversing) {
        previousInlineScrollBehavior = document.documentElement.style.scrollBehavior
      }
      document.documentElement.style.scrollBehavior = 'auto'
      const startedAt = performance.now()
      const duration = Math.max(
        220,
        1100 * Math.abs(targetPortalProgress - startPortalProgress),
      )

      const step = (now) => {
        if (!autoScrolling) return
        const progress = THREE.MathUtils.clamp((now - startedAt) / duration, 0, 1)
        const eased = THREE.MathUtils.smoothstep(progress, 0, 1)
        forcedHeroProgress =
          startProgress + (targetProgress - startProgress) * eased
        forcedPortalProgress =
          startPortalProgress + (targetPortalProgress - startPortalProgress) * eased
        if (progress < 1) {
          autoScrollFrame = requestAnimationFrame(step)
        } else {
          // The destination is already covering the viewport as a fixed portal.
          // Move the document once behind it, then release the portal next frame.
          forcedHeroProgress = targetProgress
          forcedPortalProgress = targetPortalProgress
          lockedScrollY = targetY
          window.scrollTo(0, targetY)
          autoScrollFrame = requestAnimationFrame(() => {
            stopAutoScroll(direction > 0)
          })
        }
      }

      autoScrollFrame = requestAnimationFrame(step)
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const movingDown = currentScrollY > previousScrollY
      const movingUp = currentScrollY < previousScrollY
      previousScrollY = currentScrollY
      if (autoScrolling) {
        if (Math.abs(currentScrollY - lockedScrollY) > 1) {
          window.scrollTo(0, lockedScrollY)
        }
        return
      }

      const rect = hero.getBoundingClientRect()
      const scrollRange = Math.max(rect.height - window.innerHeight, 1)
      const progress = THREE.MathUtils.clamp(-rect.top / scrollRange, 0, 1)
      if (progress < 0.32) autoTransitionComplete = false
      if (movingDown && progress >= 0.48 && progress < 0.98) {
        startAutoTransition(1)
      } else if (movingUp && progress > 0.48 && progress <= 0.98) {
        startAutoTransition(-1)
      }
    }

    const onWheel = (event) => {
      const direction = Math.sign(event.deltaY)
      if (direction === 0) return

      if (autoScrolling) {
        event.preventDefault()
        if (direction === autoScrollDirection) {
          reverseWheelAmount = 0
          return
        }
        const now = performance.now()
        if (now - reverseWheelTimestamp > 140) reverseWheelAmount = 0
        reverseWheelTimestamp = now
        reverseWheelAmount += Math.abs(event.deltaY)
        if (reverseWheelAmount >= 28) {
          reverseWheelAmount = 0
          startAutoTransition(direction)
        }
        return
      }

      if (direction < 0) {
        const workRect = workSection?.getBoundingClientRect()
        const heroRect = hero.getBoundingClientRect()
        const heroReverseBlockedUntil = Number(
          workSection?.dataset.heroReverseBlockedUntil || 0,
        )
        const workAllowsHeroReverse =
          workSection?.classList.contains('phase-work') &&
          workSection?.classList.contains('level-categories') &&
          !workSection?.classList.contains('work-returning') &&
          performance.now() >= heroReverseBlockedUntil
        const workIsFocused =
          workRect && workRect.top <= 12 && workRect.bottom >= window.innerHeight * 0.8
        const heroIsImmediatelyAbove = heroRect.bottom <= 12 && heroRect.bottom >= -32
        if (workAllowsHeroReverse && workIsFocused && heroIsImmediatelyAbove) {
          event.preventDefault()
          startAutoTransition(-1)
        }
      }
    }

    const onPointer = (event) => {
      pointer.x = event.clientX / window.innerWidth * 2 - 1
      pointer.y = -(event.clientY / window.innerHeight * 2 - 1)
      pointerNdc.set(pointer.x, pointer.y)
      if (!screenHovered || slide) {
        if (!screenHovered) dragOrigin = null
        return
      }
      if (dragOrigin === null) dragOrigin = event.clientX
      const delta = event.clientX - dragOrigin
      if (Math.abs(delta) > 76) {
        const direction = delta > 0 ? 1 : -1
        slide = {
          direction,
          start: performance.now(),
          swapped: false,
          next: (screenIndex - direction + screenTextures.length) % screenTextures.length,
        }
        dragOrigin = event.clientX
      }
    }

    const resize = () => {
      const { clientWidth, clientHeight } = mount
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })

    apiRef.current = {
      cancelForNavigation(section) {
        if (autoScrollFrame !== null) cancelAnimationFrame(autoScrollFrame)
        autoScrollFrame = null
        autoScrolling = false
        autoScrollDirection = 0
        forcedHeroProgress = null
        forcedPortalProgress = null
        autoTransitionComplete = section !== 'top'
        stage.classList.remove('hero-transition-active')
        document.documentElement.style.scrollBehavior = previousInlineScrollBehavior
        const destinationIsWork = section === 'work'
        normalizeWorkPortal(destinationIsWork)
      },
    }

    let frame
    const animate = () => {
      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.045
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.045

      const rect = hero.getBoundingClientRect()
      const scrollRange = Math.max(rect.height - window.innerHeight, 1)
      const actualProgress = THREE.MathUtils.clamp(-rect.top / scrollRange, 0, 1)
      const rawProgress = forcedHeroProgress ?? actualProgress
      // Hero and Work share one deterministic timeline, so upward scrolling
      // renders exactly the same frames in reverse.
      const portalProgress =
        forcedPortalProgress ?? THREE.MathUtils.smoothstep(rawProgress, 0.48, 0.98)
      const approachProgress = THREE.MathUtils.smoothstep(portalProgress, 0, 0.74)
      const throughProgress = THREE.MathUtils.smoothstep(portalProgress, 0.74, 0.94)
      const parallaxStrength = 1 - approachProgress
      const pointerCamera = new THREE.Vector3(
        pointer.smoothX * 0.28 * parallaxStrength,
        pointer.smoothY * 0.16 * parallaxStrength,
        pointer.smoothX * 0.08 * parallaxStrength,
      )
      camera.position
        .copy(initialCamera)
        .lerp(screenApproach, approachProgress)
        .lerp(screenThrough, throughProgress)
        .add(pointerCamera)
      currentTarget
        .copy(initialTarget)
        .lerp(screenCenter, approachProgress)
        .lerp(throughTarget, throughProgress)
        .add(new THREE.Vector3(pointer.smoothX * 0.05, pointer.smoothY * 0.04, 0))
      camera.lookAt(currentTarget)

      stage.style.setProperty('--px', pointer.smoothX.toFixed(4))
      stage.style.setProperty('--py', pointer.smoothY.toFixed(4))
      stage.style.setProperty('--far-x', `${(-pointer.smoothX * 8).toFixed(2)}px`)
      stage.style.setProperty('--far-y', `${(pointer.smoothY * 5).toFixed(2)}px`)
      stage.style.setProperty('--mid-x', `${(-pointer.smoothX * 17).toFixed(2)}px`)
      stage.style.setProperty('--mid-y', `${(pointer.smoothY * 10).toFixed(2)}px`)
      stage.style.setProperty('--near-x', `${(-pointer.smoothX * 30).toFixed(2)}px`)
      stage.style.setProperty('--near-y', `${(pointer.smoothY * 17).toFixed(2)}px`)
      stage.style.setProperty('--title-x', `${(pointer.smoothX * 13).toFixed(2)}px`)
      stage.style.setProperty('--title-y', `${(-pointer.smoothY * 8).toFixed(2)}px`)
      stage.style.setProperty('--title-rx', `${(-pointer.smoothY * 1.2).toFixed(3)}deg`)
      stage.style.setProperty('--title-ry', `${(pointer.smoothX * 1.6).toFixed(3)}deg`)
      stage.style.setProperty('--hero-progress', rawProgress.toFixed(4))
      stage.style.setProperty(
        '--hero-copy-opacity',
        THREE.MathUtils.clamp(1 - rawProgress * 1.8, 0, 1).toFixed(4),
      )
      stage.style.setProperty(
        '--hero-copy-shift',
        `${(-rawProgress * 70).toFixed(2)}px`,
      )
      stage.style.setProperty(
        '--near-opacity',
        THREE.MathUtils.clamp(0.78 - rawProgress * 1.45, 0, 0.78).toFixed(4),
      )

      if (screen && portalProgress < 0.84) {
        screen.updateWorldMatrix(true, false)
        const projected = [
          new THREE.Vector3(-0.94, 1.035, 0.94),
          new THREE.Vector3(-0.94, 1.035, -0.94),
          new THREE.Vector3(0.94, 1.035, -0.94),
          new THREE.Vector3(0.94, 1.035, 0.94),
        ].map((point) => screen.localToWorld(point).project(camera))
        const xs = projected.map((point) => (point.x * 0.5 + 0.5) * mount.clientWidth)
        const ys = projected.map((point) => (-point.y * 0.5 + 0.5) * mount.clientHeight)
        portalBounds.left = Math.min(...xs)
        portalBounds.right = Math.max(...xs)
        portalBounds.top = Math.min(...ys)
        portalBounds.bottom = Math.max(...ys)
      }
      // Mirror the Work → About television zoom. Because every visual value is
      // derived from one progress value, upward scrolling is the exact reverse.
      stage.style.setProperty('--portal-progress', portalProgress.toFixed(4))
      // The model screen owns the first half of the hand-off. The fixed Work
      // viewport only starts expanding after the monitor is almost fullscreen.
      const screenCoverageMargin = Math.min(
        -portalBounds.left,
        -portalBounds.top,
        portalBounds.right - mount.clientWidth,
        portalBounds.bottom - mount.clientHeight,
      )
      const coverageBlend = THREE.MathUtils.smoothstep(screenCoverageMargin, -32, 32)
      const backgroundTimeline = THREE.MathUtils.smoothstep(portalProgress, 0.62, 0.74)
      const portalBackgroundOpacity =
        portalProgress >= 0.74 ? 1 : backgroundTimeline * coverageBlend
      const portalOpacity = THREE.MathUtils.smoothstep(portalProgress, 0.72, 0.8)
      const reelReveal = THREE.MathUtils.smoothstep(portalProgress, 0.74, 0.96)
      const reelScale = THREE.MathUtils.lerp(0.65, 1, reelReveal)
      const reelBlur = 6 * (1 - reelReveal)
      const workUiOpacity = THREE.MathUtils.smoothstep(portalProgress, 0.84, 1)
      const screenBlend = THREE.MathUtils.smoothstep(portalProgress, 0.48, 0.62)
      const screenBlendPhase = THREE.MathUtils.clamp(
        (portalProgress - 0.48) / 0.14,
        0,
        1,
      )
      const screenDip = 1 - Math.sin(screenBlendPhase * Math.PI) * 0.18
      stage.style.setProperty('--screen-work-blend', screenBlend.toFixed(4))
      stage.style.setProperty('--screen-coverage-margin', screenCoverageMargin.toFixed(2))
      stage.style.setProperty('--portal-opacity', portalOpacity.toFixed(4))
      stage.style.setProperty(
        '--portal-content-opacity',
        portalOpacity.toFixed(4),
      )

      if (workSection) {
        workSection.style.setProperty('--work-portal-opacity', '1')
        workSection.style.setProperty(
          '--work-portal-content-opacity',
          portalOpacity.toFixed(4),
        )
        workSection.style.setProperty(
          '--work-portal-background-opacity',
          portalBackgroundOpacity.toFixed(4),
        )
        workSection.style.setProperty('--work-reel-opacity', reelReveal.toFixed(4))
        workSection.style.setProperty('--work-reel-scale', reelScale.toFixed(4))
        workSection.style.setProperty('--work-reel-blur', `${reelBlur.toFixed(2)}px`)
        workSection.style.setProperty('--work-ui-opacity', workUiOpacity.toFixed(4))
      }

      if (screen && rawProgress < 0.84) {
        raycaster.setFromCamera(pointerNdc, camera)
        screenHovered = raycaster.intersectObject(screen, true).length > 0
        stage.classList.toggle('screen-hover', screenHovered)
        if (!screenHovered) dragOrigin = null
      } else {
        screenHovered = false
        stage.classList.remove('screen-hover')
      }

      if (screenMaterial) {
        let pulse = screenHovered ? 1 : 0

        // Once the portal animation begins, the screen carousel yields to the
        // deterministic dual-material crossfade so no offset can leak in.
        if (portalProgress > 0.03 && slide) {
          slide = null
          screenTextures.forEach((texture) => {
            texture.offset.x = 0
          })
        }

        if (slide && screenBlend <= 0.001) {
          const phase = THREE.MathUtils.clamp((performance.now() - slide.start) / 540, 0, 1)
          pulse = Math.sin(phase * Math.PI)
          if (phase < 0.48) {
            screenMaterial.map.offset.x = -slide.direction * phase * 1.6
            screenMaterial.emissiveMap.offset.x = screenMaterial.map.offset.x
          } else {
            if (!slide.swapped) {
              screenIndex = slide.next
              screenMaterial.map = screenTextures[screenIndex]
              screenMaterial.emissiveMap = screenTextures[screenIndex]
              screenMaterial.map.offset.x = slide.direction * 0.82
              slide.swapped = true
            }
            const enter = (phase - 0.48) / 0.52
            screenMaterial.map.offset.x = slide.direction * 0.82 * (1 - enter)
            screenMaterial.emissiveMap.offset.x = screenMaterial.map.offset.x
          }
          if (phase >= 1) {
            screenMaterial.map.offset.x = 0
            screenMaterial.emissiveMap.offset.x = 0
            slide = null
          }
        }
        screenMaterial.opacity = 1 - screenBlend
        screenMaterial.color.setScalar(screenDip)
        screenMaterial.emissiveIntensity =
          (0.72 + pulse * 2.2) * (1 - screenBlend)
        if (workScreenMaterial) {
          workScreenMaterial.opacity = screenBlend
          workScreenMaterial.color.setScalar(screenDip)
        }
        screenLight.intensity =
          (1.5 + pulse * 12) * (1 - screenBlend * 0.35)
        renderer.toneMappingExposure = 1.08 + pulse * 0.12 * (1 - screenBlend)
      }

      renderer.render(scene, camera)
      frame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      stopAutoScroll(false)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      if (apiRef.current) apiRef.current = null
      stage.classList.remove('hero-transition-active')
      renderer.dispose()
      screenTextures.forEach((texture) => texture.dispose())
      workScreenTexture.userData.disposeWorkTexture?.()
      workScreenTexture.dispose()
      scene.traverse((object) => {
        if (!object.isMesh) return
        object.geometry?.dispose?.()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose?.()
      })
      mount.removeChild(renderer.domElement)
    }
  }, [apiRef, onTransitionPhase, workViewportRef])

  return <div className="hero-three-scene" ref={mountRef} aria-hidden="true" />
}
