import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const loginImage = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 560">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff3df"/>
        <stop offset="1" stop-color="#ffd18a"/>
      </linearGradient>
      <linearGradient id="soup" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ff9b27"/>
        <stop offset="1" stop-color="#dc4e12"/>
      </linearGradient>
    </defs>
    <rect width="640" height="560" rx="34" fill="url(#bg)"/>
    <circle cx="520" cy="100" r="52" fill="#fff" opacity=".35"/>
    <circle cx="105" cy="420" r="72" fill="#fff" opacity=".3"/>
    <ellipse cx="320" cy="330" rx="190" ry="112" fill="#27324a"/>
    <ellipse cx="320" cy="311" rx="176" ry="99" fill="#fff"/>
    <ellipse cx="320" cy="303" rx="150" ry="78" fill="url(#soup)"/>
    <circle cx="254" cy="280" r="17" fill="#ffd76a"/>
    <circle cx="354" cy="331" r="14" fill="#ffc94e"/>
    <circle cx="397" cy="274" r="11" fill="#fff0b2"/>
    <path d="M230 322c30-24 55-24 82 0m38-52c20-18 43-18 62 0m-111 62c22-17 41-17 62 0"
      fill="none" stroke="#7d391b" stroke-width="9" stroke-linecap="round"/>
    <path d="M456 185l86 130m-65-144l86 130m-65-144l86 130"
      stroke="#27324a" stroke-width="12" stroke-linecap="round"/>
    <path d="M127 219c31-28 54-28 82 0m-68 23c23-20 41-20 63 0"
      fill="none" stroke="#54a76b" stroke-width="10" stroke-linecap="round"/>
    <text x="320" y="480" text-anchor="middle" font-family="Arial, sans-serif"
      font-size="28" font-weight="700" fill="#26334b">A meal worth sharing</text>
  </svg>
`)}`

const LoginForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
      })

      const data = await response.json()

      if (response.ok && data.jwt_token) {
        document.cookie = `jwt_token=${data.jwt_token}; path=/; max-age=86400; SameSite=Lax`
        navigate('/', {replace: true})
      } else {
        setErrorMessage(data.error_msg || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Login request failed:', error)
      setErrorMessage('Unable to connect. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-form-panel">
          <img
            className="login-logo"
            src="/tasty-kitchens-logo-header.jpg"
            alt="website logo"
          />

          <h1 className="login-title">Tasty Kitchens</h1>
          <p className="login-subtitle">Login to your account</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="login-input"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={event => setUsername(event.target.value)}
              autoComplete="username"
              required
            />

            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="login-input"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />

            {errorMessage && (
              <p className="login-error" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              className="login-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        </div>

        <div className="login-image-panel">
          <img
            className="login-illustration"
            src={loginImage}
            alt="website login"
          />
        </div>
      </section>
    </main>
  )
}

export default LoginForm