import { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";

type ColorKey = "text" | "bg" | "primary" | "secondary" | "accent";

const cssVarMap: Record<ColorKey, string> = {
    text: "--color-text",
    bg: "--color-bg",
    primary: "--color-primary",
    secondary: "--color-secondary",
    accent: "--color-accent",
};

const defaultColors: Record<ColorKey, string> = {
    text: "#0d0a2e",
    bg: "#f6f4f4",
    primary: "#4040f5",
    secondary: "#ee0bd6",
    accent: "#c4c5ee",
};

function MainSection() {
    const [colors, setColors] = useState<Record<ColorKey, string>>(defaultColors);
    const [activePicker, setActivePicker] = useState<ColorKey | null>(null);
    const [isDark, setIsDark] = useState(false);
    const [previousBg, setPreviousBg] = useState<string>(defaultColors.bg);

    useEffect(() => {
        const root = document.documentElement;
        (Object.keys(colors) as ColorKey[]).forEach((key) => {
            root.style.setProperty(cssVarMap[key], colors[key]);
        });
    }, [colors]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setPreviousBg(colors.bg);
            setColors((prev) => ({ ...prev, bg: "#000000" }));
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setColors((prev) => ({ ...prev, bg: previousBg }));
        }
    };

    const shakeToolbar = () => {
        const toolbar = document.querySelector(".toolbar");
        if (!toolbar) return;

        toolbar.classList.remove("toolbar-shake");
        void (toolbar as HTMLElement).offsetWidth;
        toolbar.classList.add("toolbar-shake");
    };

    const handleColorChange = (key: ColorKey, value: string) => {
        setColors((prev) => ({ ...prev, [key]: value }));
    };

    const togglePicker = (key: ColorKey) => {
        setActivePicker((prev) => (prev === key ? null : key));
    };

    const randomHexColor = (): string => {
        const hex = Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, "0");
        return `#${hex}`;
    };

    const randomizeColors = () => {
        setColors((prev) => ({
            ...prev,
            text: randomHexColor(),
            primary: randomHexColor(),
            secondary: randomHexColor(),
            accent: randomHexColor(),
            // bg blijft ongewijzigd
        }));
    };

    return (
        <main>
            <section id="hero">
                <div className="hero-left">
                    <h1>
                        Visualize Your<br />
                        <span className="text-primary">Colors</span> &{' '}
                        <span className="text-secondary">Fonts</span>
                        <br />
                        On a Real Site
                    </h1>
                    <p>
                        Choosing colors or typography for your website? Use the Toolbar
                        below to realize your choices.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-secondary">How does it work?</button>
                        <button className="btn btn-primary" onClick={shakeToolbar}>
                            Get Started
                        </button>
                    </div>
                </div>

                <div className="color-layout-wrapper">
                    <div className="color-layout">
                        <div className="block blok1"></div>
                        <div className="block blok2"></div>
                        <div className="block blok3"></div>
                        <div className="block blok4"></div>
                        <div className="block blok5"></div>
                        <div className="block blok6"></div>
                        <div className="block blok7"></div>
                        <div className="block blok8a"></div>
                        <div className="block blok8b"></div>
                        <div className="block blok9"></div>
                        <div className="block blok10"></div>
                        <div className="block blok11"></div>
                    </div>
                </div>
            </section>

            <section id="toolbar">
                <div className="toolbar">
                    <div className="tool-wrapper">
                        <button
                            className="tool tool-text"
                            onClick={() => togglePicker("text")}
                        >
                            text
                        </button>
                        {activePicker === "text" && (
                            <ColorPicker
                                color={colors.text}
                                onChange={(c) => handleColorChange("text", c)}
                                onClose={() => setActivePicker(null)}
                            />
                        )}
                    </div>

                    <div className="tool-wrapper">
                        <button
                            className="tool tool-background"
                            onClick={() => togglePicker("bg")}
                        >
                            background
                        </button>
                        {activePicker === "bg" && (
                            <ColorPicker
                                color={colors.bg}
                                onChange={(c) => handleColorChange("bg", c)}
                                onClose={() => setActivePicker(null)}
                            />
                        )}
                    </div>

                    <div className="tool-wrapper">
                        <button
                            className="tool tool-primary"
                            onClick={() => togglePicker("primary")}
                        >
                            Primary
                        </button>
                        {activePicker === "primary" && (
                            <ColorPicker
                                color={colors.primary}
                                onChange={(c) => handleColorChange("primary", c)}
                                onClose={() => setActivePicker(null)}
                            />
                        )}
                    </div>

                    <div className="tool-wrapper">
                        <button
                            className="tool tool-secondary"
                            onClick={() => togglePicker("secondary")}
                        >
                            secondary
                        </button>
                        {activePicker === "secondary" && (
                            <ColorPicker
                                color={colors.secondary}
                                onChange={(c) => handleColorChange("secondary", c)}
                                onClose={() => setActivePicker(null)}
                            />
                        )}
                    </div>

                    <div className="tool-wrapper">
                        <button
                            className="tool tool-accent"
                            onClick={() => togglePicker("accent")}
                        >
                            Accent
                        </button>
                        {activePicker === "accent" && (
                            <ColorPicker
                                color={colors.accent}
                                onChange={(c) => handleColorChange("accent", c)}
                                onClose={() => setActivePicker(null)}
                            />
                        )}
                    </div>

                    <button
                        className="tool tool-icon"
                        aria-label="Toggle dark mode"
                        onClick={toggleTheme}
                    >
                        <i className={isDark ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
                    </button>
                    <button
                        className="tool tool-icon"
                        aria-label="icon2"
                        onClick={randomizeColors}
                    >
                        <i className="fa-solid fa-dice-five"></i>
                    </button>
                    <button className="tool tool-icon" aria-label="icon3">
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </button>
                </div>
            </section>
        </main>
    );
}

export default MainSection;