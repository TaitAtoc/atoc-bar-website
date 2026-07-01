import React, { useEffect, useState } from 'react'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { galleryPhotos, images } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

function GalleryLightbox({ photo, onClose }) {
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
    <div className="promo-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={photo.alt}>
      <button type="button" className="promo-lightbox__close" onClick={onClose} aria-label="Close gallery image">
        &times;
      </button>
      <img
        src={photo.src}
        alt={photo.alt}
        className="promo-lightbox__image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <>
      <ParallaxHero
        compact
        eyebrow="Gallery & atmosphere"
        title={pageMeta['/gallery'].h1}
        text="See the bar, terrace, sports screens, and Guangzhou nightlife atmosphere before you plan a visit or group night."
        image={images.hero}
        actions={[{ label: 'Book This Space', href: '/bookings' }, { label: 'Explore Events at ATOC', href: '/sports' }, { label: 'Contact ATOC', href: '/contact' }]}
      />
      <ScrollReveal className="section">
        <SectionTitle eyebrow="Photo gallery" title="A look inside ATOC">
          Real photos from the bar, terrace, and match nights.
        </SectionTitle>
        <div className="gallery-grid">
          {galleryPhotos.map((photo) => (
            <button
              type="button"
              className="gallery-grid-item"
              key={photo.src}
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`Enlarge photo: ${photo.alt}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal className="section social-row">
        <Link href="/about">Learn about the ATOC venue</Link>
        <Link href="/sports">See sports nights and watch parties</Link>
        <Link href="/contact">Find ATOC in Guangzhou</Link>
      </ScrollReveal>
      {selectedPhoto && <GalleryLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </>
  )
}
