import React, { useEffect, useState } from 'react'

const BREAKPOINTS = [
  { maxWidth: 900, visible: 1 },
]

function getVisibleCount() {
  if (typeof window === 'undefined') return 2
  const w = window.innerWidth
  for (const bp of BREAKPOINTS) {
    if (w <= bp.maxWidth) return bp.visible
  }
  return 2
}

function Lightbox({ page, onClose }) {
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
    <div className="menu-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={page.alt}>
      <button type="button" className="menu-lightbox__close" onClick={onClose} aria-label="Close enlarged menu page">
        &times;
      </button>
      <img
        src={page.image}
        alt={page.alt}
        className="menu-lightbox__image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export function MenuGallery({ categories, pages }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [visible, setVisible] = useState(getVisibleCount())
  const [index, setIndex] = useState(0)
  const [lightboxPage, setLightboxPage] = useState(null)

  useEffect(() => {
    function onResize() {
      setVisible(getVisibleCount())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const visiblePages = activeCategory === 'all'
    ? pages
    : pages.filter((page) => page.categories.includes(activeCategory))

  useEffect(() => {
    setIndex(0)
  }, [activeCategory])

  const maxIndex = Math.max(0, visiblePages.length - visible)

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const atStart = index <= 0
  const atEnd = index >= maxIndex

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))

  return (
    <div className="menu-gallery">
      <div className="filter-bar">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            className={activeCategory === category.key ? 'active' : ''}
            onClick={() => setActiveCategory(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="menu-carousel">
        <button
          type="button"
          className="menu-carousel__nav menu-carousel__nav--prev"
          onClick={prev}
          disabled={atStart}
          aria-label="Show previous menu pages"
        >
          &lsaquo;
        </button>
        <div className="menu-carousel__viewport">
          <div
            className="menu-carousel__track"
            style={{ '--visible': visible, transform: `translateX(-${index * (100 / visible)}%)` }}
          >
            {visiblePages.map((page) => (
              <div className="menu-carousel__slide" key={page.image}>
                <button
                  type="button"
                  className="menu-page-card"
                  onClick={() => setLightboxPage(page)}
                  aria-label={`Enlarge menu page: ${page.title}`}
                >
                  <img src={page.image} alt={page.alt} loading="lazy" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="menu-carousel__nav menu-carousel__nav--next"
          onClick={next}
          disabled={atEnd}
          aria-label="Show next menu pages"
        >
          &rsaquo;
        </button>
      </div>
      {lightboxPage && <Lightbox page={lightboxPage} onClose={() => setLightboxPage(null)} />}
    </div>
  )
}
