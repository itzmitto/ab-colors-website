import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        console.log('Theme toggled');
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
                        aria-label="Toggle dark mode"
                    >
                        Moon
                    </button>

                    <button className="sign-in-btn">
                        sign in
                    </button>
                </div>
            </div>
        </nav>
    );
}