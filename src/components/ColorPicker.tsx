import { useRef, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

// Dit zegt welke gegevens dit component nodig heeft om te werken
interface ColorPickerProps {
    color: string; // de huidige kleur die getoond moet worden
    onChange: (color: string) => void; // functie die wordt aangeroepen als de kleur verandert
    onClose: () => void; // functie om de kleurkiezer te sluiten
}

function ColorPicker({ color, onChange, onClose }: ColorPickerProps) {
    // Dit is een verwijzing naar de kleurkiezer zelf (gebruikt om buiten-klikken te detecteren)
    const pickerRef = useRef<HTMLDivElement>(null);

    // Sluit de kleurkiezer automatisch als je buiten het venster klikt
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    // Hieronder begint de HTML/JSX die echt op het scherm wordt getoond
    return (
        <div className="color-picker-popup" ref={pickerRef}>
            {/* Dit is het kleurenvlak/wiel waarmee je de kleur kan selecteren */}
            <HexColorPicker color={color} onChange={onChange} />

            {/* Dit is het tekstvakje waar je de hex-code (bijv. #ff0000) kan zien en intypen */}
            <div className="color-picker-hex">
                <span className="color-picker-hex-label">HEX</span>
                <HexColorInput
                    color={color}
                    onChange={onChange}
                    prefixed
                    className="color-picker-hex-input" />
            </div>

            {/* Dit is een klein vakje dat de gekozen kleur als voorbeeld laat zien */}
            <div
                className="color-picker-preview"
                style={{ background: color }}
            ></div>
        </div>
    );
}

export default ColorPicker;