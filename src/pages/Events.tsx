import { useState, useEffect, type FormEvent } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import SubscribeForm from "../components/SubscribeForm"
import LoginPrompt from "../components/LoginModal"

import { events, formatContentDate, type CommunityEvent, type EventCategory } from "../lib/content"

type EventFilter = "All Events" | EventCategory
type EventView = "grid" | "calendar"
const categories: EventFilter[] = [
  "All Events",
  "Social",
  "Educational",
  "Spiritual",
  "Sports",
];

const categoryColors: Record<EventCategory, string> = {
  Educational: "bg-secondary-container text-on-secondary-container",
  Social: "bg-primary-fixed text-on-primary-fixed-variant",
  Sports: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  Spiritual: "bg-secondary text-on-secondary",
};

const dotColors: Record<EventCategory, string> = {
  Educational: "bg-secondary-container",
  Social: "bg-primary-fixed",
  Sports: "bg-tertiary-fixed",
  Spiritual: "bg-secondary",
};

export default function Events() {
  const { user, addRsvp, rsvps } = useAuth()
  const { pathname } = useLocation()
  const [activeCategory, setActiveCategory] = useState<EventFilter>("All Events");
  const [view, setView] = useState<EventView>("grid");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [rsvpEvent, setRsvpEvent] = useState<CommunityEvent | null>(null);
  const [rsvpName, setRsvpName] = useState(user?.name || '');
  const [rsvpEmail, setRsvpEmail] = useState(user?.email || '');
  const [rsvpPhone, setRsvpPhone] = useState(user?.phone || '');
  const [rsvpMessage, setRsvpMessage] = useState('');

  useEffect(() => {
    return () => { document.body.style.overflow = '' }
  }, [])

  const openRsvp = (event: CommunityEvent) => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }
    setRsvpEvent(event)
    setRsvpName(user.name || '')
    setRsvpEmail(user.email || '')
    setRsvpPhone(user.phone || '')
    setRsvpMessage('')
    document.body.style.overflow = 'hidden'
  }

  const closeRsvp = () => {
    setRsvpEvent(null)
    document.body.style.overflow = ''
  }

  const handleRsvpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!rsvpEvent) return
    addRsvp({
      id: rsvpEvent.id,
      title: rsvpEvent.title,
      date: rsvpEvent.date,
      time: rsvpEvent.time,
      location: rsvpEvent.location,
      name: rsvpName,
      email: rsvpEmail,
      phone: rsvpPhone,
    })
    closeRsvp()
    setRsvpMessage('You are registered! Check your profile for details.')
    setTimeout(() => setRsvpMessage(''), 3000)
  }

  const isRsvped = (eventId: string) => rsvps.some((e) => e.id === eventId)

  const filtered =
    activeCategory === "All Events"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <main className="pt-16">
      {/* Hero */}
      <header className="relative pt-32 pb-16 overflow-hidden px-gutter bg-primary-container">
        <div className="absolute inset-0 geometric-pattern" />
        <div className="relative z-10 mx-auto text-center max-w-container-max">
          <h1 className="mb-4 font-display-lg text-display-lg text-on-primary">
            Upcoming Events & Workshops
          </h1>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-primary-container/90 mb-lg">
            Discover opportunities to learn, connect, and grow. Join our vibrant
            community in activities designed for the next generation.
          </p>
          <div className="flex flex-col items-center justify-between border md:flex-row gap-md bg-surface/10 backdrop-blur-md p-md rounded-xl border-white/10">
            <div className="flex-wrap items-center hidden md:flex gap-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    activeCategory === cat
                      ? "bg-secondary text-on-secondary font-button text-button px-5 py-2 rounded-full shadow-lg"
                      : "bg-white/10 text-on-primary hover:bg-white/20 font-button text-button px-5 py-2 rounded-full transition-all"
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as EventFilter)}
              className="w-full px-4 py-2 border rounded-lg outline-none md:hidden bg-surface/20 text-on-primary border-white/20 font-button text-button focus:ring-2 focus:ring-secondary"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="text-on-surface bg-surface"
                >
                  {cat}
                </option>
              ))}
            </select>
            <div className="flex items-center p-1 rounded-lg bg-white/20">
              <button
                onClick={() => setView("grid")}
                className={
                  view === "grid"
                    ? "bg-white text-primary p-2 rounded shadow-sm flex items-center gap-2"
                    : "text-on-primary p-2 rounded hover:bg-white/10 flex items-center gap-2"
                }
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 20 }}
                >
                  grid_view
                </span>
                <span className="font-label-md text-label-md">Grid</span>
              </button>
              <button
                onClick={() => setView("calendar")}
                className={
                  view === "calendar"
                    ? "bg-white text-primary p-2 rounded shadow-sm flex items-center gap-2"
                    : "text-on-primary p-2 rounded hover:bg-white/10 flex items-center gap-2"
                }
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 20 }}
                >
                  timeline
                </span>
                <span className="font-label-md text-label-md">Timeline</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Grid View */}
      {view === "grid" && (
        <div
          className="mx-auto py-xl px-gutter max-w-container-max"
          id="event-grid"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {filtered.map((event) => (
              <div
                key={event.title}
                className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    alt={event.title}
                    src={event.img}
                  />
                  <div
                    className={`absolute top-4 left-4 ${categoryColors[event.category]} px-3 py-1 rounded-full font-label-md text-label-md`}
                  >
                    {event.category}
                  </div>
                </div>
                <div className="p-md">
                  <div className="flex items-center gap-2 mb-2 text-primary font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[18px]">
                      calendar_today
                    </span>
                    <span>{formatContentDate(event.date)}</span>
                    <span className="mx-1 text-outline">&bull;</span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="mb-3 font-headline-sm text-headline-sm text-on-surface">
                    {event.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
                    {event.desc}
                  </p>
                  <div className="flex items-center gap-2 text-on-surface-variant font-body-sm mb-lg">
                    <span className="material-symbols-outlined text-[18px]">
                      location_on
                    </span>
                    <span>{event.location}</span>
                  </div>
                  <button onClick={() => openRsvp(event)} className="w-full py-3 transition-all rounded-lg font-button text-button bg-primary text-on-primary hover:bg-primary-container">
                    {isRsvped(event.id) ? 'Registered ✓' : 'Register Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline View */}
      {view === "calendar" && (
        <div className="mx-auto py-xl px-gutter max-w-container-max">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-xl">
            Event Timeline
          </h2>
          {filtered.length === 0 ? (
            <p className="text-center text-on-surface-variant py-xl">
              No events match this category.
            </p>
          ) : (
            <div className="relative">
              <div className="absolute left-4.75 top-0 bottom-0 w-0.5 bg-outline-variant" />
              <div className="space-y-lg">
                {filtered.map((event) => (
                  <div key={event.title} className="relative pl-14">
                    <div
                      className={`absolute left-3 top-6 w-3.5 h-3.5 rounded-full border-4 border-surface ${dotColors[event.category]} ring-2 ring-outline-variant`}
                    />
                    <div className="transition-all duration-300 bg-white border shadow-sm rounded-xl border-outline-variant p-md hover:shadow-lg">
                      <div className="flex flex-col md:flex-row gap-md">
                        <div className="md:w-1/4">
                          <div
                            className={`inline-block px-3 py-1 rounded-full font-label-md text-label-md mb-2 ${categoryColors[event.category]}`}
                          >
                            {event.category}
                          </div>
                          <div className="flex items-center gap-2 text-primary font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[18px]">
                              calendar_today
                            </span>
                            <span>{formatContentDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-primary font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[18px]">
                              schedule
                            </span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="mb-2 font-headline-sm text-headline-sm text-on-surface">
                            {event.title}
                          </h3>
                          <p className="mb-3 font-body-sm text-body-sm text-on-surface-variant">
                            {event.desc}
                          </p>
                          <div className="flex items-center gap-2 mb-4 text-on-surface-variant font-body-sm">
                            <span className="material-symbols-outlined text-[18px]">
                              location_on
                            </span>
                            <span>{event.location}</span>
                          </div>
                          <button onClick={() => openRsvp(event)} className="px-6 py-2 transition-all rounded-lg font-button text-button bg-primary text-on-primary hover:bg-primary-container">
                            {isRsvped(event.id) ? 'Registered ✓' : 'Register Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <section className="bg-surface-container py-xl">
        <div className="mx-auto text-center max-w-container-max px-gutter">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-md">
            Don't miss out on our community updates.
          </h2>
          <div className="mx-auto max-w-128">
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-gutter" onClick={closeRsvp}>
          <div className="bg-surface-container-lowest rounded-xl p-lg max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-md">
              <h2 className="font-headline-md text-headline-md text-primary">Register for Event</h2>
              <button onClick={closeRsvp} className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">close</span></button>
            </div>
            <p className="font-headline-sm text-headline-sm text-primary mb-sm">{rsvpEvent.title}</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">{formatContentDate(rsvpEvent.date)} &middot; {rsvpEvent.time} &middot; {rsvpEvent.location}</p>
            <form onSubmit={handleRsvpSubmit} className="space-y-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">Full Name</label>
                <input type="text" value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} className="w-full px-4 py-3 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none" required />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">Email</label>
                <input type="email" value={rsvpEmail} onChange={(e) => setRsvpEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none" required />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">Phone</label>
                <input type="tel" value={rsvpPhone} onChange={(e) => setRsvpPhone(e.target.value)} className="w-full px-4 py-3 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none" />
              </div>
              <button type="submit" className="w-full py-3 transition-all rounded-lg bg-primary text-on-primary font-button text-button hover:opacity-90">Confirm Registration</button>
            </form>
          </div>
        </div>
      )}

      {rsvpMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary-container px-lg py-md rounded-lg shadow-lg font-body-md animate-[fadeIn_0.3s_ease-in-out]">
          {rsvpMessage}
        </div>
      )}

      <LoginPrompt
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        from={pathname}
        title="Log in to register"
        description="Please log in to register for this event. Your RSVP'd events will appear in your profile."
        icon="event"
      />
    </main>
  );
}
