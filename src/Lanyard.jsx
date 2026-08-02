/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import './Lanyard.css'

const ROPE_REST_LENGTH = 2.34
const ROPE_MAX_LENGTH = 3.28
const ROPE_STIFFNESS = 29
const ROPE_DAMPING = 3.8
const SEGMENT_COUNT = 16
const CARD_SCALE = 0.8
const CARD_CENTER_OFFSET = 2.02 * CARD_SCALE
const CARD_HALF_WIDTH = 1.325 * CARD_SCALE
const CARD_HALF_HEIGHT = 1.875 * CARD_SCALE
const GRAVITY = 11.5

function createCardTexture(qrImage = null) {
  const canvas = document.createElement('canvas')
  canvas.width = 720
  canvas.height = 1024
  const context = canvas.getContext('2d')

  context.fillStyle = '#e8f2dc'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = '#153d2a'
  context.lineWidth = 4
  context.strokeRect(34, 34, canvas.width - 68, canvas.height - 68)

  context.fillStyle = '#0a2418'
  context.font = '700 48px Arial'
  context.fillText('QIAN / SEAZEON', 70, 110)
  context.font = '24px Arial'
  context.fillText('LET’S CREATE TOGETHER', 70, 154)

  context.fillStyle = '#ffffff'
  context.fillRect(118, 238, 484, 484)
  context.strokeStyle = '#163b29'
  context.lineWidth = 5
  context.strokeRect(118, 238, 484, 484)

  if (qrImage) {
    context.drawImage(qrImage, 118, 238, 484, 484)
  } else {
    context.fillStyle = '#163b29'
    context.font = '700 34px Arial'
    context.textAlign = 'center'
    context.fillText('QR CODE', 360, 448)
    context.font = '24px Arial'
    context.fillText('等待替换二维码图片', 360, 495)
  }

  context.textAlign = 'left'
  context.fillStyle = '#163b29'
  context.font = '24px Arial'
  context.fillText('WECHAT  /  qing19050828', 70, 825)
  context.fillText('EMAIL  /  2674854240@qq.com', 70, 870)
  context.font = '18px Arial'
  context.fillText('DRAG THE CARD · RELEASE TO SWING', 70, 936)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function RopeSegment({ segmentRef }) {
  return (
    <mesh ref={segmentRef}>
      <cylinderGeometry args={[0.042, 0.042, 1, 8]} />
      <meshStandardMaterial color="#b5ef83" roughness={0.48} metalness={0.08} />
    </mesh>
  )
}

function InteractiveCard({ frontImage, anchorPoint }) {
  const attachmentGroupRef = useRef(null)
  const cardBodyRef = useRef(null)
  const ropeRefs = useRef([])
  const anchor = useRef(new THREE.Vector3(4.8, 3.6, 0))
  const attachment = useRef(new THREE.Vector3(4.8, 3.5, 0))
  const velocity = useRef(new THREE.Vector3(0, 0, 0))
  const dragVelocity = useRef(new THREE.Vector3(0, 0, 0))
  const dragTarget = useRef(new THREE.Vector3())
  const dragOffset = useRef(new THREE.Vector3())
  const lastDragTarget = useRef(new THREE.Vector3())
  const dragging = useRef(false)
  const cardAngle = useRef(0)
  const angularVelocity = useRef(0)
  const { camera, gl, size, viewport } = useThree()
  const [hovered, setHovered] = useState(false)
  const placeholderTexture = useMemo(() => createCardTexture(), [])
  const [cardTexture, setCardTexture] = useState(placeholderTexture)

  const screenToWorld = (clientX, clientY, output) => {
    const point = new THREE.Vector3(
      (clientX / size.width) * 2 - 1,
      -(clientY / size.height) * 2 + 1,
      0.5,
    ).unproject(camera)
    const direction = point.sub(camera.position).normalize()
    const distance = -camera.position.z / direction.z
    return output.copy(camera.position).add(direction.multiplyScalar(distance))
  }

  const pointerToWorld = (pointer, output) => {
    const point = new THREE.Vector3(pointer.x, pointer.y, 0.5).unproject(camera)
    const direction = point.sub(camera.position).normalize()
    const distance = -camera.position.z / direction.z
    return output.copy(camera.position).add(direction.multiplyScalar(distance))
  }

  const clampToRope = (position) => {
    const fromAnchor = position.clone().sub(anchor.current)
    if (fromAnchor.lengthSq() > ROPE_MAX_LENGTH * ROPE_MAX_LENGTH) {
      position.copy(anchor.current).add(fromAnchor.setLength(ROPE_MAX_LENGTH))
    }
    return position
  }

  useEffect(() => {
    if (!anchorPoint) return
    screenToWorld(anchorPoint.x, anchorPoint.y, anchor.current)
    attachment.current.copy(anchor.current).add(new THREE.Vector3(-0.58, -0.16, 0))
    dragTarget.current.copy(attachment.current)
    lastDragTarget.current.copy(attachment.current)
    velocity.current.set(-2.15, -0.28, 0)
  }, [anchorPoint, camera, size.width, size.height])

  useEffect(() => {
    if (!frontImage) return undefined
    let cancelled = false
    const loader = new THREE.TextureLoader()
    loader.load(
      frontImage,
      (texture) => {
        if (cancelled) {
          texture.dispose()
          return
        }
        const composite = createCardTexture(texture.image)
        texture.dispose()
        setCardTexture((current) => {
          if (current !== placeholderTexture) current.dispose()
          return composite
        })
      },
      undefined,
      () => setCardTexture(placeholderTexture),
    )
    return () => {
      cancelled = true
    }
  }, [frontImage, placeholderTexture])

  useEffect(() => {
    gl.domElement.style.cursor = hovered ? (dragging.current ? 'grabbing' : 'grab') : 'default'
    return () => {
      gl.domElement.style.cursor = 'default'
    }
  }, [gl, hovered])

  useEffect(
    () => () => {
      placeholderTexture.dispose()
      if (cardTexture !== placeholderTexture) cardTexture.dispose()
    },
    [cardTexture, placeholderTexture],
  )

  useFrame((_, deltaValue) => {
    const delta = Math.min(deltaValue, 1 / 30)
    const position = attachment.current

    if (dragging.current) {
      clampToRope(dragTarget.current)
      const previous = position.clone()
      position.lerp(dragTarget.current, 1 - Math.exp(-30 * delta))
      const measuredVelocity = position.clone().sub(previous).divideScalar(Math.max(delta, 0.001))
      dragVelocity.current.lerp(measuredVelocity, 1 - Math.exp(-18 * delta))
      lastDragTarget.current.copy(dragTarget.current)
    } else {
      velocity.current.y -= GRAVITY * delta
      velocity.current.multiplyScalar(Math.exp(-0.2 * delta))
      position.addScaledVector(velocity.current, delta)

      const ropeDirection = position.clone().sub(anchor.current)
      const distance = ropeDirection.length()
      if (distance > ROPE_REST_LENGTH) {
        const normal = ropeDirection.divideScalar(distance)
        const stretch = distance - ROPE_REST_LENGTH
        const radialSpeed = velocity.current.dot(normal)
        const springAcceleration =
          stretch * ROPE_STIFFNESS + Math.max(0, radialSpeed) * ROPE_DAMPING
        velocity.current.addScaledVector(normal, -springAcceleration * delta)
      }

      if (distance > ROPE_MAX_LENGTH) {
        const normal = ropeDirection.normalize()
        position.copy(anchor.current).addScaledVector(normal, ROPE_MAX_LENGTH)
        const outwardSpeed = velocity.current.dot(normal)
        if (outwardSpeed > 0) velocity.current.addScaledVector(normal, -outwardSpeed * 1.35)
      }
    }

    const horizontalLimit = viewport.width * 0.5 - CARD_HALF_WIDTH - 0.14
    if (position.x > horizontalLimit) {
      position.x = horizontalLimit
      if (velocity.current.x > 0) velocity.current.x *= -0.42
    } else if (position.x < -horizontalLimit) {
      position.x = -horizontalLimit
      if (velocity.current.x < 0) velocity.current.x *= -0.42
    }

    const topLimit = viewport.height * 0.5 - 0.2
    const bottomLimit = -viewport.height * 0.5 + CARD_CENTER_OFFSET + CARD_HALF_HEIGHT + 0.12
    if (position.y > topLimit) {
      position.y = topLimit
      if (velocity.current.y > 0) velocity.current.y *= -0.34
    } else if (position.y < bottomLimit) {
      position.y = bottomLimit
      if (velocity.current.y < 0) velocity.current.y *= -0.34
    }

    const attachmentGroup = attachmentGroupRef.current
    if (attachmentGroup) attachmentGroup.position.copy(position)

    const ropeVector = position.clone().sub(anchor.current)
    const desiredAngle = THREE.MathUtils.clamp(
      -velocity.current.x * 0.065 - ropeVector.x * 0.035,
      -0.48,
      0.48,
    )
    angularVelocity.current += (desiredAngle - cardAngle.current) * 17 * delta
    angularVelocity.current *= Math.exp(-3.1 * delta)
    cardAngle.current += angularVelocity.current * delta

    const cardBody = cardBodyRef.current
    if (cardBody) {
      cardBody.rotation.z = cardAngle.current
      cardBody.rotation.y += ((hovered ? 0.06 : 0) - cardBody.rotation.y) * 0.05
    }

    const slack = Math.max(0, ROPE_REST_LENGTH - ropeVector.length())
    const midpoint = anchor.current.clone().lerp(position, 0.5)
    midpoint.y -= Math.min(0.5, slack * 0.45)
    const curve = new THREE.QuadraticBezierCurve3(anchor.current, midpoint, position)

    ropeRefs.current.forEach((segment, index) => {
      if (!segment) return
      const start = curve.getPoint(index / SEGMENT_COUNT)
      const end = curve.getPoint((index + 1) / SEGMENT_COUNT)
      segment.position.copy(start).add(end).multiplyScalar(0.5)
      segment.scale.set(1, start.distanceTo(end), 1)
      segment.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        end.clone().sub(start).normalize(),
      )
    })
  })

  const beginDrag = (event) => {
    event.stopPropagation()
    dragging.current = true
    event.target.setPointerCapture(event.pointerId)
    pointerToWorld(event.pointer, dragTarget.current)
    const center = attachment.current.clone().add(new THREE.Vector3(0, -CARD_CENTER_OFFSET, 0))
    dragOffset.current.copy(dragTarget.current).sub(center)
    dragTarget.current.copy(attachment.current)
    lastDragTarget.current.copy(attachment.current)
    dragVelocity.current.set(0, 0, 0)
    gl.domElement.style.cursor = 'grabbing'
  }

  const continueDrag = (event) => {
    if (!dragging.current) return
    event.stopPropagation()
    const pointerWorld = pointerToWorld(event.pointer, new THREE.Vector3())
    const desiredCenter = pointerWorld.sub(dragOffset.current)
    dragTarget.current.copy(desiredCenter).add(new THREE.Vector3(0, CARD_CENTER_OFFSET, 0))
    clampToRope(dragTarget.current)
  }

  const endDrag = (event) => {
    if (!dragging.current) return
    event.stopPropagation()
    dragging.current = false
    event.target.releasePointerCapture?.(event.pointerId)
    velocity.current.copy(dragVelocity.current)
    const maxSpeed = 8.5
    if (velocity.current.length() > maxSpeed) velocity.current.setLength(maxSpeed)
    angularVelocity.current += THREE.MathUtils.clamp(-velocity.current.x * 0.09, -0.8, 0.8)
    gl.domElement.style.cursor = 'grab'
  }

  return (
    <>
      <mesh position={anchor.current}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#e1ffc6" emissive="#79c957" emissiveIntensity={0.75} />
      </mesh>

      {Array.from({ length: SEGMENT_COUNT }, (_, index) => (
        <RopeSegment
          key={index}
          segmentRef={(node) => {
            ropeRefs.current[index] = node
          }}
        />
      ))}

      <group ref={attachmentGroupRef}>
        <mesh position={[0, -0.02, 0]}>
          <torusGeometry args={[0.135, 0.05, 12, 32]} />
          <meshStandardMaterial color="#a7b4a1" metalness={0.85} roughness={0.2} />
        </mesh>

        <group
          ref={cardBodyRef}
          position={[0, -CARD_CENTER_OFFSET, 0]}
          scale={CARD_SCALE}
          onPointerOver={(event) => {
            event.stopPropagation()
            setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
          onPointerDown={beginDrag}
          onPointerMove={continueDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <mesh>
            <boxGeometry args={[2.65, 3.75, 0.16]} />
            <meshPhysicalMaterial
              color="#dceccb"
              roughness={0.34}
              metalness={0.1}
              clearcoat={0.75}
              clearcoatRoughness={0.24}
            />
          </mesh>
          <mesh position={[0, 0, 0.086]}>
            <planeGeometry args={[2.5, 3.58]} />
            <meshBasicMaterial map={cardTexture} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </>
  )
}

export default function Lanyard({ frontImage = null, anchorPoint, onClose }) {
  return (
    <div className="lanyard-wrapper">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 12], fov: 38, near: 0.1, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onPointerMissed={onClose}
      >
        <ambientLight intensity={1.65} />
        <directionalLight position={[-4, 7, 8]} intensity={3} color="#efffdc" />
        <pointLight position={[4, 1, 5]} intensity={17} color="#90e262" distance={18} />
        <InteractiveCard frontImage={frontImage} anchorPoint={anchorPoint} />
      </Canvas>
    </div>
  )
}
