import React, { useEffect, useState } from 'react'

const BREAKPOINTS = [
  { maxWidth: 620, visible: 1 },
  { maxWidth: 860, visible: 2 },
]

function getVisibleCount() {
  if (typeof window === 'undefined') return 4
  const w = window.innerWidth
  for (const bp of BREAKPOINTS) {
    if (w <= bp.maxWidth) return bp.visible
  }
  return 4
}

function BeerCard({ title, text, image, alt }) {
  return (
    <div className="beer-card">
      <div className="beer-card-image">
        <img src={image} alt={alt} loading="lazy" />
      </div>
      <div className="beer-card-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

export function BeerCarousel({ items }) {
  const [visible, setVisible] = useState(getVisibleCount())
  const [index, setIndex] = useState(0)

  useEffect(() => {
    function onResize() {
      setVisible(getVisibleCount())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const maxIndex = Math.max(0, items.length - visible)

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const atStart = index <= 0
  const atEnd = index >= maxIndex

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))

  return (
    <div className="beer-carousel">
      <button
        type="button"
        className="beer-carousel__nav beer-carousel__nav--prev"
        onClick={prev}
        disabled={atStart}
        aria-label="Show previous beers"
      >
        ‹
      </button>
      <div className="beer-carousel__viewport">
        <div
          className="beer-carousel__track"
          style={{ '--visible': visible, transform: `translateX(-${index * (100 / visible)}%)` }}
        >
          {items.map((beer) => (
            <div className="beer-carousel__slide" key={beer.title}>
              <BeerCard {...beer} />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="beer-carousel__nav beer-carousel__nav--next"
        onClick={next}
        disabled={atEnd}
        aria-label="Show next beers"
      >
        ›
      </button>
    </div>
  )
}
