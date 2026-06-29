const steps = [
    {
        number: 1,
        text: "Start with two neutral colors for the text and the background.",
    },
    {
        number: 2,
        text: "Choose your primary and secondary colors. Primary is for main CTAs and sections, and Secondary is for less important buttons and info cards.",
    },
    {
        number: 3,
        text: "Accent color is an additional color. It appears in images, highlights, hyperlinks, boxes, cards, etc.",
    },
    {
        number: 4,
        text: 'Happy with the results? Press on "Export" and choose among different options to export in various formats, like .zip, .png, CSS, SCSS, QR Code, and more.',
    },
];

function Main2() {
    return (
        <section id="main2" className="howitworks-container">
            <div className="howitworks-left">
                <h1>How Does it Work?</h1>
                <p>Get your personalized color palette in 4 steps.</p>
            </div>

            <div className="howitworks-steps">
                {steps.map((step) => (
                    <div className="howitworks-step" key={step.number}>
                        <div className="howitworks-number">{step.number}</div>
                        <div className="howitworks-text">{step.text}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Main2;