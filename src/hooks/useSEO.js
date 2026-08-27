import { useEffect } from 'react'

function setMeta(name, content) {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/**
 * Sets document title + meta description/keywords for the current page.
 * This is for search engines only — none of this is rendered visibly to users.
 */
export default function useSEO({ title, description, keywords }) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) document.title = title
    setMeta('description', description)
    setMeta('keywords', keywords)
    return () => {
      document.title = prevTitle
    }
  }, [title, description, keywords])
}
