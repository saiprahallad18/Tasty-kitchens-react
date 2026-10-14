import {Link, NavLink, useNavigate} from 'react-router-dom'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    document.cookie = 'jwt_token=; path=/; max-age=0; SameSite=Lax'
    navigate('/login', {replace: true})
  }

  return (
    <header className="site-header">
      <div className="site-header-content">
        <Link className="site-brand" to="/" aria-label="Tasty Kitchens home">
          <img
            className="site-logo-image"
            src="./public/tasty-kitchens-logo-header.jpg"
            alt="website logo"
            style={{width: '170px', height: 'auto'}}
          />
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink
            className={({isActive}) =>
              isActive ? 'site-nav-link active' : 'site-nav-link'
            }
            to="/"
            end
          >
            Home
          </NavLink>

          <NavLink
            className={({isActive}) =>
              isActive ? 'site-nav-link active' : 'site-nav-link'
            }
            to="/cart"
          >
            Cart
          </NavLink>

          <button
            className="logout-button"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header