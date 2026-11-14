const teamOptions = [
  'Registration desk',
  'Crowd control',
  'Welfare & refreshments',
  'Photography & media',
  'Protocol & guest care',
  'Setup & logistics',
  'First aid',
  'Food distribution',
]

const helpOptions = [
  'Registration desk',
  'Crowd control',
  'Welfare & refreshments',
  'Photography & media',
  'Protocol & guest care',
  'Setup & logistics',
  'First aid',
  'Food distribution',
]

export default function VolunteerForm() {
  return (
    <form
      className="card p-md md:p-md"
      onSubmit={(event) => event.preventDefault()}
    >
      <h2 className="mb-sm font-headline-md text-headline-md text-primary">
        Register
      </h2>
      <p className="mb-lg font-body-md text-body-md text-on-surface-variant">
        There is no commitment at this stage — you choose which duties to accept
        when we contact you.
      </p>

      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Full name*
          </label>
          <input type="text" name="fullName" placeholder="Yusuf Bello" className="field" required />
        </div>

        <div>
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Email*
          </label>
          <input type="email" name="email" placeholder="you@email.com" className="field" required />
        </div>

        <div>
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Phone*
          </label>
          <input type="tel" name="phone" placeholder="0803 000 0000" className="field" required />
        </div>

        <div>
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            City
          </label>
          <input type="text" name="city" placeholder="Abuja" className="field" />
        </div>

        <div>
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            State
          </label>
          <input type="text" name="state" placeholder="FCT" className="field" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Which team would you like to join?*
          </label>
          <select name="team" className="field" defaultValue="" required>
            <option value="" disabled>
              Please choose
            </option>
            {teamOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            What else could you help with? Choose as many as you like
          </legend>
          <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
            {helpOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-sm font-body-sm text-body-sm text-on-surface-variant"
              >
                <input
                  type="checkbox"
                  name="helpWith"
                  value={option}
                  className="h-4 w-4 rounded accent-primary"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            When are you available?
          </label>
          <textarea
            name="availability"
            rows={3}
            placeholder="For example: weekends only, or available the whole convention week."
            className="field resize-none"
          />
        </div>

        <div>
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Emergency contact name
          </label>
          <input type="text" name="emergencyContactName" placeholder="Fatima Bello" className="field" />
        </div>

        <div>
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Emergency contact phone
          </label>
          <input type="tel" name="emergencyContactPhone" placeholder="0805 000 0000" className="field" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Anything else we should know?
          </label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Skills, languages, previous experience — anything that helps us place you well."
            className="field resize-none"
          />
        </div>

        <p className="sm:col-span-2 font-body-sm text-body-sm text-on-surface-variant">
          Your details go to our Welfare &amp; Logistics unit and are used only
          to contact you about serving. We never pass them to anyone else.
        </p>

        <button type="submit" className="btn btn-primary w-full py-3 sm:col-span-2">
          Register as a volunteer
        </button>
      </div>
    </form>
  )
}
