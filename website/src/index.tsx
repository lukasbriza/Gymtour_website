import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import React from 'react'

//CSS IMPORT//
import './styles/Root/normalize.css'
import './styles/Root/index.css'

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container)
  const app = process.env.REACT_APP_STRICT_MODE === "FALSE" ?
    <App /> :
    (<React.StrictMode>
      <App />
    </React.StrictMode>)
  root.render(app)
}

