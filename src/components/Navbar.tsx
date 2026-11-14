import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Resources", to: "/resources" },
  { label: "Get Involved", to: "/get-involved" },
];

const mobileLinks = [...links, { label: "Donate", to: "/donate" }];

export default function Navbar() {
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/70 bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 max-w-container-max items-center justify-between gap-md px-gutter">
        <Link
          to="/"
          className="group flex items-center gap-sm py-4 font-headline-sm text-headline-sm font-semibold text-primary"
          onClick={() => setMenuOpen(false)}
        >
          <span className="hidden h-8 w-1 rounded-full bg-linear-to-b from-secondary to-secondary-fixed sm:block" />
          <span className="leading-tight transition-colors group-hover:text-primary-container">
            Leadership Course, Abuja
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                [
                  "relative rounded-full px-4 py-2 font-body-sm text-body-sm transition-colors duration-300",
                  isActive
                    ? "font-semibold text-primary after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-5 after:-translate-x-1/2 after:bg-secondary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-xs sm:gap-sm">
          <Link
            to="/donate"
            className="hidden rounded-full px-3 py-2 font-button text-button text-primary transition-colors hover:text-secondary md:block"
          >
            Donate
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="btn btn-primary px-4 py-2 text-xs sm:text-button"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary px-4 py-2 text-xs sm:text-button"
            >
              Login
            </Link>
          )}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-outline-variant/70 bg-surface/95 px-gutter pb-md pt-sm backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-container-max flex-col gap-xs">
            {mobileLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  "flex items-center justify-between rounded-xl px-4 py-3 font-body-md text-body-md transition-colors " +
                  (isActive
                    ? "bg-primary-fixed/60 font-semibold text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary")
                }
              >
                {label}
                <span className="material-symbols-outlined text-[18px] opacity-50">
                  arrow_forward
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
