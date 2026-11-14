import { Link } from 'react-router-dom'
import SubscribeForm from './SubscribeForm'
import { facebook, instagram, twitter, whatsapp } from '../assets'

const socials = [
  { href: 'https://facebook.com', label: 'Facebook', icon: facebook },
  { href: 'https://instagram.com', label: 'Instagram', icon: instagram },
  { href: 'https://twitter.com', label: 'Twitter', icon: twitter },
  { href: 'https://whatsapp.com', label: 'WhatsApp', icon: whatsapp },
]

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-primary text-on-primary print:hidden">
      <div className="absolute inset-0 geometric-pattern opacity-[0.08]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary-fixed/70 to-transparent" />
      <div className="relative z-10 mx-auto grid max-w-container-max grid-cols-1 gap-xl px-gutter py-xl md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.35fr]">
        <div className="space-y-md">
          <div className="flex items-center gap-sm">
            <span className="h-6 w-1 rounded-full bg-secondary-fixed" />
            <h2 className="font-headline-sm text-headline-sm text-secondary-fixed">Contact Us</h2>
          </div>
          <p className="max-w-80 font-body-sm text-body-sm leading-relaxed text-on-primary/75">
            Banex Plaza, 2nd Floor, Suite 5, 123 Main Street, Abuja, Nigeria.
          </p>
          <div className="flex gap-sm">
            {socials.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary-fixed/50 hover:bg-white/10"
              >
                <img src={icon} alt="" className="h-4 w-4 opacity-80" />
              </a>
            ))}
          </div>
          <p className="font-body-sm text-body-sm text-on-primary/75">
            09065750161, 08105185369, 09041520412
          </p>
        </div>

        <div>
          <h3 className="mb-md font-label-md text-label-md uppercase text-secondary-fixed/90">Quick Links</h3>
          <ul className="space-y-sm font-body-sm text-body-sm text-on-primary/75">
            <li><Link to="/" className="transition-colors hover:text-secondary-fixed">Home</Link></li>
            <li><Link to="/events" className="transition-colors hover:text-secondary-fixed">Events</Link></li>
            <li><Link to="/get-involved/volunteer" className="transition-colors hover:text-secondary-fixed">Volunteer</Link></li>
            <li><Link to="/resources" className="transition-colors hover:text-secondary-fixed">Resources</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-secondary-fixed">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-md font-label-md text-label-md uppercase text-secondary-fixed/90">Legal</h3>
          <ul className="space-y-sm font-body-sm text-body-sm text-on-primary/75">
            <li><Link to="/privacy" className="transition-colors hover:text-secondary-fixed">Privacy Policy</Link></li>
            <li><Link to="/terms" className="transition-colors hover:text-secondary-fixed">Terms of Service</Link></li>
            <li><Link to="/donate" className="cursor-pointer transition-colors hover:text-secondary-fixed">Donate</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-md font-label-md text-label-md uppercase text-secondary-fixed/90">Stay Updated</h3>
          <p className="mb-md font-body-sm text-body-sm text-on-primary/75">
            Subscribe to our newsletter for the latest updates.
          </p>
          <SubscribeForm variant="footer" />
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10 px-gutter py-md text-center font-body-sm text-body-sm text-on-primary/55">
        Leadership Course Abuja &copy; {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  )
}
