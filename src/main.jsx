import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AlertProvider } from './Context/AlertContext.jsx'
import { inject } from '@vercel/analytics'
import { BlogProvider } from './Context/BlogContext.jsx'

inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BlogProvider>
    <AlertProvider>
    <App />
    </AlertProvider>
    </BlogProvider>
  </StrictMode>,
)
