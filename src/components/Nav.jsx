import React, { useEffect, useState } from 'react'
import { Link } from './Link.jsx'
import { logo, navItems } from '../data/siteData.js'

export function Nav({ path }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <Link href="/" className="nav-logo" aria-label="ATOC home" onClick={() => setOpen(false)}>
        <img src={logo} alt="ATOC logo" />
      </Link>
      <button className="menu-toggle" type="button" aria-expanded={open} onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? 'is-open' : ''} aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path} className={path === item.path ? 'active' : ''} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/bookings" className="nav-cta" onClick={() => setOpen(false)}>Book / Contact</Link>
    </header>
  )
}
