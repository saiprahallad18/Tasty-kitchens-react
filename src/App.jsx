import {Routes, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App