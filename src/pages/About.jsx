import React from 'react'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { pageMeta } from '../seo/pageMeta.js'
import { assetUrl } from '../utils/assetUrl.js'

export function About() {
  return (
    <>
      <ParallaxHero
        compact
        eyebrow="About ATOC"
        title={pageMeta['/about'].h1}
        text="A relaxed sports and social bar for locals, expats, visitors, match-night groups, and easy drinks in Guangzhou."
        image={assetUrl('/assets/photos/venue/ATOC Entrance.jpg')}
        actions={[{ label: 'Book a Group', href: '/bookings' }, { label: 'View ATOC Photos', href: '/gallery' }, { label: 'Find ATOC', href: '/contact' }]}
      />
      <ScrollReveal className="section split-feature">
        <div>
          <SectionTitle eyebrow="Story" title="A friendly local bar with an international crowd">
            ATOC was founded in 2019 by expatriate New Zealander Tait Dalrymple and his Chinese wife, Cai Endi. Located in Guangzhou’s Central Business District, Zhujiang Newtown, Tianhe, ATOC was built as a relaxed local bar for people who want somewhere easy to drink, talk, watch sport, and meet new people.
          </SectionTitle>
          <p className="body-copy">With indoor and outdoor seating for around 50 guests, a full drinks menu, Western and Chinese draught beers, and a mixed clientele from all over the world, ATOC has become a comfortable place to unwind and socialise in Guangzhou.</p>
          <p className="body-copy">Food is available from surrounding restaurants, and the team is happy to help guests order for delivery to ATOC. Because of its intimate size and social layout, ATOC works well for catching up with friends, meeting new people, watching live sport, or settling in for a casual night out.</p>
          <div className="social-row">
            <Link href="/sports">Check live sports at ATOC</Link>
            <Link href="/gallery">See the bar and terrace</Link>
          </div>
        </div>
        <img className="panel-image" src={assetUrl('/assets/photos/gallery/Dalrymple Family.png')} alt="Tait Dalrymple and Cai Endi at ATOC" loading="lazy" />
      </ScrollReveal>
      <ScrollReveal className="section mood-board">
        {['Sports fans', 'Casual drinks', 'International crowd', 'Terrace energy', 'Small groups', 'Watch parties'].map((item) => <span key={item}>{item}</span>)}
      </ScrollReveal>
    </>
  )
}
