/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import './FilmReel3D.css'

const WIDTH_SEGMENTS = 128
const VISIBLE_PANELS = 3.15

const vertexShader = `
  uniform float uTime;

  attribute float aLong;

  varying vec2 vUv;
  varying float vAlong;
  varying float vLight;

  void main() {
    float arc = 2.08;
    float radius = 8.7;
    float angle = (aLong - 0.5) * arc;

    vec3 transformed = position;
    transformed.x = sin(angle) * radius * 1.18;
    transformed.z = (cos(angle) - 1.0) * radius;
    transformed.y += sin(aLong * 7.0 + uTime * 0.42) * 0.045;
    transformed.y += sin(aLong * 15.0 - uTime * 0.24) * 0.018;

    vUv = uv;
    vAlong = aLong;
    vLight = 0.62 + cos(angle) * 0.42;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture0;
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform sampler2D uTexture3;
  uniform sampler2D uTexture4;
  uniform sampler2D uTexture5;
  uniform float uCrop0;
  uniform float uCrop1;
  uniform float uCrop2;
  uniform float uCrop3;
  uniform float uCrop4;
  uniform float uCrop5;
  uniform float uItemCount;
  uniform float uSlide;
  uniform float uHover;

  varying vec2 vUv;
  varying float vAlong;
  varying float vLight;

  float wrapIndex(float value) {
    return mod(mod(value, uItemCount) + uItemCount, uItemCount);
  }

  vec4 getTexture(float index, vec2 uv) {
    if (index < 0.5) return texture2D(uTexture0, vec2(uv.x, 0.5 + (uv.y - 0.5) * uCrop0));
    if (index < 1.5) return texture2D(uTexture1, vec2(uv.x, 0.5 + (uv.y - 0.5) * uCrop1));
    if (index < 2.5) return texture2D(uTexture2, vec2(uv.x, 0.5 + (uv.y - 0.5) * uCrop2));
    if (index < 3.5) return texture2D(uTexture3, vec2(uv.x, 0.5 + (uv.y - 0.5) * uCrop3));
    if (index < 4.5) return texture2D(uTexture4, vec2(uv.x, 0.5 + (uv.y - 0.5) * uCrop4));
    return texture2D(uTexture5, vec2(uv.x, 0.5 + (uv.y - 0.5) * uCrop5));
  }

  void main() {
    float panelPosition = (vAlong - 0.5) * ${VISIBLE_PANELS.toFixed(2)} + uSlide;
    float panelIndex = floor(panelPosition + 0.5);
    float localX = fract(panelPosition + 0.5);
    float wrappedIndex = wrapIndex(panelIndex);

    float rail = step(vUv.y, 0.105) + step(0.895, vUv.y);
    float movingAlong = vAlong + uSlide / ${VISIBLE_PANELS.toFixed(2)};
    float holeCell = fract(movingAlong * 38.0);
    float holeX = step(0.16, holeCell) * step(holeCell, 0.72);
    float railUv = vUv.y < 0.5 ? vUv.y / 0.105 : (1.0 - vUv.y) / 0.105;
    float holeY = step(0.2, railUv) * step(railUv, 0.8);
    if (rail > 0.5 && holeX * holeY > 0.5) discard;

    vec2 imageUv = vec2(localX, clamp((vUv.y - 0.105) / 0.79, 0.0, 1.0));
    float dispersion = 0.0045 + uHover * 0.0025;
    vec4 imageCenter = getTexture(wrappedIndex, imageUv);
    vec4 imageLeft = getTexture(wrappedIndex, vec2(clamp(imageUv.x - dispersion, 0.0, 1.0), imageUv.y));
    vec4 imageRight = getTexture(wrappedIndex, vec2(clamp(imageUv.x + dispersion, 0.0, 1.0), imageUv.y));
    vec4 image = vec4(imageLeft.r, imageCenter.g, imageRight.b, imageCenter.a);

    float panelEdge = min(localX, 1.0 - localX);
    float divider = 1.0 - smoothstep(0.026, 0.029, panelEdge);
    vec3 railColor = vec3(0.006, 0.009, 0.012);
    vec3 color = mix(image.rgb, railColor, clamp(rail, 0.0, 1.0));
    color = mix(color, railColor, divider);
    color *= vLight;
    color *= 1.0 + uHover * 0.07;

    float innerRailEdge =
      (1.0 - smoothstep(0.0, 0.014, abs(vUv.y - 0.105))) +
      (1.0 - smoothstep(0.0, 0.014, abs(vUv.y - 0.895)));
    float spectralPulse = 0.5 + 0.5 * sin(movingAlong * 82.0);
    color += innerRailEdge * mix(
      vec3(0.045, 0.008, 0.055),
      vec3(0.004, 0.048, 0.052),
      spectralPulse
    ) * (0.55 + uHover * 0.45);

    float endShade = smoothstep(0.0, 0.12, vAlong) * smoothstep(0.0, 0.12, 1.0 - vAlong);
    color *= mix(0.48, 1.0, endShade);
    color += vec3(0.012, 0.025, 0.01);

    gl_FragColor = vec4(color, 1.0);
  }
`

function createFilmGeometry() {
  const height = 5.15
  const positions = []
  const uvs = []
  const longitudinal = []

  const pushVertex = (along, vertical) => {
    positions.push(0, (vertical - 0.5) * height, 0)
    uvs.push(along, vertical)
    longitudinal.push(along)
  }

  for (let segment = 0; segment < WIDTH_SEGMENTS; segment += 1) {
    const t0 = segment / WIDTH_SEGMENTS
    const t1 = (segment + 1) / WIDTH_SEGMENTS

    pushVertex(t0, 0)
    pushVertex(t1, 0)
    pushVertex(t1, 1)

    pushVertex(t0, 0)
    pushVertex(t1, 1)
    pushVertex(t0, 1)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setAttribute('aLong', new THREE.Float32BufferAttribute(longitudinal, 1))
  geometry.computeBoundingSphere()
  return geometry
}

function FilmMesh({ imageUrls, slideTarget, dragging, hovered, pointerPosition }) {
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const textures = useLoader(THREE.TextureLoader, imageUrls)
  const geometry = useMemo(() => createFilmGeometry(), [])
  const slideValue = useRef(slideTarget.current)
  const slideVelocity = useRef(0)

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.needsUpdate = true
    })
  }, [textures])

  const uniforms = useMemo(() => {
    const panelAspect = 1.18
    const crop = (texture) => {
      const image = texture.image
      if (!image?.width || !image?.height) return 0.6
      return Math.min((image.width / image.height) / panelAspect, 1)
    }
    return {
      uTime: { value: 0 },
      uTexture0: { value: textures[0] },
      uTexture1: { value: textures[1] },
      uTexture2: { value: textures[2] },
      uTexture3: { value: textures[3] },
      uTexture4: { value: textures[4] },
      uTexture5: { value: textures[5] },
      uCrop0: { value: crop(textures[0]) },
      uCrop1: { value: crop(textures[1]) },
      uCrop2: { value: crop(textures[2]) },
      uCrop3: { value: crop(textures[3]) },
      uCrop4: { value: crop(textures[4]) },
      uCrop5: { value: crop(textures[5]) },
      uItemCount: { value: imageUrls.length },
      uSlide: { value: slideValue.current },
      uHover: { value: 0 },
    }
  }, [imageUrls.length, textures])

  useFrame(({ clock }, frameDelta) => {
    const delta = Math.min(frameDelta, 1 / 30)
    const stiffness = dragging.current ? 58 : 38
    const damping = Math.exp(-(dragging.current ? 13 : 8.2) * delta)
    slideVelocity.current += (slideTarget.current - slideValue.current) * stiffness * delta
    slideVelocity.current *= damping
    slideValue.current += slideVelocity.current * delta

    const mesh = meshRef.current
    if (mesh) {
      const motionScale = hovered.current ? 1 : 0.35
      const targetRotationX = 0.018 - pointerPosition.current.y * 0.055 * motionScale
      const targetRotationY = pointerPosition.current.x * 0.075 * motionScale
      const targetRotationZ = -0.026 + pointerPosition.current.x * 0.018 * motionScale
      mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.065
      mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.065
      mesh.rotation.z += (targetRotationZ - mesh.rotation.z) * 0.065
      mesh.position.x += (pointerPosition.current.x * 0.16 * motionScale - mesh.position.x) * 0.055
      mesh.position.y += (-0.08 + pointerPosition.current.y * 0.1 * motionScale - mesh.position.y) * 0.055
    }

    const material = materialRef.current
    if (!material) return
    material.uniforms.uTime.value = clock.getElapsedTime()
    material.uniforms.uSlide.value = slideValue.current
    material.uniforms.uHover.value +=
      ((hovered.current ? 1 : 0) - material.uniforms.uHover.value) * 0.1
  })

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[0.018, 0, -0.026]}
      position={[0, -0.08, 0]}
    >
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        transparent
        depthWrite
      />
    </mesh>
  )
}

export default function FilmReel3D({
  activeIndex,
  imageUrls,
  onIndexChange,
  onOpen,
}) {
  const slideTarget = useRef(activeIndex)
  const dragging = useRef(false)
  const hovered = useRef(false)
  const pointer = useRef({
    id: null,
    startX: 0,
    startSlide: 0,
    moved: false,
  })
  const pointerPosition = useRef({ x: 0, y: 0 })
  const rootRef = useRef(null)

  useEffect(() => {
    if (dragging.current) return
    const itemCount = imageUrls.length
    const nearestCycle = Math.round((slideTarget.current - activeIndex) / itemCount)
    slideTarget.current = activeIndex + nearestCycle * itemCount
  }, [activeIndex, imageUrls.length])

  const handlePointerDown = (event) => {
    dragging.current = true
    pointer.current = {
      id: event.pointerId,
      startX: event.clientX,
      startSlide: slideTarget.current,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.classList.add('is-dragging')
  }

  const handlePointerMove = (event) => {
    const rect = rootRef.current?.getBoundingClientRect()
    if (rect) {
      pointerPosition.current.x = THREE.MathUtils.clamp(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -1,
        1,
      )
      pointerPosition.current.y = THREE.MathUtils.clamp(
        -(((event.clientY - rect.top) / rect.height) * 2 - 1),
        -1,
        1,
      )
    }
    if (!dragging.current || pointer.current.id !== event.pointerId) return
    const width = Math.max(rootRef.current?.clientWidth || 1, 1)
    const delta = event.clientX - pointer.current.startX
    pointer.current.moved ||= Math.abs(delta) > 7
    slideTarget.current = pointer.current.startSlide - (delta / width) * VISIBLE_PANELS
  }

  const finishDrag = (event) => {
    if (!dragging.current || pointer.current.id !== event.pointerId) return
    dragging.current = false
    event.currentTarget.releasePointerCapture?.(event.pointerId)
    event.currentTarget.classList.remove('is-dragging')

    if (!pointer.current.moved) {
      onOpen(activeIndex)
      return
    }

    const turnIndex = Math.round(slideTarget.current)
    const itemCount = imageUrls.length
    const nextIndex = ((turnIndex % itemCount) + itemCount) % itemCount
    slideTarget.current = turnIndex
    onIndexChange(nextIndex)
  }

  return (
    <div
      className="film-reel-webgl"
      ref={rootRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onPointerEnter={() => {
        hovered.current = true
      }}
      onPointerLeave={() => {
        hovered.current = false
        pointerPosition.current.x = 0
        pointerPosition.current.y = 0
      }}
    >
      <Canvas
        dpr={[1, 1.6]}
        resize={{ offsetSize: true }}
        camera={{ fov: 38, near: 0.1, far: 80, position: [0, 0.05, 8.2] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <FilmMesh
          imageUrls={imageUrls}
          slideTarget={slideTarget}
          dragging={dragging}
          hovered={hovered}
          pointerPosition={pointerPosition}
        />
      </Canvas>
    </div>
  )
}
