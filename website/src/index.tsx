import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import React from 'react'
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./i18n/i18n"

//CSS IMPORT//
import './styles/Root/normalize.css'
import './styles/Root/index.css'

import reportWebVitals from './reportWebVitals';



const container = document.getElementById('root');
if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </React.StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
