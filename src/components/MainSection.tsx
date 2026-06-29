import { useState, useEffect } from "react";  
import ColorPicker from "./ColorPicker";
import ExportPopup from "./ExportPopup";
import Main2 from "./Main2";
    


// Dit zijn de 5 kleuren die je kan aanpassen op de website
type ColorKey = "text" | "bg" | "primary" | "secondary" | "accent";

// Dit koppelt elke kleur-naam aan een CSS variabele naam
// (zo kan je de kleuren overal in de CSS gebruiken)
const cssVarMap: Record<ColorKey, string> = {
    text: "--color-text",
    bg: "--color-bg",
    primary: "--color-primary",
    secondary: "--color-secondary",
    accent: "--color-accent",
};

// Dit zijn de standaard kleuren waarmee de site begint
const defaultColors: Record<ColorKey, string> = {
    text: "#0d0a2e",
    bg: "#f6f4f4",
    primary: "#4040f5",
    secondary: "#ee0bd6",
    accent: "#c4c5ee",
};

function MainSection() {
    // Hier worden alle huidige kleuren opgeslagen
    const [colors, setColors] = useState<Record<ColorKey, string>>(defaultColors);

    // Dit onthoudt welke kleurkiezer (ColorPicker) nu open staat
    const [activePicker, setActivePicker] = useState<ColorKey | null>(null);

    // Dit onthoudt of dark mode (donkere modus) aan of uit staat
    const [isDark, setIsDark] = useState(false);

    // Dit onthoudt de vorige achtergrondkleur, zodat je die terug kan zetten als je dark mode uitzet
    const [previousBg, setPreviousBg] = useState<string>(defaultColors.bg);

    // Dit bepaalt of het export-popup venster zichtbaar is
    const [showExportPopup, setShowExportPopup] = useState(false);

    // Elke keer dat de kleuren veranderen, worden ze toegepast op de hele pagina via CSS variabelen
    useEffect(() => {
        const root = document.documentElement;
        (Object.keys(colors) as ColorKey[]).forEach((key) => {
            root.style.setProperty(cssVarMap[key], colors[key]);
        });
    }, [colors]);

    // Bij het laden van de pagina: check of de gebruiker eerder dark mode had gekozen,
    // of anders kijk naar de systeeminstelling van de browser/computer
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    // Deze functie zet dark mode aan of uit als je op de knop klikt
    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            // Dark mode aanzetten: achtergrond wordt zwart, oude kleur wordt onthouden
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setPreviousBg(colors.bg);
            setColors((prev) => ({ ...prev, bg: "#000000" }));
        } else {
            // Dark mode uitzetten: oude achtergrondkleur wordt teruggezet
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setColors((prev) => ({ ...prev, bg: previousBg }));
        }
    };

    // Deze functie laat de toolbar (knoppenbalk) even schudden, als visueel effect
    const shakeToolbar = () => {
        const toolbar = document.querySelector(".toolbar");
        if (!toolbar) return;
        toolbar.classList.remove("toolbar-shake");
        void (toolbar as HTMLElement).offsetWidth;
        toolbar.classList.add("toolbar-shake");
    };

    // Deze functie scrollt automatisch naar het Main2 gedeelte van de pagina
    const scrollToMain2 = () => {
        const main2 = document.getElementById("main2");
        if (!main2) return;
        main2.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Deze functie past 1 specifieke kleur aan (bijv. alleen de "primary" kleur)
    const handleColorChange = (key: ColorKey, value: string) => {
        setColors((prev) => ({ ...prev, [key]: value }));
    };

    // Deze functie opent of sluit de kleurkiezer van 1 specifieke knop
    const togglePicker = (key: ColorKey) => {
        setActivePicker((prev) => (prev === key ? null : key));
    };

    // Deze functie maakt een random (willekeurige) hex-kleurcode, bijv. "#a3f2c1"
    const randomHexColor = (): string => {
        const hex = Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, "0");
        return `#${hex}`;
    };

    // Deze functie geeft alle kleuren (behalve achtergrond) een nieuwe random kleur
    const randomizeColors = () => {
        setColors((prev) => ({
            ...prev,
            text: randomHexColor(),
            primary: randomHexColor(),
            secondary: randomHexColor(),
            accent: randomHexColor(),
        }));
    };

    // Hieronder begint de HTML/JSX die echt op het scherm wordt getoond
    return (
        <>
            <main>
                {/* Dit is het bovenste gedeelte van de pagina (hero sectie) met titel en knoppen */}
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
                            <button className="btn btn-secondary" onClick={scrollToMain2}>
                                How does it work?
                            </button>
                            <button className="btn btn-primary" onClick={shakeToolbar}>
                                Get Started
                            </button>
                        </div>
                    </div>
                    {/* Dit zijn alleen decoratieve blokjes/vormen voor de styling */}
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

                {/* Dit is de toolbar (knoppenbalk) waarmee je kleuren kan aanpassen */}
                <section id="toolbar">
                    <div className="toolbar">
                        {/* Knop + kleurkiezer voor de tekstkleur */}
                        <div className="tool-wrapper">
                            <button
                                className="tool tool-text"
                                onClick={() => togglePicker("text")}>
                                text
                            </button>
                            {activePicker === "text" && (
                                <ColorPicker
                                    color={colors.text}
                                    onChange={(c) => handleColorChange("text", c)}
                                    onClose={() => setActivePicker(null)} />
                            )}
                        </div>

                        {/* Knop + kleurkiezer voor de achtergrondkleur */}
                        <div className="tool-wrapper">
                            <button
                                className="tool tool-background"
                                onClick={() => togglePicker("bg")}>
                                background
                            </button>
                            {activePicker === "bg" && (
                                <ColorPicker
                                    color={colors.bg}
                                    onChange={(c) => handleColorChange("bg", c)}
                                    onClose={() => setActivePicker(null)} />
                            )}
                        </div>

                        {/* Knop + kleurkiezer voor de primaire kleur */}
                        <div className="tool-wrapper">
                            <button
                                className="tool tool-primary"
                                onClick={() => togglePicker("primary")}>
                                Primary
                            </button>
                            {activePicker === "primary" && (
                                <ColorPicker
                                    color={colors.primary}
                                    onChange={(c) => handleColorChange("primary", c)}
                                    onClose={() => setActivePicker(null)} />
                            )}
                        </div>

                        {/* Knop + kleurkiezer voor de secundaire kleur */}
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
                                    onClose={() => setActivePicker(null)} />
                            )}
                        </div>

                        {/* Knop + kleurkiezer voor de accentkleur */}
                        <div className="tool-wrapper">
                            <button
                                className="tool tool-accent"
                                onClick={() => togglePicker("accent")}>
                                Accent
                            </button>
                            {activePicker === "accent" && (
                                <ColorPicker
                                    color={colors.accent}
                                    onChange={(c) => handleColorChange("accent", c)}
                                    onClose={() => setActivePicker(null)} />
                            )}
                        </div>

                        {/* Knop om dark mode (donkere modus) aan/uit te zetten */}
                        <button
                            className="tool tool-icon Tooltip"
                            aria-label="Toggle dark mode"
                            onClick={toggleTheme}>
                            <i className={isDark ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
                            <span className="Tooltip__tip">Dark/Light</span>
                        </button>

                        {/* Knop om alle kleuren random te maken */}
                        <button
                            className="tool tool-icon Tooltip"
                            aria-label="icon2"
                            onClick={randomizeColors}>
                            <i className="fa-solid fa-dice-five"></i>
                            <span className="Tooltip__tip">Randomize Colors</span>
                        </button>

                        {/* Knop om het export-popup venster te openen */}
                        <button
                            className="tool tool-icon Tooltip"
                            aria-label="icon3"
                            onClick={() => setShowExportPopup(true)}>
                            <i className="fa-solid fa-arrow-up-from-bracket"></i>
                            <span className="Tooltip__tip">Export</span>
                        </button>
                    </div>

                    {/* Het export-popup venster wordt alleen getoond als showExportPopup true is */}
                    {showExportPopup && (
                        <ExportPopup
                            colors={colors}
                            onClose={() => setShowExportPopup(false)} />
                    )}
                </section>
            </main>
            {/* Dit is het volgende gedeelte van de pagina (apart component) */}
            <Main2 />
        </>
    );
}

export default MainSection;