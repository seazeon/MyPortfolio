import { useRef } from 'react'
import gsap from 'gsap'
import './BounceCards.css'

function BounceCards({
  images,
  labels = [],
  className = '',
  containerWidth = 1500,
  containerHeight = 430,
  animationDelay = 0.55,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [],
}) {
  const cardRefs = useRef([])

  const getTransform = (index) =>
    transformStyles[index] ||
    `rotate(${index % 2 === 0 ? -4 : 4}deg) translateX(${(index - 3) * 205}px)`

  const pushSiblings = (hoveredIndex) => {
    images.forEach((_, index) => {
      let push = 0
      if (index < hoveredIndex) push = -100
      if (index > hoveredIndex) push = 100
      gsap.to(cardRefs.current[index], {
        x: push,
        scale: index === hoveredIndex ? 1.045 : 1,
        duration: 0.42,
        ease: 'power3.out',
        overwrite: true,
      })
    })
  }

  const resetCards = () => {
    images.forEach((_, index) => {
      gsap.to(cardRefs.current[index], {
        x: 0,
        scale: 1,
        duration: 0.52,
        ease: 'power3.out',
        overwrite: true,
      })
    })
  }

  return (
    <div
      className={`bounce-cards-container ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {images.map((src, index) => (
        <div
          className="bounce-card-slot"
          key={`${src}-${index}`}
          style={{
            animationDelay: `${animationDelay + index * animationStagger}s`,
            animationTimingFunction: easeType,
            transform: getTransform(index),
          }}
        >
          <figure
            className="bounce-card"
            onMouseEnter={() => pushSiblings(index)}
            onMouseLeave={resetCards}
            ref={(element) => {
              cardRefs.current[index] = element
            }}
          >
            <img src={src} alt={labels[index] || `生活照片 ${index + 1}`} />
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <em>{labels[index] || 'PERSONAL ARCHIVE'}</em>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  )
}

export default BounceCards
