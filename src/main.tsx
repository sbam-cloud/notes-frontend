import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import DecryptPage from './DecryptPage';
import EncryptPage from './EncryptPage'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EncryptPage />} />
          <Route path="/:id" element={<DecryptPage />} />
        </Routes>
      </BrowserRouter>
    </App>
  </React.StrictMode>
)
