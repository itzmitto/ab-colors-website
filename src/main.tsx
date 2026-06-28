import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import TailwindColors from './pages/TailwindColors';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/tailwind-colors" element={<TailwindColors />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);