import { Link } from 'react-router-dom'
export default function NotFound(){return <main className="not-found"><div className="not-found__box"><span>404</span><h1>Page not found</h1><p>The page you're looking for doesn't exist.</p><Link to="/" className="button button--primary">Back to store <span>→</span></Link></div></main>}
