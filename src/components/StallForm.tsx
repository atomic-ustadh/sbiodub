const categories = [
  'Food & drink',
  'Fashion & lifestyle',
  'Books & art',
  'Professional & financial services',
  'Community & education',
  'Other',
]

export default function StallForm() {
  return (
    <form
      className="card p-lg md:p-xl"
      onSubmit={(event) => event.preventDefault()}
    >
      <h2 className="mb-sm font-headline-md text-headline-md text-primary">
        Apply for a Stall
      </h2>
      <p className="mb-lg font-body-md text-body-md text-on-surface-variant">
        Tell us about your business and what you would like to bring. You may
        apply for only one stall slot.
      </p>

      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <div>
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Business or brand name*
          </label>
          <input type="text" name="businessName" placeholder="Your business name" className="field" required />
        </div>

        <div>
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Contact full name*
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
            Product category*
          </label>
          <select name="category" className="field" defaultValue="" required>
            <option value="" disabled>
              Please choose
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            What will you be selling?*
          </label>
          <textarea
            name="products"
            rows={4}
            placeholder="Describe the products or services you would like to showcase at your stall."
            className="field resize-none"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Website or social handle
          </label>
          <input type="text" name="website" placeholder="instagram.com/yourbusiness" className="field" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
            Any special requirements?
          </label>
          <textarea
            name="requirements"
            rows={3}
            placeholder="Let us know about any power, space or setup needs."
            className="field resize-none"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-3 sm:col-span-2">
          Apply for a Stall
        </button>
      </div>
    </form>
  )
}
