import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Oval} from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const getJwtToken = () => {
  const jwtCookie = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('jwt_token='))

  return jwtCookie ? jwtCookie.split('=')[1] : ''
}

const getStoredCartData = () => {
  try {
    return JSON.parse(localStorage.getItem('cartData') || '[]')
  } catch {
    return []
  }
}

const RestaurantDetails = () => {
  const {id} = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [quantities, setQuantities] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await fetch(
          `https://apis.ccbp.in/restaurants-list/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getJwtToken()}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error('Could not load restaurant details.')
        }

        const data = await response.json()
        setRestaurant(data)

        const cartData = getStoredCartData()
        const savedQuantities = {}

        ;(data.food_items || []).forEach(foodItem => {
          const cartItem = cartData.find(item => item.id === foodItem.id)
          savedQuantities[foodItem.id] = cartItem ? cartItem.quantity : 0
        })

        setQuantities(savedQuantities)
      } catch (error) {
        console.error('Restaurant details request failed:', error)
        setErrorMessage('Unable to load restaurant details. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRestaurantDetails()
  }, [id])

  const updateFoodQuantity = (foodItem, change) => {
    const cartData = getStoredCartData()
    const existingItem = cartData.find(item => item.id === foodItem.id)
    const currentQuantity = existingItem ? existingItem.quantity : 0
    const nextQuantity = Math.max(0, currentQuantity + change)

    let updatedCartData

    if (nextQuantity === 0) {
      updatedCartData = cartData.filter(item => item.id !== foodItem.id)
    } else if (existingItem) {
      updatedCartData = cartData.map(item =>
        item.id === foodItem.id ? {...item, quantity: nextQuantity} : item,
      )
    } else {
      updatedCartData = [
        ...cartData,
        {
          cost: foodItem.cost,
          quantity: nextQuantity,
          id: foodItem.id,
          imageUrl: foodItem.image_url,
          name: foodItem.name,
        },
      ]
    }

    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    setQuantities(current => ({
      ...current,
      [foodItem.id]: nextQuantity,
    }))
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="restaurant-details-page">
          <div className="restaurant-details-loader" testid="restaurant-details-loader">
            <Oval color="gold" height={40} width={50} />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (errorMessage || !restaurant) {
    return (
      <>
        <Header />
        <main className="restaurant-details-page">
          <p role="alert">
            {errorMessage || 'Restaurant details are unavailable.'}
          </p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="restaurant-details-page">
        <section className="restaurant-details-banner">
          <img
            className="restaurant-details-image"
            src={restaurant.image_url}
            alt="restaurant"
          />

          <div className="restaurant-details-info">
            <h1>{restaurant.name}</h1>
            <p>{restaurant.cuisine}</p>
            <p>{restaurant.location}</p>
            <p>₹{restaurant.cost_for_two} for two</p>
            <p>
              ★ {restaurant.rating} ({restaurant.reviews_count} reviews)
            </p>
          </div>
        </section>

        <section className="food-items-section">
          <h2>Menu</h2>

          <ul className="food-items-list">
            {(restaurant.food_items || []).map(foodItem => {
              const quantity = quantities[foodItem.id] || 0

              return (
                <li
                  className="food-item"
                  key={foodItem.id}
                  testid="foodItem"
                >
                  <img
                    className="food-item-image"
                    src={foodItem.image_url}
                    alt={foodItem.name}
                  />

                  <div className="food-item-info">
                    <h3>{foodItem.name}</h3>
                    <p>₹{foodItem.cost}</p>
                    <p>{foodItem.food_type}</p>

                    {quantity === 0 ? (
                      <button
                        className="add-food-button"
                        type="button"
                        onClick={() => updateFoodQuantity(foodItem, 1)}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="food-quantity-controls">
                        <button
                          type="button"
                          testid="decrement-count"
                          aria-label={`Remove one ${foodItem.name}`}
                          onClick={() => updateFoodQuantity(foodItem, -1)}
                        >
                          −
                        </button>

                        <span testid="active-count">{quantity}</span>

                        <button
                          type="button"
                          testid="increment-count"
                          aria-label={`Add one ${foodItem.name}`}
                          onClick={() => updateFoodQuantity(foodItem, 1)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default RestaurantDetails