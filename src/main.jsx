import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AlertProvider } from './Context/AlertContext.jsx'
import { inject } from '@vercel/analytics'

inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider>
    <App />
    </AlertProvider>
  </StrictMode>,
)
