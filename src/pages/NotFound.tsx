import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const floatingRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = floatingRef.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      const x = (window.innerWidth / 2 - e.pageX) / 40
      const y = (window.innerHeight / 2 - e.pageY) / 40
      el.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-4 font-body-md text-on-background md:px-gutter">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt="Serene spiritual path illustration"
          className="h-full w-full object-cover object-center opacity-20"
          src="../404bg.png"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-primary/70 via-primary/85 to-primary" />
      <div className="absolute inset-0 pointer-events-none geometric-pattern opacity-[0.08]" />
      <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl animate-[fadeIn_0.8s_ease-out] rounded-3xl p-6 text-center backdrop-blur-sm md:bg-transparent md:p-0">
        <div className="mb-sm md:mb-md">
          <span
            ref={floatingRef}
            className="inline-block select-none text-8xl leading-none text-secondary-fixed drop-shadow-sm transition-transform duration-100 ease-out md:text-[180px]"
            style={{ fontFamily: "'Fraunces', 'Playfair Display', serif" }}
          >
            404
          </span>
        </div>
        <h1 className="mb-4 px-2 text-3xl leading-tight font-headline-md text-on-primary md:mb-sm md:text-5xl lg:text-6xl">
          Even the best paths have a detour.
        </h1>
        <p className="mx-auto mb-8 max-w-144 px-4 font-body-lg text-body-lg text-on-primary/70 md:mb-lg">
          It looks like the page you are looking for has moved or no longer exists. Let us help you find your way back.
        </p>
        <div className="mb-xl flex flex-col items-center justify-center gap-4 px-4 sm:flex-row md:gap-md">
          <Link
            to="/"
            className="btn btn-gold w-full justify-center sm:w-auto"
          >
            <span className="material-symbols-outlined">home</span>
            Back to Home
          </Link>
          <Link
            to="/events"
            className="btn w-full justify-center border border-white/25 px-10 py-4 text-on-primary hover:border-secondary-fixed/60 hover:bg-white/10 sm:w-auto"
          >
            <span className="material-symbols-outlined">event</span>
            View Events
          </Link>
        </div>
        <div className="mx-auto h-px w-16 bg-secondary-fixed/30" />
      </div>
    </main>
  )
}
