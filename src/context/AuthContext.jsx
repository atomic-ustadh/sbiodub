import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext(null)

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => load('sbio_session', null))
  const [users, setUsers] = useState(() => load('sbio_users', []))
  const [bookmarks, setBookmarks] = useState(() => load('sbio_bookmarks', {}))
  const [rsvps, setRsvps] = useState(() => load('sbio_rsvps', {}))
  const [donations, setDonations] = useState(() => load('sbio_donations', {}))
  const [cards, setCards] = useState(() => load('sbio_cards', {}))

  useEffect(() => { save('sbio_session', user) }, [user])
  useEffect(() => { save('sbio_users', users) }, [users])
  useEffect(() => { save('sbio_bookmarks', bookmarks) }, [bookmarks])
  useEffect(() => { save('sbio_rsvps', rsvps) }, [rsvps])
  useEffect(() => { save('sbio_donations', donations) }, [donations])
  useEffect(() => { save('sbio_cards', cards) }, [cards])

  const signup = useCallback(({ name, email, password, phone, interests }) => {
    if (users.find((u) => u.email === email)) {
      return { ok: false, error: 'Email already registered' }
    }
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      phone: phone || '',
      interests: interests || [],
    }
    setUsers((prev) => [...prev, newUser])
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email })
    return { ok: true }
  }, [users])

  const login = useCallback((email, password) => {
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return { ok: false, error: 'Invalid email or password' }
    setUser({ id: found.id, name: found.name, email: found.email })
    return { ok: true }
  }, [users])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateProfile = useCallback((updates) => {
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, ...updates } : u))
    setUser((prev) => ({ ...prev, ...updates }))
  }, [user])

  const toggleBookmark = useCallback((slug) => {
    if (!user) return
    setBookmarks((prev) => {
      const list = prev[user.id] || []
      const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]
      return { ...prev, [user.id]: next }
    })
  }, [user])

  const isBookmarked = useCallback((slug) => {
    if (!user) return false
    return (bookmarks[user.id] || []).includes(slug)
  }, [user, bookmarks])

  const addRsvp = useCallback((eventData) => {
    if (!user) return
    setRsvps((prev) => {
      const list = prev[user.id] || []
      if (list.find((e) => e.id === eventData.id)) return prev
      return { ...prev, [user.id]: [...list, { ...eventData, rsvpedAt: new Date().toISOString() }] }
    })
  }, [user])

  const cancelRsvp = useCallback((eventId) => {
    if (!user) return
    setRsvps((prev) => {
      const list = (prev[user.id] || []).filter((e) => e.id !== eventId)
      return { ...prev, [user.id]: list }
    })
  }, [user])

  const addDonation = useCallback((donation) => {
    if (!user) return
    setDonations((prev) => {
      const list = prev[user.id] || []
      return { ...prev, [user.id]: [...list, { id: crypto.randomUUID(), ...donation, date: new Date().toISOString() }] }
    })
  }, [user])

  const addCard = useCallback((card) => {
    if (!user) return
    setCards((prev) => {
      const list = prev[user.id] || []
      return { ...prev, [user.id]: [...list, { id: crypto.randomUUID(), ...card }] }
    })
  }, [user])

  const removeCard = useCallback((cardId) => {
    if (!user) return
    setCards((prev) => {
      const list = (prev[user.id] || []).filter((c) => c.id !== cardId)
      return { ...prev, [user.id]: list }
    })
  }, [user])

  return (
    <AuthContext.Provider value={{
      user, users, signup, login, logout, updateProfile,
      bookmarks: user ? (bookmarks[user.id] || []) : [],
      toggleBookmark, isBookmarked,
      rsvps: user ? (rsvps[user.id] || []) : [],
      addRsvp, cancelRsvp,
      donations: user ? (donations[user.id] || []) : [],
      addDonation,
      cards: user ? (cards[user.id] || []) : [],
      addCard, removeCard,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
