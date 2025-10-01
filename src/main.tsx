import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router } from "react-router-dom"; 

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
    <App />
    </Router>
  </StrictMode>,
)
