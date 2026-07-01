import React, { useEffect, useState } from 'react'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { images, promotions } from '../data/siteData.js'
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

  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Promotions"
        title={pageMeta['/promotions'].h1}
        text="Happy hour, bar promotions, sports-night offers, and special nights in Guangzhou, with current terms still to confirm."
        image={images.promotionsHero}
        actions={[{ label: 'Ask About Current Offers', href: '/contact' }, { label: 'View Menus', href: '/menus' }, { label: 'Book for Tonight', href: '/bookings' }]}
      />
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
