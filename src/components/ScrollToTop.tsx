/**
 * Resets window scroll to top on pathname changes.
 * Mounted once in `App` so SPA navigations don't retain previous scroll position.
 * Uses `useLayoutEffect` to apply before paint.
 */
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
