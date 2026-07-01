export function assetUrl(path) {
  if (!path || /^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path
  }

  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\/+/, '')}`
}
