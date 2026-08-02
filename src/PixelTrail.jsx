import { useEffect, useRef } from 'react'
import './PixelTrail.css'

export default function PixelTrail({
  color = '#42ff88',
  pixelSize = 6,
  radius = 12,
  maxAge = 260,
  spacing = 4,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: true })
    const points = []
    let frame = 0
    let previous = null
    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = 1

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.imageSmoothingEnabled = false
    }

    const addPoint = (x, y, time) => {
      points.push({ x, y, born: time })
      if (points.length > 160) points.splice(0, points.length - 160)
    }

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return
      const next = { x: event.clientX, y: event.clientY }
      const now = performance.now()

      if (!previous) {
        addPoint(next.x, next.y, now)
      } else {
        const dx = next.x - previous.x
        const dy = next.y - previous.y
        const distance = Math.hypot(dx, dy)
        const steps = Math.max(1, Math.ceil(distance / spacing))
        for (let step = 1; step <= steps; step += 1) {
          const progress = step / steps
          addPoint(previous.x + dx * progress, previous.y + dy * progress, now)
        }
      }
      previous = next
    }

    const onPointerLeave = () => {
      previous = null
    }

    const render = (now) => {
      context.clearRect(0, 0, width, height)

      while (points.length && now - points[0].born > maxAge) points.shift()

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index]
        const life = Math.max(0, 1 - (now - point.born) / maxAge)
        const size = Math.max(1.2, pixelSize * (0.55 + life * 0.45))
        const snappedX = Math.round(point.x / pixelSize) * pixelSize
        const snappedY = Math.round(point.y / pixelSize) * pixelSize

        context.globalAlpha = life * life * 0.72
        context.fillStyle = color
        context.fillRect(snappedX - size / 2, snappedY - size / 2, size, size)

        if (life > 0.64) {
          context.globalAlpha = (life - 0.64) * 0.52
          context.fillRect(snappedX + radius * 0.42, snappedY - pixelSize / 2, pixelSize, pixelSize)
          context.fillRect(snappedX - radius * 0.42, snappedY - pixelSize / 2, pixelSize, pixelSize)
          context.fillRect(snappedX - pixelSize / 2, snappedY + radius * 0.42, pixelSize, pixelSize)
          context.fillRect(snappedX - pixelSize / 2, snappedY - radius * 0.42, pixelSize, pixelSize)
        }
      }

      context.globalAlpha = 1
      frame = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [color, maxAge, pixelSize, radius, spacing])

  return (
    <div className="global-pixel-trail" aria-hidden="true">
      <canvas ref={canvasRef} className="pixel-canvas" />
    </div>
  )
}
