import React from 'react'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { SportsScheduleWidget } from '../components/SportsScheduleWidget.jsx'
import { PosterCarousel } from '../components/PosterCarousel.jsx'
import { eventCards, images } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'
import { assetUrl } from '../utils/assetUrl.js'

export function Events() {
  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Events & live sports"
        title={pageMeta['/sports'].h1}
        text="Watch rugby, football, Formula 1, basketball, MMA, and other match nights with friends in Guangzhou."
        image={assetUrl('/assets/photos/hero/sports hero.png')}
        actions={[{ label: 'Ask What Is On This Week', href: '/contact' }, { label: 'Book a Match Table', href: '/bookings' }, { label: 'Browse Match-Night Drinks', href: '/menus' }]}
      />
      <ScrollReveal className="section sports-split">
        <div className="sports-split__schedule">
          <SportsScheduleWidget compact />
        </div>
        <div className="sports-split__carousel">
          <PosterCarousel />
        </div>
      </ScrollReveal>
      <ScrollReveal className="section event-page-grid">
        {eventCards.map((item) => (
          <article className="big-event-card" key={item.title}>
            <span>{item.tag}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <Link href="/contact">Ask what is on</Link>
          </article>
        ))}
      </ScrollReveal>
      <ScrollReveal className="section social-row">
        <Link href="/menus">Browse match-night drinks</Link>
        <Link href="/promotions">See sports-night offers</Link>
        <Link href="/bookings">Book a sports watch party</Link>
      </ScrollReveal>
    </>
  )
}
