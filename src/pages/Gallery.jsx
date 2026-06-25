import React, { useMemo, useState } from 'react'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { gallery, images } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

export function Gallery() {
  const [filter, setFilter] = useState('All')
  const groups = useMemo(() => ['All', ...Array.from(new Set(gallery.map((item) => item.group)))], [])
  const visible = filter === 'All' ? gallery : gallery.filter((item) => item.group === filter)

  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Gallery & atmosphere"
        title={pageMeta['/gallery'].h1}
        text="See the bar, terrace, sports screens, and Guangzhou nightlife atmosphere before you plan a visit or group night."
        image={images.hero}
        actions={[{ label: 'Book This Space', href: '/bookings' }, { label: 'Explore Events at ATOC', href: '/events' }, { label: 'Contact ATOC', href: '/contact' }]}
      />
      <ScrollReveal className="section">
        <SectionTitle eyebrow="Image-led venue proof" title="Filtered gallery for a real Guangzhou bar feel">
          Contact sheets remain marked as internal review assets and should be replaced with approved final photography before launch.
        </SectionTitle>
        <div className="filter-bar">
          {groups.map((group) => <button className={filter === group ? 'active' : ''} type="button" key={group} onClick={() => setFilter(group)}>{group}</button>)}
        </div>
        <div className="gallery-grid">
          {visible.map((item) => (
            <figure key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <figcaption><strong>{item.title}</strong><span>{item.review}</span></figcaption>
            </figure>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal className="section social-row">
        <Link href="/about">Learn about the ATOC venue</Link>
        <Link href="/events">See sports nights and watch parties</Link>
        <Link href="/contact">Find ATOC in Guangzhou</Link>
      </ScrollReveal>
    </>
  )
}
