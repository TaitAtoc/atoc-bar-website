import React from 'react'
import { FeatureCard } from '../components/CardGrid.jsx'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { images, menuSections } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

export function Menus() {
  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Drinks & menus"
        title={pageMeta['/menus'].h1}
        text="Beer, cocktails, shooters, coffee, tea, shisha, and match-night favourites for a Guangzhou bar menu once current items are approved."
        image={images.bar}
        actions={[{ label: 'Ask What Is Available', href: '/contact' }, { label: 'Book a Table for Drinks', href: '/bookings' }, { label: 'Plan a Match Night', href: '/events' }]}
      />
      <ScrollReveal className="section">
        <SectionTitle eyebrow="Menu structure" title="Readable categories for cocktails, beer, and casual rounds">
          Use approved item lists later. For now, exact prices and current-offer claims stay out of the public copy.
        </SectionTitle>
        <div className="card-grid five">
          {menuSections.map((section) => <FeatureCard key={section.title} {...section} badge="Confirm current details" />)}
        </div>
      </ScrollReveal>
      <ScrollReveal className="section social-row">
        <Link href="/promotions">See current drinks promotions</Link>
        <Link href="/events">View live sports nights</Link>
        <Link href="/bookings">Book a table or group night</Link>
      </ScrollReveal>
    </>
  )
}
