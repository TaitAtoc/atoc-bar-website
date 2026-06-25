import React from 'react'
import { FeatureCard } from '../components/CardGrid.jsx'
import { ContactPanel } from '../components/ContactPanel.jsx'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { eventCards, facts, images, promotions } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

export function Home() {
  return (
    <>
      <ParallaxHero
        eyebrow="Guangzhou bar / live sports / nightlife"
        title={pageMeta['/'].h1}
        text="A relaxed Guangzhou bar for live sports, drinks, group nights, and international-friendly nightlife."
        image={images.hero}
        actions={[
          { label: 'See What Is On', href: '/events' },
          { label: 'Browse Drinks & Menus', href: '/menus' },
          { label: 'Book a Table or Group Night', href: '/bookings' },
          { label: 'Find ATOC in Guangzhou', href: '/contact' },
        ]}
      />

      <ScrollReveal className="quick-facts">
        {facts.map(([title, text]) => (
          <article key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </article>
        ))}
      </ScrollReveal>

      <ScrollReveal className="section">
        <SectionTitle eyebrow="Tonight / this week" title="Live sports and easy nights out in Guangzhou">
          ATOC can anchor match nights, casual drinks, and private group plans once the weekly schedule and booking channel are confirmed.
        </SectionTitle>
        <div className="event-strip">
          {eventCards.map((item) => (
            <article className="event-tile" key={item.title}>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="section visual-links">
        <FeatureCard title="Events & Sports" text="Rugby, football, F1, basketball, MMA, and group watch-party planning." image={images.sports} href="/events" badge="Live sports" />
        <FeatureCard title="Drinks & Menus" text="Beer, cocktails, coffee, tea, shisha, and match-night drinks categories." image={images.coffee} href="/menus" badge="Menus" />
        <FeatureCard title="Promotions" text="Happy hour and bar promotion candidates with current terms still to confirm." image={promotions[0].image} href="/promotions" badge="Offers" />
        <FeatureCard title="Gallery" text="Venue atmosphere, terrace, bar counter, screens, and sports-night photos." image={images.bar} href="/gallery" badge="Atmosphere" />
      </ScrollReveal>

      <ScrollReveal className="section split-feature">
        <div>
          <SectionTitle eyebrow="Visit / book" title="Plan a table, group night, or private event">
            The contact details are placeholders until ATOC confirms current address, hours, phone or WeChat, and map link.
          </SectionTitle>
          <div className="social-row">
            <Link href="/events">View live sports at ATOC</Link>
            <Link href="/bookings">Start a private booking</Link>
          </div>
        </div>
        <ContactPanel compact />
      </ScrollReveal>
    </>
  )
}
