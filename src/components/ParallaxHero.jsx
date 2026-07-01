import React, { useEffect, useState } from 'react'
import { Link } from './Link.jsx'
import { logo } from '../data/siteData.js'

export function ParallaxHero({
  eyebrow,
  title,
  text,
  image,
  actions = [],
  compact = false,
  className = '',
  imageScale = 1.1,
  backgroundSpeed = 0.12,
  contentSpeed = 0.38,
}) {
  const [offsets, setOffsets] = useState({ background: 0, content: 0 })
  const backgroundImage = image ? `url("${image.replace(/"/g, '\\"')}")` : undefined

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    let frame = 0
    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const mobile = window.matchMedia('(max-width: 860px)').matches
        const bgSpeed = mobile ? backgroundSpeed * 0.45 : backgroundSpeed
        const textSpeed = mobile ? contentSpeed * 0.45 : contentSpeed
        setOffsets({
          background: -Math.min(70, window.scrollY * bgSpeed),
          content: -Math.min(190, window.scrollY * textSpeed),
        })
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [backgroundSpeed, contentSpeed])

  return (
    <section className={`page-hero parallax-hero ${compact ? 'compact' : ''} ${className}`.trim()}>
      <div
        className="hero-bg parallax-hero__bg"
        style={{ backgroundImage, transform: `translate3d(0, ${offsets.background}px, 0) scale(${imageScale})` }}
      />
      <div className="hero-shade" />
      <div className="hero-content parallax-hero__content" style={{ transform: `translate3d(0, ${offsets.content}px, 0)` }}>
        <img className="hero-logo" src={logo} alt="ATOC logo" />
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-lede">{text}</p>
        {actions.length > 0 && (
          <div className="hero-actions">
            {actions.map((action) => (
              <Link key={action.href} href={action.href} className={action.className}>{action.label}</Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
