import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <main className="not-found-page">
    <img
      className="not-found-image"
      src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found.</p>
    <Link className="not-found-home-link" to="/">
      Go to Home
    </Link>
  </main>
)

export default NotFound