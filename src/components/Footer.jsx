import { Link } from 'react-router-dom'
import SubscribeForm from './SubscribeForm'
import { facebook, instagram, twitter, whatsapp } from '../assets'

export default function Footer() {
  return (
    <footer className="mt-auto bg-primary text-on-primary">
      <div className="grid grid-cols-1 mx-auto md:grid-cols-4 gap-lg px-gutter py-xl max-w-container-max">
        <div className="space-y-md">
          <div className="font-bold font-headline-sm text-headline-sm text-secondary-fixed">Contact Us</div>
          <p className="font-body-sm text-on-primary/80">
            Banex Plaza, 2nd Floor, Suite 5, 123 Main Street, Abuja, Nigeria.
          </p>
          <div className="flex gap-md">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-white/80">
              <img src={instagram} alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-white/80">
              <img src={twitter} alt="Twitter" className="w-5 h-5" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-white/80">
              <img src={whatsapp} alt="WhatsApp" className="w-5 h-5" />
            </a>
          </div>
          <div>
            <p>09065750161, 08105185369, 09041520412</p>
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-md">Quick Links</h5>
          <ul className="space-y-sm font-body-sm text-on-primary/80">
            <li><Link to="/" className="transition-colors hover:text-secondary-fixed">Home</Link></li>
            <li><Link to="/events" className="transition-colors hover:text-secondary-fixed">Events</Link></li>
            <li><Link to="/join" className="transition-colors hover:text-secondary-fixed">Volunteer</Link></li>
            <li><Link to="/resources" className="transition-colors hover:text-secondary-fixed">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-md">Legal</h5>
          <ul className="space-y-sm font-body-sm text-on-primary/80">
            <li><Link to="/privacy" className="transition-colors hover:text-secondary-fixed">Privacy Policy</Link></li>
            <li><Link to="/terms" className="transition-colors hover:text-secondary-fixed">Terms of Service</Link></li>
            <li><Link to="/donate" className="transition-colors cursor-pointer hover:text-secondary-fixed">Donate</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-md">Stay Updated</h5>
          <p className="font-body-sm text-on-primary/80 mb-md">Subscribe to our newsletter for the latest updates.</p>
          <SubscribeForm variant="footer" />
        </div>
      </div>
      <div className="text-center border-t border-white/10 py-md px-gutter font-body-sm text-on-primary/60">
        Noor Youth Organization &copy; {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  )
}
