function MainSection() {
    return (
        <main>
            <section id="hero">
                <div className="hero-left">
                    <h1>
                        Visualize Your <span className="text-primary">Colors</span> &{' '}
                        <span className="text-secondary">Fonts</span> On a Real Site
                    </h1>
                    <p>
                        Choosing colors or typography for your website? Use the Toolbar
                        below to realize your choices.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-secondary">How does it work?</button>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </section>

            <section id="toolbar">
                <div className="toolbar">
                    <button className="tool tool-text">text</button>
                    <button className="tool tool-background">background</button>
                    <button className="tool tool-primary">Primary</button>
                    <button className="tool tool-secondary">secondary</button>
                    <button className="tool tool-accent">Accent</button>
                    <button className="tool tool-icon" aria-label="icon1">
                        icon1
                    </button>
                    <button className="tool tool-icon" aria-label="icon2">
                        icon2
                    </button>
                    <button className="tool tool-icon" aria-label="icon3">
                        icon3
                    </button>
                </div>
            </section>
        </main>
    );
}

export default MainSection;