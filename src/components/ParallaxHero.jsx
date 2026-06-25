import React, { useEffect, useState } from 'react'
import { Link } from './Link.jsx'
import { logo } from '../data/siteData.js'

export function ParallaxHero({ eyebrow, title, text, image, actions = [], compact = false }) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined
    const update = () => setOffset(Math.min(50, window.scrollY * 0.075))
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <section className={`page-hero ${compact ? 'compact' : ''}`}>
      <div className="hero-bg" style={{ backgroundImage: `url(${image})`, transform: `translateY(${offset}px) scale(1.1)` }} />
      <div className="hero-shade" />
      <div className="hero-content">
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
