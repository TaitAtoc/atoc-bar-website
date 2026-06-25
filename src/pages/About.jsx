import React from 'react'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { images } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

export function About() {
  return (
    <>
      <ParallaxHero
        compact
        eyebrow="About ATOC"
        title={pageMeta['/about'].h1}
        text="A relaxed sports and social bar for locals, expats, visitors, match-night groups, and easy drinks in Guangzhou."
        image={images.bar}
        actions={[{ label: 'Book a Group', href: '/bookings' }, { label: 'View ATOC Photos', href: '/gallery' }, { label: 'Find ATOC', href: '/contact' }]}
      />
      <ScrollReveal className="section split-feature">
        <div>
          <SectionTitle eyebrow="Story" title="A friendly local bar with an international crowd">
            The legacy site says ATOC was founded in 2019 by Tait Dalrymple and Cai Endi. It describes a mixed local and expatriate crowd, indoor and outdoor seating, and an intimate bar layout.
          </SectionTitle>
          <p className="body-copy">The Guangzhou-focused site keeps that personality while leaving address, hours, capacity, and current offers for owner confirmation.</p>
          <div className="social-row">
            <Link href="/events">Check live sports at ATOC</Link>
            <Link href="/gallery">See the bar and terrace</Link>
          </div>
        </div>
        <img className="panel-image" src={images.outdoor} alt="Legacy outdoor ATOC seating" loading="lazy" />
      </ScrollReveal>
      <ScrollReveal className="section mood-board">
        {['Sports fans', 'Casual drinks', 'International crowd', 'Terrace energy', 'Small groups', 'Watch parties'].map((item) => <span key={item}>{item}</span>)}
      </ScrollReveal>
    </>
  )
}
