import React from 'react'
import { BeerCarousel } from '../components/BeerCarousel.jsx'
import { Link } from '../components/Link.jsx'
import { MenuGallery } from '../components/MenuGallery.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { beers, images, menuCategories, menuPages } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

export function Menus() {
  return (
    <>
      <ParallaxHero
        compact
        className="hero-darken"
        eyebrow="Drinks & menus"
        title={pageMeta['/menus'].h1}
        text="Beer, cocktails, shooters, coffee, tea, shisha, and match-night favourites for a Guangzhou bar menu once current items are approved."
        image={images.bar}
        actions={[{ label: 'Ask What Is Available', href: '/contact' }, { label: 'Book a Table for Drinks', href: '/bookings' }, { label: 'Plan a Match Night', href: '/sports' }]}
      />
      <ScrollReveal className="section">
        <SectionTitle eyebrow="On tap & in the fridge" title="ATOC Beers">
          Danish, Japanese, American, Irish, Belgian, and Beijing brews, ready to pour.
        </SectionTitle>
        <BeerCarousel items={beers} />
      </ScrollReveal>
      <ScrollReveal className="section">
        <SectionTitle eyebrow="The full list" title="Full Drinks Menu">
          Browse the current ATOC drinks menu. Tap any page to enlarge.
        </SectionTitle>
        <MenuGallery categories={menuCategories} pages={menuPages} />
      </ScrollReveal>
      <ScrollReveal className="section social-row">
        <Link href="/promotions">See current drinks promotions</Link>
        <Link href="/sports">View live sports nights</Link>
        <Link href="/bookings">Book a table or group night</Link>
      </ScrollReveal>
    </>
  )
}
