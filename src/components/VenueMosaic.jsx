import React from 'react'
import { Link } from './Link.jsx'

export function VenueMosaic({ eyebrow, title, text, moments = [], cta }) {
  return (
    <section className="venue-mosaic">
      <div className="venue-mosaic-copy">
        <span className="atmo-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{text}</p>
        {cta && <Link href={cta.href} className="text-link">{cta.label}</Link>}
      </div>
      <div className="venue-mosaic-grid" aria-label="ATOC venue atmosphere highlights">
        {moments.map((item, index) => (
          <figure className={`venue-mosaic-card atoc-border-tracer card-${index + 1}`} key={item.title}>
            <img src={item.image} alt={item.alt} loading="lazy" />
            <figcaption>
              <span>{item.kicker}</span>
              <strong>{item.title}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
