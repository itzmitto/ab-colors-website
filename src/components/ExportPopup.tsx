import { useRef, useEffect, useState } from "react";

type ColorKey = "text" | "bg" | "primary" | "secondary" | "accent";

interface ExportPopupProps {
    colors: Record<ColorKey, string>;
    onClose: () => void;
}

const labelMap: Record<ColorKey, string> = {
    text: "text",
    bg: "background",
    primary: "primary",
    secondary: "secondary",
    accent: "accent",
};

function ExportPopup({ colors, onClose }: ExportPopupProps) {
    const popupRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

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

    const cssString = `root: {
${(Object.keys(colors) as ColorKey[])
            .map((key) => `  --${labelMap[key]}: ${colors[key]};`)
            .join("\n")}
}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(cssString);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <div className="export-overlay">
            <div className="export-popup" ref={popupRef}>
                <div className="export-tabs">
                    <span className="export-tab export-tab-active">CSS</span>
                </div>

                <div className="export-format-row">
                    <button className="export-format-btn export-format-btn-active">
                        HEX
                    </button>
                </div>

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