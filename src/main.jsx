import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Contextprovider } from './Context-reducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Contextprovider>  {/* wrapping by the provider */}
    <App />
    </Contextprovider>
  </React.StrictMode>,
)
