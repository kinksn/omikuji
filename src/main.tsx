import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { OmikujiProvider } from './context/OmikujiContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OmikujiProvider>
      <App />
    </OmikujiProvider>
  </React.StrictMode>,
)
