import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import apps from '../data/apps.json'
import AppCard from '../components/AppCard.jsx'

const Icon = ({ name, size = 18 }) => {
  const p = { search:<><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></>, arrow:<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>, spark:<><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/></> }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p[name]}</svg>
}

export default function Home() {
  const [params] = useSearchParams()
  const query = (params.get('q') || '').trim()
  const [activeCategory, setActiveCategory] = useState('All')
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const categories = useMemo(() => ['All', ...new Set(apps.map(a => a.category))], [])
  const featured = apps[featuredIndex % Math.max(apps.length, 1)]

  useEffect(() => {
    if (apps.length < 2) return
    const timer = setInterval(() => setFeaturedIndex(i => (i + 1) % apps.length), 7000)
    return () => clearInterval(timer)
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return apps.filter(app => {
      const categoryMatch = activeCategory === 'All' || app.category === activeCategory
      const text = [app.title, app.shortDescription, app.description, app.category, ...(app.tags || [])].join(' ').toLowerCase()
      return categoryMatch && (!q || text.includes(q))
    })
  }, [activeCategory, query])

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-orb hero-orb--one" /><div className="hero-orb hero-orb--two" />
        <div className="container home-hero__grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="hero-kicker__dot" /> Independent software · Curated by MSR</div>
            <h1>Software that feels <em>simple.</em></h1>
            <p>Discover focused desktop apps and games built with care. Browse the catalog, see what each app does, and install through its official release link.</p>
            <div className="hero-actions">
              <a href="#catalog" className="button button--primary">Explore apps <Icon name="arrow" size={17} /></a>
              <Link to="/about" className="button button--soft">Meet the developer</Link>
            </div>
            <div className="hero-proof"><span>✓ Direct downloads</span><span>✓ Lightweight apps</span><span>✓ No unnecessary accounts</span></div>
          </div>

          {featured && <div className="featured-card" key={featured.id}>
            <div className="featured-card__glow" />
            <div className="featured-card__top"><span>Featured this week</span><span>{String(featuredIndex + 1).padStart(2,'0')} / {String(apps.length).padStart(2,'0')}</span></div>
            <div className="featured-card__content">
              <div className="featured-icon-wrap"><img src={featured.icon} alt="" /></div>
              <div><span className="featured-category">{featured.category}</span><h2>{featured.title}</h2><p>{featured.shortDescription}</p></div>
            </div>
            <div className="featured-card__stats"><span><b>★</b> {featured.rating.toFixed(1)}</span><span>{featured.size}</span><span>{featured.platform}</span></div>
            <Link to={`/app/${featured.id}`} className="featured-card__link">View app <Icon name="arrow" size={16} /></Link>
            <div className="featured-dots">{apps.map((a,i)=><button key={a.id} className={i === featuredIndex ? 'is-active' : ''} onClick={() => setFeaturedIndex(i)} aria-label={`Show ${a.title}`} />)}</div>
          </div>}
        </div>
      </section>

      <section className="container catalog" id="catalog">
        <div className="section-heading"><div><span className="section-kicker">Explore the collection</span><h2>Find your next app</h2></div><span className="catalog-count">{filtered.length} {filtered.length === 1 ? 'app' : 'apps'}</span></div>
        <div className="category-bar">
          <div className="category-bar__scroll">
            {categories.map(cat => <button key={cat} className={activeCategory === cat ? 'is-active' : ''} onClick={() => setActiveCategory(cat)}>{cat}</button>)}
          </div>
          <span className="category-bar__hint"><Icon name="spark" size={15} /> Updated collection</span>
        </div>
        {query && <div className="search-state"><Icon name="search" size={15} /><span>Showing results for <b>“{query}”</b></span></div>}
        {filtered.length ? <div className="app-grid">{filtered.map((app, i) => <AppCard key={app.id} app={app} index={i} />)}</div> : <div className="empty-state"><div className="empty-state__icon">⌕</div><h3>No matching apps</h3><p>Try a different search term or category.</p></div>}
      </section>

      <section className="container value-strip">
        <div><span>01</span><h3>Clear product pages</h3><p>Everything important is visible before you install.</p></div>
        <div><span>02</span><h3>Direct release links</h3><p>Installers stay connected to their existing download URLs.</p></div>
        <div><span>03</span><h3>Built for the web</h3><p>Fast, responsive and polished from desktop to mobile.</p></div>
      </section>
    </main>
  )
}
