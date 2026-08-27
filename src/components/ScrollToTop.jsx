import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router does not reset scroll position on navigation by default.
 * Without this, clicking into a new app page keeps the scroll offset
 * from wherever you were on the previous page. This forces every
 * route change to start at the top, like a real app/store would.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
