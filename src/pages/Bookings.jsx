import React from 'react'
import { ContactPanel } from '../components/ContactPanel.jsx'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { images } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

export function Bookings() {
  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Private events / bookings"
        title={pageMeta['/bookings'].h1}
        text="Plan private parties, group drinks, sports watch parties, birthdays, company nights, and casual tables at ATOC in Guangzhou."
        image={images.bar}
        actions={[{ label: 'Start a Booking', href: '/contact' }, { label: 'Book a Sports Watch Party', href: '/events' }, { label: 'View the Venue', href: '/gallery' }]}
      />
      <ScrollReveal className="section split-feature">
        <div>
          <SectionTitle eyebrow="Booking types" title="A private party bar page built for group planning">
            ATOC can support parties, watch groups, birthdays, company drinks, dragon boat teams, and casual table bookings after capacity and policy are confirmed.
          </SectionTitle>
          <div className="booking-types">
            {['Sports watch party', 'Birthday drinks', 'Team night', 'Dragon boat group', 'Company drinks', 'Casual table'].map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="social-row">
            <Link href="/menus">Browse drinks before booking</Link>
            <Link href="/gallery">View the space before booking</Link>
          </div>
        </div>
        <div className="booking-form-shell">
          <h2>Enquiry fields to connect later</h2>
          {['Name', 'Preferred date', 'Group size', 'Event type', 'Phone / WeChat', 'Notes'].map((field) => <label key={field}>{field}<input placeholder="[Confirm workflow]" readOnly /></label>)}
        </div>
      </ScrollReveal>
      <ScrollReveal className="section">
        <ContactPanel />
      </ScrollReveal>
    </>
  )
}
