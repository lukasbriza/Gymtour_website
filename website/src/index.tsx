import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import React from 'react'


//CSS IMPORT//
import './styles/Root/normalize.css'
import './styles/Root/index.css'

import reportWebVitals from './reportWebVitals';



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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
