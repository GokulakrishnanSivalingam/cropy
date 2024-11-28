import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import R from '../src/router/Routing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <R />
  </StrictMode>,
)
