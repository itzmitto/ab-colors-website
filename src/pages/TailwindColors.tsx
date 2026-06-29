// Importeer de benodigde hooks van React
// useRef = onthoudt een waarde zonder de pagina opnieuw te tekenen
// useState = sla een waarde op en herlaad de pagina als die verandert
import { useRef, useState } from 'react';

// Importeer de Navbar-component die bovenaan de pagina verschijnt
import Navbar from '../components/Navbar';

// Importeer de CSS-stijlen speciaal voor deze pagina
import '../styling/tailwindColors.css';

// Dit is de lijst van alle kleurgewichten (van licht naar donker)
// 50 = heel licht, 950 = heel donker
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Dit object bevat alle Tailwind-kleuren
// Elke kleur heeft een naam (bijv. 'Red') en een lijst van 11 hex-codes
// Een hex-code is een kleurcode die begint met # (bijv. #ef4444)
const colors: Record<string, string[]> = {
    Red: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a'],
    Orange: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#431407'],
    Amber: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'],
    Yellow: ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006'],
    Lime: ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314', '#1a2e05'],
    Green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16'],
    Emerald: ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22'],
    Teal: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#042f2e'],
    Cyan: ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344'],
    Sky: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
    Blue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554'],
    Indigo: ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b'],
    Violet: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#2e1065'],
    Purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b0764'],
    Fuchsia: ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75', '#4a044e'],
    Pink: ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724'],
    Rose: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337', '#4c0519'],
    Slate: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#020617'],
    Gray: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#030712'],
    Zinc: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b', '#09090b'],
    Neutral: ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0a0a0a'],
    Stone: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917', '#0c0a09'],
};

// Dit is de hoofd-component van de pagina
function TailwindColors() {

    // 'toast' slaat op welke hex-code gekopieerd is én of het berichtje zichtbaar is
    // Voorbeeld: { hex: '#ef4444', show: true }
    const [toast, setToast] = useState<{ hex: string; show: boolean }>({
        hex: '',
        show: false,
    });

    // useRef wordt hier gebruikt om de timer bij te houden
    // Zo kunnen we de vorige timer stoppen als er snel achter elkaar geklikt wordt
    const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Deze functie wordt aangeroepen als de gebruiker op een kleur klikt
    const handleCopy = (hex: string) => {
        // Kopieer de hex-code naar het klembord van de gebruiker
        navigator.clipboard.writeText(hex);

        // Laat het 'gekopieerd'-berichtje zien met de hex-code
        setToast({ hex, show: true });

        // Stop de vorige timer als die nog loopt (bij snel klikken)
        if (toastTimeout.current) clearTimeout(toastTimeout.current);

        // Verberg het berichtje na 1,5 seconde automatisch
        toastTimeout.current = setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 1500);
    };

    return (
        <>
            {/* Toon de navigatiebalk bovenaan */}
            <Navbar />

            <div className="tw-colors-page">

                {/* Het pop-up berichtje dat verschijnt na het kopiëren */}
                {/* De 'show' klasse maakt het zichtbaar via CSS */}
                <div className={`tw-copy-toast ${toast.show ? 'show' : ''}`}>
                    {toast.hex} copied!
                </div>

                {/* De koptekst van de pagina met een korte uitleg */}
                <header className="tw-header">
                    <h1>Tailwind Colors</h1>
                    <p>Explore all Tailwind CSS v4 colors. Hover to see the hex code, click to copy.</p>
                </header>

                <div className="tw-grid-wrapper">

                    {/* Bovenste rij met de schaalnummers (50, 100, 200, ...) */}
                    <div className="tw-shade-labels">
                        <span /> {/* Lege ruimte voor de kleurlabels aan de linkerkant */}
                        {shades.map((shade) => (
                            <span key={shade}>{shade}</span>
                        ))}
                    </div>

                    {/* Loop door alle kleuren en maak een rij per kleur */}
                    {Object.entries(colors).map(([name, hexValues]) => (
                        <div className="tw-color-row" key={name}>

                            {/* Naam van de kleur aan de linkerkant (bijv. 'Red') */}
                            <div className="tw-row-label">{name}</div>

                            {/* Loop door alle 11 tinten en maak een klikbaar kleurvlak */}
                            {hexValues.map((hex) => (
                                <button
                                    key={hex}
                                    className="tw-swatch"
                                    style={{ backgroundColor: hex }} // Zet de achtergrondkleur via inline stijl
                                    onClick={() => handleCopy(hex)}  // Kopieer de hex-code bij klikken
                                    aria-label={`Copy ${hex}`}>     {/* Toegankelijkheidslabel voor screenreaders */}

                                    {/* Tooltip die de hex-code toont bij hoveren */}
                                    <span className="tw-tooltip">{hex}</span>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// Exporteer de component zodat andere bestanden hem kunnen importeren
export default TailwindColors;