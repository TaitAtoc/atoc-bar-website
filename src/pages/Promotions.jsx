import React from 'react'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { images, promotions } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

export function Promotions() {
  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Promotions"
        title={pageMeta['/promotions'].h1}
        text="Happy hour, bar promotions, sports-night offers, and special nights in Guangzhou, with current terms still to confirm."
        image={images.outdoor}
        actions={[{ label: 'Ask About Current Offers', href: '/contact' }, { label: 'View Menus', href: '/menus' }, { label: 'Book for Tonight', href: '/bookings' }]}
      />
      <ScrollReveal className="section">
        <SectionTitle eyebrow="Promotion candidates" title="Visual offer cards with careful claims">
          The old site mentioned these offers, but each one still needs owner confirmation, current terms, and valid dates.
        </SectionTitle>
        <div className="promo-wall">
          {promotions.map((promo) => (
            <article className="promo-panel" key={promo.title}>
              <img src={promo.image} alt={`${promo.title} legacy promotion`} loading="lazy" />
              <div>
                <span>{promo.badge}</span>
                <h2>{promo.title}</h2>
                <p>{promo.status}</p>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal className="section social-row">
        <Link href="/events">View match-night events</Link>
        <Link href="/menus">Browse drinks and menus</Link>
        <Link href="/bookings">Reserve for a group</Link>
      </ScrollReveal>
    </>
  )
}
