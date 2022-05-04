import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import DecryptPage from './DecryptPage';
import EncryptPage from './EncryptPage'
import theme from './theme';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EncryptPage />} />
            <Route path="/:id" element={<DecryptPage />} />
          </Routes>
        </BrowserRouter>
      </App>
    </ChakraProvider>
  </React.StrictMode>
)
