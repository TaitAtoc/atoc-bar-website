import React, { useState, useEffect, useMemo, useRef } from 'react'
import { assetUrl } from '../utils/assetUrl.js'

const ROTATE_MS = 7000

export function PosterCarousel() {
  const [manifest, setManifest] = useState(null)
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    fetch(assetUrl('/data/sports-posters.json'))
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => setManifest(data))
      .catch(() => setManifest({ posters: [] }))
  }, [])

  const activePosters = useMemo(() => {
    if (!manifest || !Array.isArray(manifest.posters)) return []
    const now = new Date()
    return manifest.posters.filter(p => p.active && new Date(p.expiresAt) > now)
  }, [manifest])

  useEffect(() => {
    if (index >= activePosters.length) setIndex(0)
  }, [activePosters, index])

  useEffect(() => {
    if (activePosters.length <= 1) return undefined
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % activePosters.length)
    }, ROTATE_MS)
    return () => clearInterval(timerRef.current)
  }, [activePosters.length])

  const goTo = (i) => {
    clearInterval(timerRef.current)
    setIndex(i)
  }
  const prev = () => goTo((index - 1 + activePosters.length) % activePosters.length)
  const next = () => goTo((index + 1) % activePosters.length)

  if (manifest === null) {
    return <section className="poster-carousel" aria-label="Sports posters" />
  }

  if (activePosters.length === 0) {
    return (
      <section className="poster-carousel" aria-label="Sports posters">
        <div className="poster-carousel__frame poster-carousel__empty">
          <p>Sports posters will appear here as games are confirmed.</p>
        </div>
      </section>
    )
  }

  const poster = activePosters[index]

  return (
    <section className="poster-carousel" aria-label="Sports posters">
      <div className="poster-carousel__frame">
        {activePosters.length > 1 && (
          <button
            type="button"
            className="poster-carousel__nav poster-carousel__nav--prev"
            onClick={prev}
            aria-label="Previous poster"
          >
            ‹
          </button>
        )}
        <img
          key={poster.id}
          src={assetUrl(poster.imageUrl)}
          alt={poster.title}
          className="poster-carousel__image"
          loading="lazy"
        />
        {activePosters.length > 1 && (
          <button
            type="button"
            className="poster-carousel__nav poster-carousel__nav--next"
            onClick={next}
            aria-label="Next poster"
          >
            ›
          </button>
        )}
      </div>
      {activePosters.length > 1 && (
        <div className="poster-carousel__dots" role="tablist" aria-label="Poster selector">
          {activePosters.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show poster ${i + 1} of ${activePosters.length}`}
              className={`poster-carousel__dot${i === index ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
