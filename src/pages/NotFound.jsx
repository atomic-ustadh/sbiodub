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
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-gutter overflow-hidden bg-background text-on-background font-body-md selection:bg-secondary-container">
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          alt="Serene spiritual path illustration"
          className="w-full h-full object-cover object-center opacity-30 md:opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPowqeB3YHGJUApslmmYQELepponieDnbDnbNl1oeoMF3v0DQc1w91fi6fkZBBq5-i4dEIZOX16Zp8rzq63HiobuC1nr1s1iagqUd5ORvn1woH6zkn11d1GEwpNrInSO_tR82BuOLpPFQzC8vP5cKW8CnXU3y4vMYHvVsbUBchmb1VX_5fIiuuL1FalQvtbA396xJN2UVpHfyFsvO-bQk13E6F6_TYuseq_y_NBUumu7RmIGmJy3Mv3L84U0ORBY0SL4zaRfnPA5Y-"
        />
      </div>
      <div className="absolute inset-0 geometric-pattern pointer-events-none opacity-20" />
      <div className="absolute inset-0 hero-gradient pointer-events-none opacity-20" />
      <div className="relative z-10 text-center w-full max-w-2xl animate-fade-in backdrop-blur-sm md:backdrop-blur-none bg-white/10 md:bg-transparent p-6 md:p-0 rounded-2xl">
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
        <h1 className="font-headline-md text-3xl md:text-5xl lg:text-6xl text-primary mb-4 md:mb-sm leading-tight px-2">
          Even the best paths have a detour.
        </h1>
        <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant mb-8 md:mb-lg  mx-auto px-4">
          It looks like the page you are looking for has moved or no longer exists. Let us help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-md justify-center items-center mb-xl px-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-10 py-4 bg-primary text-on-primary font-button text-button rounded-lg shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="material-symbols-outlined">home</span>
            Back to Home
          </Link>
          <Link
            to="/events"
            className="w-full sm:w-auto px-10 py-4 border-2 border-primary text-primary font-button text-button rounded-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="material-symbols-outlined">event</span>
            View Events
          </Link>
        </div>
        <div className="w-16 h-px bg-outline-variant/30 mx-auto" />
      </div>
    </main>
    </>
  )
}
