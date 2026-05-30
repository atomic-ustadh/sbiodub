import { Link } from 'react-router-dom'
import SubscribeForm from './SubscribeForm'
import facebookIcon from '../assets/facebook.svg'
import instagramIcon from '../assets/instagram.svg'
import twitterIcon from '../assets/twitter-x.svg'
import whatsappIcon from '../assets/whatsapp.svg'

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg px-gutter py-xl max-w-container-max mx-auto">
        <div className="space-y-md">
          <div className="font-headline-sm text-headline-sm text-secondary-fixed font-bold">Contact Us</div>
          <p className="font-body-sm text-on-primary/80">
            Empowering the Next Generation of Muslim Leaders through community, faith, and dedicated service.
          </p>
          <div className="flex gap-md">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="w-5 h-5" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-md">Quick Links</h5>
          <ul className="space-y-sm font-body-sm text-on-primary/80">
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">Home</Link></li>
            <li><Link to="/events" className="hover:text-secondary-fixed transition-colors">Events</Link></li>
            <li><Link to="/join" className="hover:text-secondary-fixed transition-colors">Volunteer</Link></li>
            <li><Link to="/resources" className="hover:text-secondary-fixed transition-colors">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-md">Legal</h5>
          <ul className="space-y-sm font-body-sm text-on-primary/80">
            <li><span className="hover:text-secondary-fixed transition-colors cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-secondary-fixed transition-colors cursor-pointer">Terms of Service</span></li>
            <li><span className="hover:text-secondary-fixed transition-colors cursor-pointer">Contact</span></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-md">Stay Updated</h5>
          <p className="font-body-sm text-on-primary/80 mb-md">Subscribe to our newsletter for the latest updates.</p>
          <SubscribeForm variant="footer" />
        </div>
      </div>
      <div className="border-t border-white/10 py-md px-gutter text-center font-body-sm text-on-primary/60">
        &copy; 2024 Noor Youth Organization. All rights reserved.
      </div>
    </footer>
  )
}
