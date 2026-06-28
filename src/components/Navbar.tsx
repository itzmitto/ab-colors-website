import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <span className="logo-text">AB Colors</span>
                </div>
                <div className="nav-links">
                    <a href="#" className="nav-link">generate</a>
                    <a href="#" className="nav-link">Tailwind Colors</a>
                    <a href="#" className="nav-link">websites</a>
                    <a href="#" className="nav-link">examples</a>
                </div>
                <div className="nav-right">
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle dark mode">
                        {isDark ? "Sun" : "Moon"}
                    </button>

                    <button className="sign-in-btn">
                        sign in
                    </button>
                </div>
            </div>
        </nav>
    );
}