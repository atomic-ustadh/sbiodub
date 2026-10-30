export default function SubscribeForm({ variant = 'default' }) {
  return (
    <div className={variant === 'footer' ? 'flex' : 'flex flex-col sm:flex-row gap-sm justify-center'}>
      <input
        className={
          variant === 'footer'
            ? 'bg-primary-container border-none text-white rounded-l-lg px-md w-full focus:ring-1 focus:ring-secondary-fixed placeholder:text-white/50'
            : 'flex-1 px-md py-3 rounded-lg border border-outline bg-white focus:ring-2 focus:ring-secondary focus:outline-none'
        }
        placeholder={variant === 'footer' ? 'Email address' : 'Enter your email'}
        type="email"
      />
      <button
        className={
          variant === 'footer'
            ? 'bg-secondary-fixed text-primary px-md py-2 rounded-r-lg hover:bg-secondary-fixed-dim transition-colors'
            : 'bg-primary text-on-primary font-button text-button px-lg py-3 rounded-lg hover:bg-primary-container transition-all'
        }
      >
        {variant === 'footer' ? (
          <span className="material-symbols-outlined">send</span>
        ) : (
          'Subscribe'
        )}
      </button>
    </div>
  )
}
