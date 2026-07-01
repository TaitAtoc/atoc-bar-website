import React from 'react'
import { Link } from './Link.jsx'
import { contactPlaceholders } from '../data/siteData.js'

export function ContactPanel({ compact = false }) {
  return (
    <div className={`contact-panel ${compact ? 'compact' : ''}`}>
      {contactPlaceholders.map(([label, value]) => (
        <div className="atoc-border-tracer" key={label}>
          <strong>{label}</strong>
          {(Array.isArray(value) ? value : [value]).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      ))}
      <Link href="/contact" className="text-link">Open contact page</Link>
    </div>
  )
}
