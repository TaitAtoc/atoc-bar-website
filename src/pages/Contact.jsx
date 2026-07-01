import React, { useEffect, useState } from 'react'
import { ContactPanel } from '../components/ContactPanel.jsx'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { images } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

const MAP_ALT = 'ATOC Guangzhou map location'

function MapLightbox({ onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div className="promo-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={MAP_ALT}>
      <button type="button" className="promo-lightbox__close" onClick={onClose} aria-label="Close map image">
        &times;
      </button>
      <img
        src={images.contactMap}
        alt={MAP_ALT}
        className="promo-lightbox__image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export function Contact() {
  const [mapOpen, setMapOpen] = useState(false)

  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Find us / contact"
        title={pageMeta['/contact'].h1}
        text="Use this page for ATOC address, hours, map, phone, WeChat, bookings, and event enquiries once the details are confirmed."
        image={images.outdoor}
        actions={[{ label: 'Book a Group Table', href: '/bookings' }, { label: 'See What Is On', href: '/sports' }, { label: 'Browse Menus', href: '/menus' }]}
      />
      <ScrollReveal className="section split-feature">
        <div>
          <SectionTitle eyebrow="Contact details" title="Find ATOC in Guangzhou">
            Visit ATOC in Zhujiang New Town for drinks, sports, events, and casual nights with friends.
          </SectionTitle>
          <ContactPanel />
        </div>
        <button
          type="button"
          className="map-card"
          onClick={() => setMapOpen(true)}
          aria-label="Enlarge ATOC Guangzhou map location"
        >
          <img src={images.contactMap} alt={MAP_ALT} loading="lazy" />
        </button>
      </ScrollReveal>
      <ScrollReveal className="section social-row">
        <Link href="/bookings">Book ATOC for a group night</Link>
        <Link href="/gallery">View bar photos</Link>
        <Link href="/promotions">Check bar promotions</Link>
        <Link href="/menus">Browse drinks menus</Link>
      </ScrollReveal>
      {mapOpen && <MapLightbox onClose={() => setMapOpen(false)} />}
    </>
  )
}
