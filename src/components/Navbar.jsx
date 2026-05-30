import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", key: "home", to: "/" },
  { label: "About", key: "about", to: "/about" },
  { label: "Events", key: "events", to: "/events" },
  { label: "Resources", key: "resources", to: "/resources" },
  { label: "Membership", key: "membership", to: "/join" },
];

export default function Navbar({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
        <Link
          to="/"
          className="font-headline-sm text-headline-sm text-primary font-bold"
          onClick={() => setMenuOpen(false)}
        >
          Noor Youth
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, key, to }) => (
            <Link
              key={key}
              to={to}
              className={
                active === key
                  ? "font-body-md text-body-md text-primary border-b-2 border-secondary font-bold pb-1"
                  : "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
              }
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-sm">
          <Link
            to="/donate"
            className="hidden md:block font-button text-button text-primary px-md py-sm hover:text-secondary-fixed-dim transition-all duration-300"
          >
            Donate
          </Link>
          <Link
            to="/login"
            className="bg-primary text-on-primary font-button text-xs md:text-button px-sm md:px-md py-sm rounded-lg scale-95 active:scale-90 transition-transform"
          >
            Login
          </Link>
          <button
            className="md:hidden p-2 text-on-surface-variant"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-outline-variant">
          {links.map(({ label, key, to }) => (
            <Link
              key={key}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={
                "block px-gutter py-4 font-body-md text-body-md " +
                (active === key
                  ? "text-primary border-l-4 border-secondary font-bold bg-primary-fixed/10"
                  : "text-on-surface-variant hover:text-primary transition-colors")
              }
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
