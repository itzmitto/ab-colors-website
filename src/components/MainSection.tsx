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
                    <button className="tool tool-text">text</button>
                    <button className="tool tool-background">background</button>
                    <button className="tool tool-primary">Primary</button>
                    <button className="tool tool-secondary">secondary</button>
                    <button className="tool tool-accent">Accent</button>
                    <button className="tool tool-icon" aria-label="icon1">
                        <i className="fa-solid fa-sun"></i>
                    </button>
                    <button className="tool tool-icon" aria-label="icon2">
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