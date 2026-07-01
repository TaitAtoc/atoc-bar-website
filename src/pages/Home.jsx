import React from 'react'
import { FeatureCard } from '../components/CardGrid.jsx'
import { ContactPanel } from '../components/ContactPanel.jsx'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { VenueMosaic } from '../components/VenueMosaic.jsx'
import { eventCards, facts, homeStory, images, promotions, venueMoments } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'
import { assetUrl } from '../utils/assetUrl.js'

export function Home() {
  return (
    <>
      <ParallaxHero
        className="hero--panorama"
        imageScale={1.02}
        eyebrow="Guangzhou bar / live sports / nightlife"
        title={pageMeta['/'].h1}
        text="A relaxed Guangzhou bar for live sports, drinks, group nights, and international-friendly nightlife."
        image={images.hero}
        actions={[
          { label: "See What's On", href: '/sports', className: 'btn-primary' },
          { label: 'Find ATOC', href: '/contact', className: 'btn-ghost' },
        ]}
      />

      <ScrollReveal className="quick-facts">
        {facts.map(([title, text]) => (
          <article className="atoc-border-tracer" key={title}>
            <strong>{title}</strong>
            {(Array.isArray(text) ? text : [text]).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </article>
        ))}
      </ScrollReveal>

      <ScrollReveal className="atmo-section" as="section">
        <div
          className="atmo-bg"
          style={{ backgroundImage: `url(${images.bar})` }}
          aria-hidden="true"
        />
        <div className="atmo-content">
          <span className="atmo-eyebrow">Guangzhou / Est. 2019</span>
          <h2 className="atmo-headline">Where sport meets the night</h2>
        </div>
      </ScrollReveal>

      <hr className="section-divider" />

      <ScrollReveal className="section">
        <VenueMosaic
          eyebrow={homeStory.eyebrow}
          title={homeStory.title}
          text={homeStory.text}
          moments={venueMoments}
          cta={homeStory.cta}
        />
      </ScrollReveal>

      <hr className="section-divider" />

      <ScrollReveal className="section bg-alt">
        <SectionTitle eyebrow="Tonight / this week" title="Live sports and easy nights out in Guangzhou">
          ATOC can anchor match nights, casual drinks, and private group plans once the weekly schedule and booking channel are confirmed.
        </SectionTitle>
        <div className="event-strip">
          {eventCards.map((item) => (
            <article className="event-tile atoc-border-tracer" key={item.title}>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <hr className="section-divider" />

      <ScrollReveal className="section visual-links">
        <FeatureCard title="Events & Sports" text="Rugby, football, F1, basketball, MMA, and group watch-party planning." image={assetUrl('/assets/photos/posters/Sports Generic Poster.png')} href="/sports" badge="Live sports" />
        <FeatureCard title="Drinks & Menus" text="Beer, cocktails, coffee, tea, shisha, and match-night drinks categories." image={assetUrl('/assets/photos/posters/Coffee Poster.png')} href="/menus" badge="Menus" />
        <FeatureCard title="Promotions" text="Happy hour and bar promotion candidates with current terms still to confirm." image={promotions[0].image} href="/promotions" badge="Offers" />
        <FeatureCard title="Gallery" text="Venue atmosphere, terrace, bar counter, screens, and sports-night photos." image={assetUrl('/assets/photos/posters/ChatGPT Image Jun 26, 2026, 06_01_22 PM.png')} href="/gallery" badge="Atmosphere" />
      </ScrollReveal>

      <hr className="section-divider" />

      <ScrollReveal className="section split-feature bg-alt">
        <div>
          <SectionTitle eyebrow="Visit / book" title="Plan a table, group night, or private event">
            Book a table, plan a group night, or message us about live sports and private events.
          </SectionTitle>
          <div className="social-row">
            <Link href="/sports">View live sports at ATOC</Link>
            <Link href="/bookings">Start a private booking</Link>
          </div>
        </div>
        <ContactPanel compact />
      </ScrollReveal>
    </>
  )
}
