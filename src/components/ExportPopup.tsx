import { useRef, useEffect, useState } from "react";

// Dit zijn de 5 kleuren die geëxporteerd kunnen worden
type ColorKey = "text" | "bg" | "primary" | "secondary" | "accent";

// Dit zegt welke gegevens dit component nodig heeft om te werken
interface ExportPopupProps {
    colors: Record<ColorKey, string>; // de huidige kleuren
    onClose: () => void; // functie om het popup-venster te sluiten
}

// Dit koppelt elke kleur-naam aan de naam die in de geëxporteerde CSS komt
const labelMap: Record<ColorKey, string> = {
    text: "text",
    bg: "background",
    primary: "primary",
    secondary: "secondary",
    accent: "accent",
};

function ExportPopup({ colors, onClose }: ExportPopupProps) {
    // Dit is een verwijzing naar het popup-venster zelf (gebruikt om buiten-klikken te detecteren)
    const popupRef = useRef<HTMLDivElement>(null);

    // Dit onthoudt of de tekst net gekopieerd is (voor het "Copied!" berichtje)
    const [copied, setCopied] = useState(false);

    // Sluit het popup-venster automatisch als je buiten het venster klikt, of op Escape drukt
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                onClose();
            }
        }
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    // Dit bouwt de CSS-tekst die je straks kan kopiëren, met alle kleuren erin
    const cssString = `root: {
${(Object.keys(colors) as ColorKey[])
            .map((key) => `  --${labelMap[key]}: ${colors[key]};`)
            .join("\n")}
}`;

    // Deze functie kopieert de CSS-tekst naar het klembord als je op "Copy" klikt
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(cssString);
            setCopied(true);
            // Na 1.5 seconden gaat het "Copied!" berichtje weer terug naar "Copy"
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    // Hieronder begint de HTML/JSX die echt op het scherm wordt getoond
    return (
        <div className="export-overlay">
            <div className="export-popup" ref={popupRef}>
                {/* Tabblad boven in de popup (hier alleen "CSS") */}
                <div className="export-tabs">
                    <span className="export-tab export-tab-active">CSS</span>
                </div>

                {/* Keuze voor het formaat van de kleurcode (hier alleen "HEX") */}
                <div className="export-format-row">
                    <button className="export-format-btn export-format-btn-active">
                        HEX
                    </button>
                </div>

                {/* Hier wordt de echte CSS-code getoond, met een knop om te kopiëren */}
                <div className="export-code-wrapper">
                    <button className="export-copy-btn" onClick={handleCopy}>
                        {copied ? "Copied!" : "Copy"}
                    </button>
                    <pre className="export-code">{cssString}</pre>
                </div>
            </div>
        </div>
    );
}

export default ExportPopup;