import { useEffect, useState } from 'react'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.localStorage.getItem('msr-store-theme') === 'dark' ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); window.localStorage.setItem('msr-store-theme', theme) }, [theme])
  return <button className="icon-button" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
    {theme === 'light' ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20.5 14.8A8.8 8.8 0 0 1 9.2 3.5 8.9 8.9 0 1 0 20.5 14.8Z"/></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>}
  </button>
}
