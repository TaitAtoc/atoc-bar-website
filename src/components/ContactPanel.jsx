import React from 'react'
import { Link } from './Link.jsx'
import { contactPlaceholders } from '../data/siteData.js'

export function ContactPanel({ compact = false }) {
  return (
    <div className={`contact-panel ${compact ? 'compact' : ''}`}>
      {contactPlaceholders.map(([label, value]) => (
        <div key={label}>
          <strong>{label}</strong>
          <span>{value}</span>
        </div>
      ))}
      <Link href="/contact" className="text-link">Open contact page</Link>
    </div>
  )
}
