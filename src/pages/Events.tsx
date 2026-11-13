import { useState, useEffect, type SubmitEvent } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import SubscribeForm from "../components/SubscribeForm"
import LoginPrompt from "../components/LoginModal"

import { events, formatContentDate, getTodayIsoDate, type CommunityEvent, type EventCategory } from "../lib/content"

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

  const handleRsvpSubmit = (e: SubmitEvent<HTMLFormElement>) => {
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

  const today = getTodayIsoDate();
  const upcoming = filtered.filter((event) => event.date >= today);
  const past = filtered
    .filter((event) => event.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderGridEvents = (items: CommunityEvent[], isPast: boolean) => (
    <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
      {items.map((event) => (
        <div
          key={event.id}
          className="card card-hover group flex flex-col overflow-hidden"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={event.title}
              src={event.img}
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/50 via-transparent to-transparent" />
            <div
              className={`chip absolute left-4 top-4 shadow-sm ${categoryColors[event.category]}`}
            >
              {event.category}
            </div>
          </div>
          <div className="flex grow flex-col p-lg">
            <div className="mb-2 flex items-center gap-2 font-label-md text-label-md text-secondary">
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
              <span>{formatContentDate(event.date)}</span>
              <span className="mx-1 text-outline">&bull;</span>
              <span>{event.time}</span>
            </div>
            <h3 className="mb-3 font-headline-sm text-headline-sm text-primary">
              {event.title}
            </h3>
            <p className="mb-md font-body-sm text-body-sm text-on-surface-variant">
              {event.desc}
            </p>
            <div className="mb-lg flex items-center gap-2 font-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">
                location_on
              </span>
              <span>{event.location}</span>
            </div>
            {isPast ? (
              <button disabled className="btn mt-auto w-full cursor-not-allowed bg-surface-container-high py-3 text-on-surface-variant">
                Event ended
              </button>
            ) : (
              <button onClick={() => openRsvp(event)} className="btn btn-primary mt-auto w-full py-3">
                {isRsvped(event.id) ? 'Registered ✓' : 'Register Now'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimelineEvents = (items: CommunityEvent[], isPast: boolean) => (
    <div className="relative">
      <div className="absolute bottom-0 left-4.75 top-0 w-0.5 bg-secondary/20" />
      <div className="space-y-lg">
        {items.map((event) => (
          <div key={event.id} className="relative pl-14">
            <div
              className={`absolute left-3 top-6 h-3.5 w-3.5 rounded-full border-4 border-surface ${dotColors[event.category]} ring-2 ring-secondary/30`}
            />
            <div className="card card-hover p-md">
              <div className="flex flex-col gap-md md:flex-row">
                <div className="md:w-1/4">
                  <div
                    className={`chip mb-2 ${categoryColors[event.category]}`}
                  >
                    {event.category}
                  </div>
                  <div className="flex items-center gap-2 font-label-md text-label-md text-secondary">
                    <span className="material-symbols-outlined text-[18px]">
                      calendar_today
                    </span>
                    <span>{formatContentDate(event.date)}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 font-label-md text-label-md text-secondary">
                    <span className="material-symbols-outlined text-[18px]">
                      schedule
                    </span>
                    <span>{event.time}</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="mb-2 font-headline-sm text-headline-sm text-primary">
                    {event.title}
                  </h3>
                  <p className="mb-3 font-body-sm text-body-sm text-on-surface-variant">
                    {event.desc}
                  </p>
                  <div className="mb-4 flex items-center gap-2 font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">
                      location_on
                    </span>
                    <span>{event.location}</span>
                  </div>
                  {isPast ? (
                    <span className="btn inline-block cursor-not-allowed bg-surface-container px-6 py-2 text-on-surface-variant">
                      Event ended
                    </span>
                  ) : (
                    <button onClick={() => openRsvp(event)} className="btn btn-primary px-6 py-2">
                      {isRsvped(event.id) ? 'Registered ✓' : 'Register Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="pt-18">
      {/* Hero */}
      <header className="relative overflow-hidden bg-primary px-gutter pb-14 pt-28">
        <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-container-max text-center">
          <h1 className="mb-4 font-display-lg text-display-lg-mobile text-secondary-fixed md:text-display-lg">
            Events & Workshops
          </h1>
          <p className="mx-auto mb-lg max-w-2xl font-body-lg text-body-lg text-on-primary/70">
            Discover opportunities to learn, connect, and grow. Join our vibrant
            community in activities designed for the next generation.
          </p>
          <div className="glass-dark mx-auto flex flex-col items-center justify-between gap-md rounded-2xl p-sm md:flex-row">
            <div className="hidden flex-wrap items-center gap-xs md:flex">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    activeCategory === cat
                      ? "rounded-full bg-secondary-container px-5 py-2 font-button text-button text-on-secondary-container shadow-gold"
                      : "rounded-full px-5 py-2 font-button text-button text-on-primary/75 transition-all hover:bg-white/10 hover:text-on-primary"
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as EventFilter)}
              className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-button text-button text-on-primary outline-none md:hidden focus:border-secondary-fixed/60"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-surface text-on-surface"
                >
                  {cat}
                </option>
              ))}
            </select>
            <div className="flex items-center rounded-full bg-white/10 p-1">
              <button
                onClick={() => setView("grid")}
                className={
                  view === "grid"
                    ? "flex items-center gap-2 rounded-full bg-surface-container-lowest px-3 py-2 text-primary shadow-sm"
                    : "flex items-center gap-2 rounded-full px-3 py-2 text-on-primary/70 transition-colors hover:text-on-primary"
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
                    ? "flex items-center gap-2 rounded-full bg-surface-container-lowest px-3 py-2 text-primary shadow-sm"
                    : "flex items-center gap-2 rounded-full px-3 py-2 text-on-primary/70 transition-colors hover:text-on-primary"
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
          className="mx-auto max-w-container-max px-gutter py-xl"
          id="event-grid"
        >
          {filtered.length === 0 ? (
            <p className="py-xl text-center text-on-surface-variant">
              No events match this category.
            </p>
          ) : (
            <>
              <section>
                <div className="mb-lg">
                  <h2 className="section-heading">Upcoming Events</h2>
                  <p className="mt-xs text-on-surface-variant">
                    Events that have not happened yet.
                  </p>
                </div>
                {upcoming.length === 0 ? (
                  <p className="py-lg text-center text-on-surface-variant">
                    No upcoming events match this filter.
                  </p>
                ) : (
                  renderGridEvents(upcoming, false)
                )}
              </section>

              {past.length > 0 && (
                <section className="mt-xl border-t border-outline-variant pt-xl">
                  <div className="mb-lg">
                    <h2 className="section-heading">Past Events</h2>
                    <p className="mt-xs text-on-surface-variant">
                      Events that have already taken place.
                    </p>
                  </div>
                  {renderGridEvents(past, true)}
                </section>
              )}
            </>
          )}
        </div>
      )}

      {/* Timeline View */}
      {view === "calendar" && (
        <div className="mx-auto max-w-container-max px-gutter py-xl">
          <h2 className="section-heading mb-xl">Event Timeline</h2>
          {filtered.length === 0 ? (
            <p className="py-xl text-center text-on-surface-variant">
              No events match this category.
            </p>
          ) : (
            <div className="space-y-xl">
              <section>
                <h3 className="mb-lg font-headline-sm text-headline-sm text-primary">
                  Upcoming Events
                </h3>
                {upcoming.length === 0 ? (
                  <p className="py-lg text-center text-on-surface-variant">
                    No upcoming events match this filter.
                  </p>
                ) : (
                  renderTimelineEvents(upcoming, false)
                )}
              </section>

              {past.length > 0 && (
                <section className="border-t border-outline-variant pt-xl">
                  <h3 className="mb-lg font-headline-sm text-headline-sm text-primary">
                    Past Events
                  </h3>
                  {renderTimelineEvents(past, true)}
                </section>
              )}
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <section className="bg-surface-container-low py-xl">
        <div className="mx-auto max-w-container-max px-gutter text-center">
          <h2 className="mb-md font-headline-md text-headline-md text-primary">
            Don't miss out on our community updates.
          </h2>
          <div className="mx-auto max-w-128">
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-gutter backdrop-blur-sm" onClick={closeRsvp}>
          <div className="max-h-[90vh] overflow-y-auto rounded-3xl border border-outline-variant/80 bg-surface-container-lowest p-lg shadow-float" onClick={(e) => e.stopPropagation()}>
            <div className="mb-md flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-primary">Register for Event</h2>
              <button onClick={closeRsvp} className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"><span className="material-symbols-outlined">close</span></button>
            </div>
            <p className="mb-sm font-headline-sm text-headline-sm text-primary">{rsvpEvent.title}</p>
            <p className="mb-lg font-body-sm text-body-sm text-on-surface-variant">{formatContentDate(rsvpEvent.date)} &middot; {rsvpEvent.time} &middot; {rsvpEvent.location}</p>
            <form onSubmit={handleRsvpSubmit} className="space-y-md">
              <div>
                <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">Full Name</label>
                <input type="text" value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} className="field" required />
              </div>
              <div>
                <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">Email</label>
                <input type="email" value={rsvpEmail} onChange={(e) => setRsvpEmail(e.target.value)} className="field" required />
              </div>
              <div>
                <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">Phone</label>
                <input type="tel" value={rsvpPhone} onChange={(e) => setRsvpPhone(e.target.value)} className="field" />
              </div>
              <button type="submit" className="btn btn-primary w-full py-3">Confirm Registration</button>
            </form>
          </div>
        </div>
      )}

      {rsvpMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-primary px-lg py-md font-body-md text-on-primary shadow-float animate-[fadeIn_0.3s_ease-in-out]">
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
