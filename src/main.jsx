import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
