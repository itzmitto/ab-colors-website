import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import TailwindColors from './pages/TailwindColors';
import Websites from './pages/Websites';
import Examples from './pages/Examples';



ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/tailwind-colors" element={<TailwindColors />} />
                <Route path="/websites" element={<Websites />} />
                <Route path="/examples" element={<Examples />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);