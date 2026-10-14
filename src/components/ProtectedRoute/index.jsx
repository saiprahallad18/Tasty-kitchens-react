import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = () => {
  const hasJwtToken = document.cookie
    .split('; ')
    .some(cookie => cookie.startsWith('jwt_token='))

  return hasJwtToken ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute