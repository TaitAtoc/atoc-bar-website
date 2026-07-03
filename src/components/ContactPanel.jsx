import React from 'react'
import { Link } from './Link.jsx'
import { contactPlaceholders } from '../data/siteData.js'

const phoneHref = 'tel:+8615705867448'
const mapHref = 'https://www.google.com/maps/search/?api=1&query=2-107%20Huaxun%20St%2C%20Zhujiang%20Newtown%2C%20Tianhe%2C%20Guangzhou%2C%20China'

export function ContactPanel({ compact = false }) {
  return (
    <div className={`contact-panel ${compact ? 'compact' : ''}`}>
      {contactPlaceholders.map(([label, value]) => (
        <div className="atoc-border-tracer" key={label}>
          <strong>{label}</strong>
          {label === 'Phone' ? (
            <a href={phoneHref}>{value}</a>
          ) : (Array.isArray(value) ? value : [value]).map((line) => (
            <span key={line}>{line}</span>
          ))}
          {label === 'Address' && (
            <a href={mapHref} target="_blank" rel="noreferrer">Open in Google Maps</a>
          )}
        </div>
      ))}
      <Link href="/contact" className="text-link">Open contact page</Link>
    </div>
  )
}
