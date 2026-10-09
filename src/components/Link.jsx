import React from 'react'
export function Link({ href, children, className, onClick, ...props }) {
  function handleClick(event) {
    if (onClick) onClick(event)
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (!href || href.startsWith('http') || href.startsWith('#')) return
    event.preventDefault()
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
    const hash = href.split('#')[1]
    if (hash) {
      requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
