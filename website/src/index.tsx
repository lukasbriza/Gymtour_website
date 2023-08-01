import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import React from 'react'

//CSS IMPORT//
import './styles/Root/normalize.css'
import './styles/Root/index.css'

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

