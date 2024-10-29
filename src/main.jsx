import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import "@appwrite.io/pink/dist/pink.css";
import "@appwrite.io/pink-icons";



createRoot(document.getElementById('root')).render(
  <App />
)
