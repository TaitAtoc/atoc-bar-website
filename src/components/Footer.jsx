import React from 'react'
import { Link } from './Link.jsx'
import { contactPlaceholders, logo, navItems } from '../data/siteData.js'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src={logo} alt="ATOC logo" loading="lazy" />
        <p>Guangzhou-focused ATOC site. Address, offers, and contact details still need confirmation before launch.</p>
      </div>
      <div className="footer-links">
        {navItems.map((item) => <Link key={item.path} href={item.path}>{item.label}</Link>)}
      </div>
      <div className="footer-contact">
        {contactPlaceholders.slice(0, 3).map(([label, value]) => (
          <span key={label}><strong>{label}</strong>{Array.isArray(value) ? value.join(', ') : value}</span>
        ))}
      </div>
    </footer>
  )
}
