import React from 'react'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { eventCards, images, sports } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

export function Events() {
  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Events & live sports"
        title={pageMeta['/events'].h1}
        text="Watch rugby, football, Formula 1, basketball, MMA, and other match nights with friends in Guangzhou."
        image={images.sports}
        actions={[{ label: 'Ask What Is On This Week', href: '/contact' }, { label: 'Book a Match Table', href: '/bookings' }, { label: 'Browse Match-Night Drinks', href: '/menus' }]}
      />
      <ScrollReveal className="section">
        <SectionTitle eyebrow="Sports shown" title="A Guangzhou sports bar page built around fixture-led nights">
          Current weekly fixtures, start times, audio policy, and booking rules still need confirmation, but the page is structured for high-intent sports searches.
        </SectionTitle>
        <div className="sports-cloud">
          {sports.map((sport) => <button type="button" key={sport}>{sport}</button>)}
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
