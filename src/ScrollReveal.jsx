import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollReveal.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  baseRotateX = 0,
  baseTranslateY = 0,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}) {
  const containerRef = useRef(null)

  const splitText = useMemo(() => {
    if (typeof children !== 'string') return children
    return children.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word
      return <span className="word" key={`${word}-${index}`}>{word}</span>
    })
  }, [children])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return undefined
    const scroller = scrollContainerRef?.current || window
    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          transformOrigin: '0% 50%',
          transformPerspective: 900,
          rotate: baseRotation,
          rotateX: baseRotateX,
          y: baseTranslateY,
        },
        {
          rotate: 0,
          rotateX: 0,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true,
          },
        },
      )

      const words = element.querySelectorAll('.word')
      gsap.fromTo(
        words,
        { opacity: baseOpacity, willChange: 'opacity, filter' },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      )

      if (enableBlur) {
        gsap.fromTo(
          words,
          { filter: `blur(${blurStrength}px)` },
          {
            filter: 'blur(0px)',
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: {
              trigger: element,
              scroller,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true,
            },
          },
        )
      }
    }, element)

    return () => context.revert()
  }, [baseOpacity, baseRotateX, baseRotation, baseTranslateY, blurStrength, enableBlur, rotationEnd, scrollContainerRef, wordAnimationEnd])

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`}>{splitText}</div>
    </div>
  )
}
