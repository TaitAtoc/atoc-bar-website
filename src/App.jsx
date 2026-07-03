import React, { useEffect, useMemo, useState } from 'react'
import { Footer } from './components/Footer.jsx'
import { Nav } from './components/Nav.jsx'
import { About } from './pages/About.jsx'
import { Bookings } from './pages/Bookings.jsx'
import { Contact } from './pages/Contact.jsx'
import { Events } from './pages/Events.jsx'
import { Gallery } from './pages/Gallery.jsx'
import { Home } from './pages/Home.jsx'
import { Menus } from './pages/Menus.jsx'
import { Promotions } from './pages/Promotions.jsx'
import { canonicalFor, getPageMeta, siteBaseUrl, socialImageUrl } from './seo/pageMeta.js'

const routes = {
  '/': Home,
  '/about': About,
  '/sports': Events,
  '/menus': Menus,
  '/promotions': Promotions,
  '/gallery': Gallery,
  '/bookings': Bookings,
  '/contact': Contact,
}

function useCurrentPath() {
  const getPath = () => {
    const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
    return routes[pathname] ? pathname : '/'
  }
  const [path, setPath] = useState(getPath)

  useEffect(() => {
    const update = () => setPath(getPath())
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  return routes[path] ? path : '/'
}

function App() {
  const path = useCurrentPath()
  const Page = useMemo(() => routes[path] || Home, [path])

  useEffect(() => {
    const meta = getPageMeta(path)
    const canonical = canonicalFor(path, siteBaseUrl)

    document.title = meta.title
    upsertMeta('name', 'description', meta.description)
    upsertMeta('name', 'keywords', meta.keywords.join(', '))
    upsertMeta('name', 'robots', __ATOC_ROBOTS_CONTENT__)
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:image', socialImageUrl)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', socialImageUrl)
    upsertCanonical(canonical)
  }, [path])

  return (
    <div className="app-shell">
      <Nav path={path} />
      <main>
        <Page />
      </main>
      <Footer />
    </div>
  )
}

function upsertMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]')
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'canonical')
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

export default App
