import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  phone: string
}

export interface StoredUser extends User {
  password: string
}

export interface SignupInput {
  name: string
  email: string
  password: string
  phone?: string
}

export type ProfileUpdates = Partial<Pick<User, 'name' | 'email' | 'phone'>>

export interface RsvpInput {
  id: string
  title: string
  date: string
  time: string
  location: string
  name: string
  email: string
  phone: string
}

export interface Rsvp extends RsvpInput {
  rsvpedAt: string
}

export interface DonationInput {
  amount: number
  type: string
  allocation: string
}

export interface Donation extends DonationInput {
  id: string
  date: string
}

export type AuthResult = { ok: true } | { ok: false; error: string }

interface AuthContextValue {
  user: User | null
  users: StoredUser[]
  signup: (input: SignupInput) => AuthResult
  login: (email: string, password: string) => AuthResult
  logout: () => void
  updateProfile: (updates: ProfileUpdates) => void
  rsvps: Rsvp[]
  addRsvp: (event: RsvpInput) => void
  cancelRsvp: (eventId: string) => void
  donations: Donation[]
  addDonation: (donation: DonationInput) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_PREFIX = 'lca_'
const LEGACY_STORAGE_PREFIX = 'sbio_'

function load<T>(key: string, fallback: T): T {
  try {
    const currentKey = `${STORAGE_PREFIX}${key}`
    const legacyKey = `${LEGACY_STORAGE_PREFIX}${key}`
    let raw = localStorage.getItem(currentKey)
    if (raw === null) {
      raw = localStorage.getItem(legacyKey)
      if (raw !== null) {
        localStorage.setItem(currentKey, raw)
        localStorage.removeItem(legacyKey)
      }
    }
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load('session', null))
  const [users, setUsers] = useState<StoredUser[]>(() => load('users', []))
  const [rsvps, setRsvps] = useState<Record<string, Rsvp[]>>(() => load('rsvps', {}))
  const [donations, setDonations] = useState<Record<string, Donation[]>>(() => load('donations', {}))

  useEffect(() => { save('session', user) }, [user])
  useEffect(() => { save('users', users) }, [users])
  useEffect(() => { save('rsvps', rsvps) }, [rsvps])
  useEffect(() => { save('donations', donations) }, [donations])
  useEffect(() => {
    localStorage.removeItem('lca_cards')
    localStorage.removeItem('sbio_cards')
  }, [])

  const signup = useCallback(({ name, email, password, phone }: SignupInput): AuthResult => {
    if (users.find((u) => u.email === email)) {
      return { ok: false, error: 'Email already registered' }
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      phone: phone || '',
    }
    setUsers((prev) => [...prev, newUser])
    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    })
    return { ok: true }
  }, [users])

  const login = useCallback((email: string, password: string): AuthResult => {
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return { ok: false, error: 'Invalid email or password' }
    setUser({
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
    })
    return { ok: true }
  }, [users])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateProfile = useCallback((updates: ProfileUpdates) => {
    if (!user) return
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, ...updates } : u))
    setUser((prev) => prev ? { ...prev, ...updates } : prev)
  }, [user])

  const addRsvp = useCallback((eventData: RsvpInput) => {
    if (!user) return
    setRsvps((prev) => {
      const list = prev[user.id] || []
      if (list.find((e) => e.id === eventData.id)) return prev
      return { ...prev, [user.id]: [...list, { ...eventData, rsvpedAt: new Date().toISOString() }] }
    })
  }, [user])

  const cancelRsvp = useCallback((eventId: string) => {
    if (!user) return
    setRsvps((prev) => {
      const list = (prev[user.id] || []).filter((e) => e.id !== eventId)
      return { ...prev, [user.id]: list }
    })
  }, [user])

  const addDonation = useCallback((donation: DonationInput) => {
    if (!user) return
    setDonations((prev) => {
      const list = prev[user.id] || []
      return { ...prev, [user.id]: [...list, { id: crypto.randomUUID(), ...donation, date: new Date().toISOString() }] }
    })
  }, [user])

  return (
    <AuthContext.Provider value={{
      user, users, signup, login, logout, updateProfile,
      rsvps: user ? (rsvps[user.id] || []) : [],
      addRsvp, cancelRsvp,
      donations: user ? (donations[user.id] || []) : [],
      addDonation,
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
