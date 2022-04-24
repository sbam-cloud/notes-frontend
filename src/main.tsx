import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Decrypt from './Decrypt';
import Encrypt from './Encrypt'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Encrypt />} />
          <Route path="/decrypt/:id" element={<Decrypt />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
