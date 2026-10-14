import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {BsPlus} from 'react-icons/bs'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {FaRupeeSign, FaCheckCircle} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const readCartData = () => {
  try {
    return JSON.parse(localStorage.getItem('cartData') || '[]')
  } catch {
    return []
  }
}

const Cart = () => {
  const [cartItems, setCartItems] = useState(readCartData)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const navigate = useNavigate()

  const updateQuantity = (itemId, change) => {
    const updatedCartItems = cartItems
      .map(item =>
        item.id === itemId
          ? {...item, quantity: item.quantity + change}
          : item,
      )
      .filter(item => item.quantity > 0)

    setCartItems(updatedCartItems)
    localStorage.setItem('cartData', JSON.stringify(updatedCartItems))
  }

  const totalCost = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0,
  )

  const handlePlaceOrder = () => {
    localStorage.setItem('cartData', JSON.stringify([]))
    setCartItems([])
    setOrderPlaced(true)
  }

  return (
    <>
      <Header />

      <main className="cart-page">
        {orderPlaced ? (
          <section className="payment-success">
            <FaCheckCircle className="payment-success-icon" />
            <h1>Payment Successful</h1>
            <p>Thank you for placing your order.</p>
            <button
              className="continue-shopping-button"
              type="button"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </section>
        ) : cartItems.length === 0 ? (
          <section className="empty-cart">
            <img
              className="empty-cart-image"
              src="https://assets.ccbp.in/frontend/react-js/tasty-kitchens-empty-cart-img.png"
              alt="empty cart"
            />
            <h1>Your cart is empty</h1>
            <p>Add food items from a restaurant to see them here.</p>
            <Link className="continue-shopping-button" to="/">
              Explore Restaurants
            </Link>
          </section>
        ) : (
          <>
            <h1 className="cart-title">My Cart</h1>

            <ul className="cart-items-list">
              {cartItems.map(item => (
                <li className="cart-item" key={item.id} testid="cartItem">
                  <img
                    className="cart-item-image"
                    src={item.imageUrl}
                    alt={item.name}
                  />

                  <div className="cart-item-details">
                    <h2>{item.name}</h2>

                    <div className="cart-quantity-controls">
                      <button
                        type="button"
                        testid="decrement-quantity"
                        aria-label={`Remove one ${item.name}`}
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <HiOutlineMinusSm />
                      </button>

                      <span testid="item-quantity">{item.quantity}</span>

                      <button
                        type="button"
                        testid="increment-quantity"
                        aria-label={`Add one ${item.name}`}
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <BsPlus />
                      </button>
                    </div>
                  </div>

                  <p className="cart-item-price">
                    <FaRupeeSign aria-hidden="true" />
                    {item.cost * item.quantity}
                  </p>
                </li>
              ))}
            </ul>

            <section className="cart-summary">
              <h2>Order Total</h2>
              <p>
                <FaRupeeSign aria-hidden="true" />
                <span testid="total-price">{totalCost}</span>
              </p>
              <button
                className="place-order-button"
                type="button"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  )
}

export default Cart