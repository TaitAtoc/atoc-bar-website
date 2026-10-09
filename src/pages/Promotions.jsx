import React, { useEffect, useState } from 'react'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { images, nzgbaEvent, promotions } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

function PromoLightbox({ promo, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div className="promo-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${promo.title} promotion poster`}>
      <button type="button" className="promo-lightbox__close" onClick={onClose} aria-label="Close promotion">
        &times;
      </button>
      <img
        src={promo.image}
        alt={`${promo.title} promo poster`}
        className="promo-lightbox__image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export function Promotions() {
  const [selectedPromo, setSelectedPromo] = useState(null)

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SocialEvent',
    name: nzgbaEvent.title,
    startDate: nzgbaEvent.startDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: `https://www.atocbar.com${nzgbaEvent.image}`,
    url: `https://www.atocbar.com${nzgbaEvent.href}`,
    isAccessibleForFree: true,
    location: {
      '@type': 'Place',
      name: 'ATOC Bar',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shop 107, No. 2 Huaxun Street, Zhujiang New Town, Tianhe District',
        addressLocality: 'Guangzhou',
        addressCountry: 'CN',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'New Zealand Greater Bay Area Network (NZGBA)',
      url: 'http://www.nzgba.org/',
    },
  }

  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Events & Promotions"
        title={pageMeta['/promotions'].h1}
        text="Join the NZGBA networking evening on 24 October, and explore ATOC's current offers."
        image={images.promotionsHero}
        actions={[{ label: 'See the NZGBA event', href: nzgbaEvent.href }, { label: 'View Menus', href: '/menus' }, { label: 'Book for Tonight', href: '/bookings' }]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <ScrollReveal className="section nzgba-event" as="section" id="nzgba-canton-fair-phase-2-networking-drinks">
        <SectionTitle eyebrow="Saturday, 24 October 2026 · 7:00 pm onwards" title={nzgbaEvent.title}>
          Join us in Guangzhou for a free New Zealand networking evening during Phase 2 of the Canton Fair!
        </SectionTitle>
        <div className="nzgba-event__layout">
          <div className="nzgba-event__copy">
            <p>The New Zealand Greater Bay Area Network (NZGBA) invites Kiwis, Kiwi eCommerce sellers, Kiwi importers and friends of New Zealand to join us for an informal evening of drinks, conversation and networking in Guangzhou.</p>
            <p>Whether you're visiting China for the Canton Fair, sourcing products, running an eCommerce business or living and working in the Greater Bay Area, this is a chance to meet fellow New Zealanders, exchange experiences and make new connections.</p>
            <p>We're getting together at ATOC Bar, a Kiwi-owned bar operated by fellow New Zealander Tait Dalrymple, in the heart of Guangzhou's Zhujiang New Town.</p>
            <p>There's no formal programme, just an opportunity to catch up, meet new people and enjoy a relaxed evening with the New Zealand community.</p>
            <p>And as a bonus, ATOC's happy hour runs until 10 pm!</p>

            <h3>Event details</h3>
            <dl className="nzgba-event__details">
              <div><dt>Date</dt><dd>{nzgbaEvent.date}</dd></div>
              <div><dt>Time</dt><dd>{nzgbaEvent.time} (Asia/Shanghai)</dd></div>
              <div><dt>Venue</dt><dd>ATOC Bar, Guangzhou</dd></div>
              <div><dt>Address</dt><dd>Shop 107, No. 2 Huaxun Street, Zhujiang New Town, Tianhe District, Guangzhou</dd></div>
              <div><dt>Admission</dt><dd>Free to attend</dd></div>
              <div><dt>Nearest Metro</dt><dd>Wuyangcun Station (Line 5)</dd></div>
              <div><dt>Also nearby</dt><dd>Zhujiang New Town Station (Lines 3 and 5)</dd></div>
            </dl>

            <h3>A taste of New Zealand?</h3>
            <p>We're also hoping to arrange some Kiwi pies for the evening. If we receive enough RSVPs, we'll organise a batch to be made.</p>
            <p>If you've been missing a good Kiwi pie while in China, here's another reason to come along!</p>

            <h3>RSVP</h3>
            <p>Attendance is free, but please RSVP in advance.</p>
            <p>Scan the QR code on the event poster to register. This helps us estimate numbers, plan the evening and determine whether we can arrange the pies.</p>
            <p>You don't need to be an NZGBA member to attend. Whether you're a long-time resident, visiting the Canton Fair or simply have a connection to New Zealand, you're welcome.</p>
            <p>We look forward to seeing you in Guangzhou!</p>
            <p>New Zealand Greater Bay Area Network (NZGBA)<br />Website: <a href="http://www.nzgba.org/" target="_blank" rel="noopener noreferrer">www.nzgba.org</a><br />Email: <a href="mailto:nzgba@nzgba.org">nzgba@nzgba.org</a></p>
          </div>
          <figure className="nzgba-event__poster">
            <a href={nzgbaEvent.image} target="_blank" rel="noopener noreferrer" aria-label="Open full-size NZGBA event poster and RSVP QR code">
              <img src={nzgbaEvent.image} alt="NZGBA Canton Fair Phase 2 Networking Drinks poster with RSVP QR code" width="1122" height="1408" />
            </a>
            <figcaption>Tap the poster to view it at full size and scan the RSVP QR code.</figcaption>
          </figure>
        </div>
      </ScrollReveal>
      <ScrollReveal className="section">
        <SectionTitle eyebrow="Current offers" title="Happy hour, ladies night, and sweet treats">
          Real ATOC promo posters, straight from the bar.
        </SectionTitle>
        <div className="promo-wall">
          {promotions.map((promo) => (
            <article className="promo-panel" key={promo.title}>
              <button
                type="button"
                className="promo-panel-image"
                onClick={() => setSelectedPromo(promo)}
                aria-label={`Enlarge ${promo.title} promotion poster`}
              >
                <img src={promo.image} alt={`${promo.title} promo poster`} loading="lazy" />
              </button>
              <div>
                <h2>{promo.title}</h2>
                <p>{promo.status}</p>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal className="section social-row">
        <Link href="/sports">View match-night events</Link>
        <Link href="/menus">Browse drinks and menus</Link>
        <Link href="/bookings">Reserve for a group</Link>
      </ScrollReveal>
      {selectedPromo && <PromoLightbox promo={selectedPromo} onClose={() => setSelectedPromo(null)} />}
    </>
  )
}
