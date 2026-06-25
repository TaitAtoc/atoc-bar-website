import React from 'react'
import { Link } from './Link.jsx'

export function FeatureCard({ title, text, image, href, badge }) {
  const body = (
    <article className="feature-card">
      {image && <img src={image} alt="" loading="lazy" />}
      <div>
        {badge && <span className="card-badge">{badge}</span>}
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  )

  return href ? <Link href={href} className="card-link">{body}</Link> : body
}
