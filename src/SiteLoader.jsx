import { useEffect, useRef, useState } from 'react'
import './SiteLoader.css'

const criticalAssets = [
  '/Backgd.png',
  '/hero/background.png',
  '/hero/midground.png',
  '/hero/foreground.png',
  '/hero/hero-scene.glb',
  '/about/photo-01.jpg',
  '/about/photo-05.jpg',
]

const waitForWindowLoad = () =>
  document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))

const preloadAsset = (url) => {
  if (url.endsWith('.glb')) {
    return fetch(url, { cache: 'force-cache' }).then((response) => {
      if (!response.ok) throw new Error(`Unable to preload ${url}`)
      return response.blob()
    })
  }

  return new Promise((resolve) => {
    const image = new Image()
    image.onload = resolve
    image.onerror = resolve
    image.src = url
  })
}

const waitForMountedImages = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const pending = [...document.images]
          .filter((image) => !image.complete)
          .map(
            (image) =>
              new Promise((finish) => {
                image.addEventListener('load', finish, { once: true })
                image.addEventListener('error', finish, { once: true })
              }),
          )
        Promise.allSettled(pending).then(resolve)
      })
    })
  })

export default function SiteLoader() {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [hidden, setHidden] = useState(false)
  const resourcesReady = useRef(false)

  useEffect(() => {
    document.body.classList.add('site-is-loading')
    let frame = 0
    let leaveTimer = 0
    let hideTimer = 0
    const startedAt = performance.now()

    Promise.allSettled([
      waitForWindowLoad(),
      document.fonts?.ready ?? Promise.resolve(),
      waitForMountedImages(),
      ...criticalAssets.map(preloadAsset),
    ]).then(() => {
      resourcesReady.current = true
    })

    const tick = (now) => {
      const elapsed = now - startedAt
      let nextProgress

      if (elapsed <= 620) {
        const quickPhase = elapsed / 620
        nextProgress = 40 * (1 - (1 - quickPhase) ** 3)
      } else {
        nextProgress = Math.min(99, 40 + ((elapsed - 620) / 2800) * 59)
      }

      if (nextProgress >= 99 && resourcesReady.current) {
        setProgress(100)
        leaveTimer = window.setTimeout(() => setLeaving(true), 320)
        hideTimer = window.setTimeout(() => {
          setHidden(true)
          document.body.classList.remove('site-is-loading')
        }, 1120)
        return
      }

      setProgress(nextProgress)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
      document.body.classList.remove('site-is-loading')
    }
  }, [])

  if (hidden) return null

  const percentage = Math.min(100, Math.floor(progress))

  return (
    <div className={`site-loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="site-loader-noise" aria-hidden="true" />
      <div className="site-loader-header">
        <span>QIAN / PORTFOLIO 2026</span>
        <span>LOADING ARCHIVE</span>
      </div>
      <div className="site-loader-main">
        <p>INITIALIZING VISUAL SYSTEM</p>
        <div className="site-loader-title">
          <span>PLEASE</span>
          <strong>WAIT.</strong>
        </div>
        <div className="site-loader-progress-row">
          <div className="site-loader-track" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
          <output>{String(percentage).padStart(2, '0')}%</output>
        </div>
        <div className="site-loader-meta">
          <span>ASSETS / INTERACTION / MOTION</span>
          <span>{percentage < 100 ? 'PLEASE KEEP THIS WINDOW OPEN' : 'READY TO ENTER'}</span>
        </div>
      </div>
    </div>
  )
}
