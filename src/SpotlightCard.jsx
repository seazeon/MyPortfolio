import { useRef } from 'react'
import './SpotlightCard.css'

function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(190, 255, 145, 0.22)',
}) {
  const cardRef = useRef(null)

  const handleMouseMove = (event) => {
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    cardRef.current.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <article
      className={`card-spotlight ${className}`}
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
      {children}
    </article>
  )
}

export default SpotlightCard
