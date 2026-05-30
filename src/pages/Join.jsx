import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Join() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [interest, setInterest] = useState('Community Service')
  const [role, setRole] = useState('Member')
  const [error, setError] = useState('')

  const next = () => {
    setError('')
    if (step === 1 && (!name || !email || !password)) {
      return setError('Please fill in all fields')
    }
    if (step < totalSteps) setStep((s) => s + 1)
  }

  const prev = () => {
    setError('')
    if (step > 1) setStep((s) => s - 1)
  }

  const handleSubmit = () => {
    setError('')
    const result = signup({ name, email, password, interests: [interest] })
    if (result.ok) navigate('/profile')
    else setError(result.error)
  }

  const stepTitle = step === 1 ? 'Personal Details' : step === 2 ? 'Choose Your Path' : 'Finalize Registration'
  const stepSubtitle = step === 1
    ? 'Tell us about yourself so we can get to know you better.'
    : step === 2
      ? 'Select how you would like to participate in our community.'
      : 'Review your selection and join the Noor Youth family.'

  return (
    <main className="pt-[80px] min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#735c00 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', opacity: 0.05 }} />
      <section className="mx-auto max-w-container-max px-gutter py-xl">
        <div className="text-center mb-xl md:text-left">
          <h1 className="font-display-lg text-display-lg text-primary mb-md">Become a Part of Noor Youth</h1>
          <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">Shape the future of our community through active engagement, spiritual development, and collaborative service.</p>
        </div>
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-xl">
          <div className="space-y-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="transition-shadow border shadow-sm bg-surface-container-lowest p-md rounded-xl border-outline-variant/30 hover:shadow-md group">
                <div className="flex items-center justify-center w-12 h-12 transition-transform rounded-lg bg-primary-fixed mb-md group-hover:scale-110">
                  <span className="material-symbols-outlined text-primary">groups</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">Mentorship</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Connect with experienced professionals and spiritual guides committed to your personal growth and career success.</p>
              </div>
              <div className="transition-shadow border shadow-sm bg-surface-container-lowest p-md rounded-xl border-outline-variant/30 hover:shadow-md group">
                <div className="flex items-center justify-center w-12 h-12 transition-transform rounded-lg bg-secondary-fixed mb-md group-hover:scale-110">
                  <span className="material-symbols-outlined text-secondary">hub</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">Networking</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Join a vibrant ecosystem of like-minded youth, entrepreneurs, and community leaders across the region.</p>
              </div>
            </div>
            <div className="relative overflow-hidden shadow-lg bg-primary p-lg rounded-xl text-on-primary">
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-container mb-md">
                  <span className="material-symbols-outlined text-on-primary-container">volunteer_activism</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm mb-sm text-primary-fixed">Community Service</h3>
                <p className="font-body-md text-body-md text-on-primary-container">Lead impactful initiatives that address local needs and foster a spirit of giving back to society.</p>
              </div>
              <div className="absolute w-48 h-48 rounded-full -right-10 -bottom-10 bg-primary-container opacity-20" />
              <div className="absolute w-24 h-24 border-4 rounded-full right-10 top-5 border-primary-fixed/20" />
            </div>
          </div>

          <div className="border shadow-lg backdrop-blur-xl bg-white/70 border-slate-100/50 px-sm md:px-lg py-lg rounded-xl">
            <div className="mb-lg">
              <div className="flex items-center gap-xs mb-sm">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-surface-variant'}`} />
                ))}
              </div>
              <h2 className="font-headline-md text-headline-md text-primary">{stepTitle}</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{stepSubtitle}</p>
            </div>
            {error && <p className="bg-error-container text-on-error-container p-sm rounded-lg font-body-sm mb-md">{error}</p>}

            <form className="space-y-md" onSubmit={(e) => e.preventDefault()}>
              {step === 1 && (
                <div className="transition-all duration-400">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">Full Name</label>
                      <input className="w-full transition-all border rounded-lg outline-none bg-surface-container-lowest border-outline-variant p-sm focus:ring-2 focus:ring-secondary-fixed-dim focus:border-primary" placeholder="Enter your name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
                      <input className="w-full transition-all border rounded-lg outline-none bg-surface-container-lowest border-outline-variant p-sm focus:ring-2 focus:ring-secondary-fixed-dim focus:border-primary" placeholder="name@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="mt-md space-y-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">Password</label>
                    <input className="w-full transition-all border rounded-lg outline-none bg-surface-container-lowest border-outline-variant p-sm focus:ring-2 focus:ring-secondary-fixed-dim focus:border-primary" placeholder="Create a password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="mt-md space-y-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">Interest Area</label>
                    <select className="w-full transition-all border rounded-lg outline-none bg-surface-container-lowest border-outline-variant p-sm focus:ring-2 focus:ring-secondary-fixed-dim focus:border-primary" value={interest} onChange={(e) => setInterest(e.target.value)}>
                      <option>Community Service</option>
                      <option>Educational Programs</option>
                      <option>Spiritual Growth</option>
                      <option>Leadership Training</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="transition-all duration-400">
                  <p className="font-label-md text-label-md text-on-surface-variant mb-sm">Choose your primary path:</p>
                  <div className="grid grid-cols-1 gap-md">
                    {['Member', 'Volunteer'].map((opt) => (
                      <label key={opt} className="flex items-start transition-colors border cursor-pointer p-md border-outline-variant rounded-xl hover:bg-surface-container-low group">
                        <input className="w-4 h-4 mt-1 text-primary focus:ring-primary" name="path" type="radio" checked={role === opt} onChange={() => setRole(opt)} />
                        <div className="ml-md">
                          <span className="block font-headline-sm text-headline-sm text-primary mb-xs">{opt}</span>
                          <span className="block font-body-sm text-body-sm text-on-surface-variant">
                            {opt === 'Member' ? 'Access all resources, events, and formal mentorship programs.' : 'Contribute your skills to manage events and outreach initiatives.'}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center transition-all duration-400 py-lg">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary-fixed mb-md">
                    <span className="text-4xl material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-sm">Ready to Join?</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">By clicking submit, you agree to our community guidelines and mission statement.</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-lg">
                <button type="button" onClick={prev} disabled={step === 1} className={`font-button text-button text-primary flex items-center transition-all ${step === 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
                  <span className="material-symbols-outlined mr-xs">chevron_left</span> Back
                </button>
                {step < 3 ? (
                  <button type="button" onClick={next} className="flex items-center py-2 transition-all rounded-full font-button text-button bg-primary text-on-primary px-md md:px-xl hover:shadow-lg">
                    Continue <span className="material-symbols-outlined ml-xs">chevron_right</span>
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} className="flex items-center py-2 transition-all rounded-full font-button text-button bg-primary text-on-primary px-md md:px-xl hover:shadow-lg">
                    Submit <span className="material-symbols-outlined ml-xs">send</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
