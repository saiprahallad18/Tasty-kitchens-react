import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Oval} from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const ITEMS_PER_PAGE = 9

const getJwtToken = () => {
  const jwtCookie = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('jwt_token='))

  return jwtCookie ? jwtCookie.split('=')[1] : ''
}

const LoadingView = ({testId}) => (
  <div className="loading-view" testid={testId}>
    <Oval color="gold" height={40} width={50} />
  </div>
)

const OffersCarousel = ({offers, isLoading, errorMessage}) => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0)

  if (isLoading) {
    return <LoadingView testId="restaurants-offers-loader" />
  }

  if (errorMessage) {
    return <p role="alert">{errorMessage}</p>
  }

  if (offers.length === 0) {
    return null
  }

  const showPreviousOffer = () => {
    setActiveOfferIndex(currentIndex =>
      currentIndex === 0 ? offers.length - 1 : currentIndex - 1,
    )
  }

  const showNextOffer = () => {
    setActiveOfferIndex(currentIndex =>
      currentIndex === offers.length - 1 ? 0 : currentIndex + 1,
    )
  }

  return (
    <section className="offers-section" aria-label="Restaurant offers">
      <button
        className="offer-arrow offer-arrow-left"
        type="button"
        aria-label="Previous offer"
        onClick={showPreviousOffer}
      >
        ‹
      </button>

      <img
        className="offer-image"
        src={offers[activeOfferIndex].image_url}
        alt="offer"
      />

      <button
        className="offer-arrow offer-arrow-right"
        type="button"
        aria-label="Next offer"
        onClick={showNextOffer}
      >
        ›
      </button>
    </section>
  )
}

const Home = () => {
  const [offers, setOffers] = useState([])
  const [isOffersLoading, setIsOffersLoading] = useState(true)
  const [offersError, setOffersError] = useState('')

  const [restaurants, setRestaurants] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedSortByValue, setSelectedSortByValue] = useState('Lowest')
  const [activePage, setActivePage] = useState(1)
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(true)
  const [restaurantsError, setRestaurantsError] = useState('')

  useEffect(() => {
    const fetchOffers = async () => {
      setIsOffersLoading(true)
      setOffersError('')

      try {
        const response = await fetch(
          'https://apis.ccbp.in/restaurants-list/offers',
          {
            headers: {
              Authorization: `Bearer ${getJwtToken()}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error('Could not load offers.')
        }

        const data = await response.json()
        setOffers(data.offers || [])
      } catch (error) {
        console.error('Offers request failed:', error)
        setOffersError('Unable to load offers.')
      } finally {
        setIsOffersLoading(false)
      }
    }

    fetchOffers()
  }, [])

  useEffect(() => {
    const fetchRestaurants = async () => {
      const offset = (activePage - 1) * ITEMS_PER_PAGE
      const queryParams = new URLSearchParams({
        offset: String(offset),
        limit: String(ITEMS_PER_PAGE),
        search: searchInput,
        sort_by_rating: selectedSortByValue,
      })

      setIsRestaurantsLoading(true)
      setRestaurantsError('')

      try {
        const response = await fetch(
          `https://apis.ccbp.in/restaurants-list?${queryParams.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${getJwtToken()}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error('Could not load restaurants.')
        }

        const data = await response.json()
        setRestaurants(data.restaurants || [])
        setTotalRestaurants(data.total || 0)
      } catch (error) {
        console.error('Restaurant request failed:', error)
        setRestaurantsError('Unable to load restaurants. Please try again.')
      } finally {
        setIsRestaurantsLoading(false)
      }
    }

    fetchRestaurants()
  }, [activePage, searchInput, selectedSortByValue])

  const handleSearchChange = event => {
    setSearchInput(event.target.value)
    setActivePage(1)
  }

  const handleSortChange = event => {
    setSelectedSortByValue(event.target.value)
    setActivePage(1)
  }

  const totalPages = Math.ceil(totalRestaurants / ITEMS_PER_PAGE)

  return (
    <>
      <Header />

      <main className="home-page">
        <OffersCarousel
          offers={offers}
          isLoading={isOffersLoading}
          errorMessage={offersError}
        />

        <div className="restaurant-toolbar">
          <div>
            <h1>Popular Restaurants</h1>
            <p>Discover the best restaurants near you.</p>
          </div>

          <div className="restaurant-controls">
            <label className="search-control" htmlFor="restaurant-search">
              Search restaurants
              <input
                id="restaurant-search"
                type="search"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search by name"
              />
            </label>

            <label className="sort-control" htmlFor="sort-by">
              <BsFilterLeft size={24} aria-hidden="true" />
              <span>Sort by rating</span>
              <select
                id="sort-by"
                value={selectedSortByValue}
                onChange={handleSortChange}
              >
                <option value="Lowest">Lowest</option>
                <option value="Highest">Highest</option>
              </select>
            </label>
          </div>
        </div>

        {isRestaurantsLoading ? (
          <LoadingView testId="restaurants-list-loader" />
        ) : restaurantsError ? (
          <p role="alert">{restaurantsError}</p>
        ) : restaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          <>
            <ul className="restaurant-list">
              {restaurants.map(restaurant => (
                <li
                  className="restaurant-card"
                  key={restaurant.id}
                  testid="restaurant-item"
                >
                  <Link
                    className="restaurant-link"
                    to={`/restaurant/${restaurant.id}`}
                  >
                    <img
                      className="restaurant-image"
                      src={restaurant.image_url}
                      alt="restaurant"
                    />
                    <div>
                      <h2>{restaurant.name}</h2>
                      <p>{restaurant.cuisine}</p>
                      <p>
                        ★ {restaurant.user_rating?.rating}{' '}
                        <span>{restaurant.user_rating?.rating_text}</span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav className="pagination" aria-label="Restaurant pages">
                <button
                  className="pagination-button"
                  type="button"
                  testid="pagination-left-button"
                  onClick={() => setActivePage(page => page - 1)}
                  disabled={activePage === 1}
                >
                  Previous
                </button>

                <span className="pagination-status">
                  <span testid="active-page-number">{activePage}</span> of{' '}
                  {totalPages}
                </span>

                <button
                  className="pagination-button"
                  type="button"
                  testid="pagination-right-button"
                  onClick={() => setActivePage(page => page + 1)}
                  disabled={activePage === totalPages}
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  )
}

export default Home