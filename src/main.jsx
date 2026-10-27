import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import App from './App.jsx'
import ActiveSectionProvider from './context/ActiveSectionProvider.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ActiveSectionProvider>
        <App />
      </ActiveSectionProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
