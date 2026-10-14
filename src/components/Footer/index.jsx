import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="site-footer">
    <img
      className="footer-logo"
      src="/tasty-kitchens-logo-footer.jpg"
      alt="website-footer-logo"
    />

    <p className="footer-description">
      The best restaurants in your pocket
    </p>

    <ul className="footer-social-links">
      <li>
        <a
          href="https://www.pinterest.com/"
          aria-label="Pinterest"
          target="_blank"
          rel="noreferrer"
        >
          <FaPinterestSquare
            className="footer-social-icon"
            testid="pintrest-social-icon"
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com/"
          aria-label="Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram
            className="footer-social-icon"
            testid="instagram-social-icon"
          />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/"
          aria-label="Twitter"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter
            className="footer-social-icon"
            testid="twitter-social-icon"
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/"
          aria-label="Facebook"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookSquare
            className="footer-social-icon"
            testid="facebook-social-icon"
          />
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer