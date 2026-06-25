import React, { useEffect, useRef } from 'react'

export function ScrollReveal({ as: Tag = 'section', className = '', children }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      node.classList.add('is-visible')
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible')
        observer.unobserve(node)
      }
    }, { threshold: 0.16 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>
}
