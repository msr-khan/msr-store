import { useEffect, useState } from 'react'

export default function InstallPWAButton({ className = '' }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
    setInstalled(standalone)
    const beforeInstall = e => { e.preventDefault(); setDeferredPrompt(e) }
    const installedHandler = () => { setInstalled(true); setDeferredPrompt(null) }
    window.addEventListener('beforeinstallprompt', beforeInstall)
    window.addEventListener('appinstalled', installedHandler)
    return () => { window.removeEventListener('beforeinstallprompt', beforeInstall); window.removeEventListener('appinstalled', installedHandler) }
  }, [])

  if (installed) return <span className={`install-status ${className}`}>✓ Installed</span>
  if (!deferredPrompt) return null

  const install = async () => {
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  return <button className={`button button--primary button--small ${className}`} onClick={install}>Install Store</button>
}
