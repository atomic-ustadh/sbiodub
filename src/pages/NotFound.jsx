import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const styles = `
  .geometric-pattern {
    background-image: url("https://www.transparenttextures.com/patterns/islamic-art.png");
    opacity: 0.04;
  }
  .hero-gradient {
    background: radial-gradient(circle at center, rgba(149, 211, 186, 0.15) 0%, rgba(248, 249, 255, 0) 70%);
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
  }
`

export default function NotFound() {
  const floatingRef = useRef(null)

  useEffect(() => {
    const el = floatingRef.current
    if (!el) return

    const onMouseMove = (e) => {
      if (window.innerWidth < 768) return
      const x = (window.innerWidth / 2 - e.pageX) / 40
      const y = (window.innerHeight / 2 - e.pageY) / 40
      el.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      <style>{styles}</style>
      <main className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden md:px-gutter bg-background text-on-background font-body-md selection:bg-secondary-container">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          alt="Serene spiritual path illustration"
          className="object-cover object-center w-full h-full opacity-30 md:opacity-70"
          src="../public/404bg.png"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none geometric-pattern opacity-20" />
      <div className="absolute inset-0 pointer-events-none hero-gradient opacity-20" />
      <div className="relative z-10 w-full max-w-2xl p-6 text-center animate-fade-in backdrop-blur-sm md:backdrop-blur-none bg-white/10 md:bg-transparent md:p-0 rounded-2xl">
        <div className="mb-sm md:mb-md">
          <span
            ref={floatingRef}
            className="inline-block text-8xl md:text-[180px] leading-none text-secondary-fixed-dim drop-shadow-sm select-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              transition: 'transform 0.1s ease-out',
            }}
          >
            404
          </span>
        </div>
        <h1 className="px-2 mb-4 text-3xl leading-tight font-headline-md md:text-5xl lg:text-6xl text-primary md:mb-sm">
          Even the best paths have a detour.
        </h1>
        <p className="px-4 mx-auto mb-8 text-base font-body-lg md:text-body-lg text-on-surface-variant md:mb-lg">
          It looks like the page you are looking for has moved or no longer exists. Let us help you find your way back.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 px-4 sm:flex-row md:gap-md mb-xl">
          <Link
            to="/"
            className="flex items-center justify-center w-full gap-2 px-10 py-4 transition-all rounded-lg shadow-md sm:w-auto bg-primary text-on-primary font-button text-button hover:bg-primary-container active:scale-95"
          >
            <span className="material-symbols-outlined">home</span>
            Back to Home
          </Link>
          <Link
            to="/events"
            className="flex items-center justify-center w-full gap-2 px-10 py-4 transition-all border-2 rounded-lg sm:w-auto border-primary text-primary font-button text-button hover:bg-primary/5 active:scale-95"
          >
            <span className="material-symbols-outlined">event</span>
            View Events
          </Link>
        </div>
        <div className="w-16 h-px mx-auto bg-outline-variant/30" />
      </div>
    </main>
    </>
  )
}
