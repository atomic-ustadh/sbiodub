import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY')
}

createRoot(rootElement).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
)
