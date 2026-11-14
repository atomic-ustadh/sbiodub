import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useAuth as useClerkAuth, useUser } from '@clerk/react'
import { neonRequest } from '../lib/neon'

export interface User {
  id: string
  name: string
  email: string
  phone: string
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

export interface Donation {
  amount: number
  type: string
  allocation: string
  id: string
  date: string
  reference?: string | null
  status?: string | null
  channel?: string | null
}

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  logout: () => void
  updateProfile: (updates: ProfileUpdates) => void
  rsvps: Rsvp[]
  addRsvp: (input: RsvpInput) => void
  cancelRsvp: (eventId: string) => void
  donations: Donation[]
  dataError: string | null
  refreshDonations: () => Promise<void>
}

interface RsvpRow {
  event_id: string
  title: string
  event_date: string
  time: string
  location: string
  name: string
  email: string
  phone: string
  rsvped_at: string
}

interface DonationRow {
  id: string
  amount: number | string
  type: string
  allocation: string
  created_at: string
  reference?: string | null
  status?: string | null
  channel?: string | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

function toRsvp(row: RsvpRow): Rsvp {
  return {
    id: row.event_id,
    title: row.title,
    date: row.event_date,
    time: row.time,
    location: row.location,
    name: row.name,
    email: row.email,
    phone: row.phone,
    rsvpedAt: row.rsvped_at,
  }
}

function toDonation(row: DonationRow): Donation {
  return {
    id: row.id,
    amount: Number(row.amount),
    type: row.type,
    allocation: row.allocation,
    date: row.created_at,
    reference: row.reference ?? null,
    status: row.status ?? null,
    channel: row.channel ?? null,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, getToken, signOut } = useClerkAuth()
  const { user: clerkUser } = useUser()
  const [rsvps, setRsvps] = useState<Rsvp[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [dataError, setDataError] = useState<string | null>(null)

  const user = useMemo<User | null>(() => {
    if (!clerkUser) return null
    const email = clerkUser.primaryEmailAddress?.emailAddress ?? ''
    const metadataPhone = clerkUser.unsafeMetadata?.phone
    return {
      id: clerkUser.id,
      name: clerkUser.fullName || clerkUser.username || email.split('@')[0] || '',
      email,
      phone:
        clerkUser.primaryPhoneNumber?.phoneNumber ??
        (typeof metadataPhone === 'string' ? metadataPhone : ''),
    }
  }, [clerkUser])

  const authFetch = useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      const token = await getToken({ template: 'neon' })
      if (!token) throw new Error('Not authenticated')
      return neonRequest<T>(path, token, init)
    },
    [getToken],
  )

  const refresh = useCallback(async () => {
    if (!user) {
      setRsvps([])
      setDonations([])
      setDataError(null)
      return
    }
    try {
      const [rsvpRows, donationRows] = await Promise.all([
        authFetch<RsvpRow[]>('/rsvps?select=*&order=rsvped_at.desc'),
        authFetch<DonationRow[]>('/donations?select=*&order=created_at.desc'),
      ])
      setRsvps(rsvpRows.map(toRsvp))
      setDonations(donationRows.map(toDonation))
      setDataError(null)
    } catch (error) {
      console.error('Failed to load member data from Neon', error)
      setDataError('We could not load your donation history right now. Please try again in a moment.')
    }
  }, [user, authFetch])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const logout = useCallback(() => {
    void signOut()
  }, [signOut])

  const updateProfile = useCallback(
    (updates: ProfileUpdates) => {
      if (!clerkUser) return
      void (async () => {
        try {
          if (updates.name !== undefined) {
            const parts = updates.name.trim().split(/\s+/)
            await clerkUser.update({
              firstName: parts[0] ?? '',
              lastName: parts.slice(1).join(' '),
            })
          }
          if (updates.phone !== undefined) {
            await clerkUser.updateMetadata({ unsafeMetadata: { phone: updates.phone } })
          }
        } catch (error) {
          console.error('Failed to update profile', error)
        }
      })()
    },
    [clerkUser],
  )

  const addRsvp = useCallback(
    (input: RsvpInput) => {
      if (!user) return
      void (async () => {
        try {
          await authFetch('/rsvps?on_conflict=user_id,event_id', {
            method: 'POST',
            headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
            body: JSON.stringify({
              user_id: user.id,
              event_id: input.id,
              title: input.title,
              event_date: input.date,
              time: input.time,
              location: input.location,
              name: input.name,
              email: input.email,
              phone: input.phone,
            }),
          })
          await refresh()
        } catch (error) {
          console.error('Failed to save RSVP', error)
        }
      })()
    },
    [user, authFetch, refresh],
  )

  const cancelRsvp = useCallback(
    (eventId: string) => {
      if (!user) return
      void (async () => {
        try {
          await authFetch(
            `/rsvps?user_id=eq.${encodeURIComponent(user.id)}&event_id=eq.${encodeURIComponent(eventId)}`,
            { method: 'DELETE', headers: { Prefer: 'return=minimal' } },
          )
          await refresh()
        } catch (error) {
          console.error('Failed to cancel RSVP', error)
        }
      })()
    },
    [user, authFetch, refresh],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading: !isLoaded,
      logout,
      updateProfile,
      rsvps,
      addRsvp,
      cancelRsvp,
      donations,
      dataError,
      refreshDonations: refresh,
    }),
    [
      user,
      isLoaded,
      logout,
      updateProfile,
      rsvps,
      addRsvp,
      cancelRsvp,
      donations,
      dataError,
      refresh,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
