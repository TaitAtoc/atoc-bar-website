import React from 'react'
import { ContactPanel } from '../components/ContactPanel.jsx'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { images } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

export function Contact() {
  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Find us / contact"
        title={pageMeta['/contact'].h1}
        text="Use this page for ATOC address, hours, map, phone, WeChat, bookings, and event enquiries once the details are confirmed."
        image={images.outdoor}
        actions={[{ label: 'Book a Group Table', href: '/bookings' }, { label: 'See What Is On', href: '/events' }, { label: 'Browse Menus', href: '/menus' }]}
      />
      <ScrollReveal className="section split-feature">
        <div>
          <SectionTitle eyebrow="Contact details" title="Address, hours, and map details pending confirmation">
            ATOC needs owner-approved address, opening hours, phone or WeChat, map link, and social links before this page should become indexable.
          </SectionTitle>
          <ContactPanel />
        </div>
        <div className="map-placeholder">
          <span>Map placeholder</span>
          <strong>[Confirm map link]</strong>
          <p>Do not embed or publish a map until the current address and map pin are verified.</p>
        </div>
      </ScrollReveal>
      <ScrollReveal className="section social-row">
        <Link href="/bookings">Book ATOC for a group night</Link>
        <Link href="/gallery">View bar photos</Link>
        <Link href="/promotions">Check bar promotions</Link>
        <Link href="/menus">Browse drinks menus</Link>
      </ScrollReveal>
    </>
  )
}
