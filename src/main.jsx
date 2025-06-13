import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//import degli stili globali
import './index.css'

//import del componente principlae dell'applicazione
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Monta il componente principale App all'interno del DOM */}
    <App />
  </StrictMode>,
)
