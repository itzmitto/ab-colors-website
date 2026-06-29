import { useRef, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    onClose: () => void;
}

function ColorPicker({ color, onChange, onClose }: ColorPickerProps) {
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div className="color-picker-popup" ref={pickerRef}>
            <HexColorPicker color={color} onChange={onChange} />

            <div className="color-picker-hex">
                <span className="color-picker-hex-label">HEX</span>
                <HexColorInput
                    color={color}
                    onChange={onChange}
                    prefixed
                    className="color-picker-hex-input" />
            </div>

            <div
                className="color-picker-preview"
                style={{ background: color }}
            ></div>
        </div>
    );
}

export default ColorPicker;