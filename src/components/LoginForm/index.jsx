import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Oval} from 'react-loader-spinner'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

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

      if (response.ok) {
        document.cookie = `jwt_token=${data.jwt_token}; path=/; max-age=86400; SameSite=Lax`
        navigate('/')
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
        <div className="login-form-container">
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/tasty-kitchens-logo.png"
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
              value={username}
              onChange={event => setUsername(event.target.value)}
              placeholder="Username"
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
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />

            {errorMessage && (
              <p className="login-error" role="alert">
                {errorMessage}
              </p>
            )}

            {isLoading ? (
              <div className="login-loader">
                <Oval color="gold" height={40} width={50} />
              </div>
            ) : (
              <button className="login-button" type="submit">
                Login
              </button>
            )}
          </form>
        </div>

        <img
          className="login-landing-image"
          src="https://assets.ccbp.in/frontend/react-js/tasty-kitchens-login-bg.png"
          alt="website login"
        />
      </section>
    </main>
  )
}

export default LoginForm