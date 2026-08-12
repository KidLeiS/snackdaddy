import Image from "next/image";
import { ProductCarousel } from "./product-carousel";

const benefits = [
  { number: "01", title: "Higher protein", copy: "Built to keep breakfast pulling its weight, long after the first spoonful." },
  { number: "02", title: "Better fibre", copy: "Oats, seeds and plants chosen to give your gut something useful to work with." },
  { number: "03", title: "Micronutrient dense", copy: "A more complete morning mix—without turning breakfast into homework." },
];

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <nav className="nav shell" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Snackdaddy home">
            <Image src="/brand/snackdaddy-wordmark-yellow.svg" alt="Snackdaddy" width={145} height={36} priority />
          </a>
          <div className="nav-links"><a href="#why">Why BR-OATS</a><a href="#flavours">Flavours</a></div>
          <a className="button button-black button-small" href="https://tally.so/r/KY2BvM">Get first dibs</a>
        </nav>
      </header>

      <section className="hero" id="main-content" aria-labelledby="hero-title" tabIndex={-1}>
        <div className="hero-rule" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">Oats with<br />more to give.</h1>
            <p className="hero-lede">Higher protein. Better fibre. Micronutrient dense. BR-OATS is the no-fuss overnight breakfast that works harder than it looks.</p>
            <div className="hero-actions">
              <a className="button button-black" href="#flavours">Meet BR-OATS <span aria-hidden="true">↘</span></a>
              <p><strong>Mix tonight.</strong><br />Win tomorrow morning.</p>
            </div>
          </div>
          <ProductCarousel />
        </div>
        <p className="vertical-note" aria-hidden="true">PROTEIN / FIBRE / THE GOOD STUFF</p>
      </section>

      <section className="ticker" aria-label="BR-OATS benefits">
        <div>HIGHER PROTEIN <span>✦</span> BETTER FIBRE <span>✦</span> BIG FLAVOUR <span>✦</span> ZERO MORNING FUSS <span>✦</span></div>
      </section>

      <section className="why shell" id="why" aria-labelledby="why-title">
        <div className="section-intro">
          <h2 id="why-title">More than<br />a pot of oats.</h2>
          <p>BR-OATS turns a five-minute night-before habit into the breakfast your morning thought you didn&apos;t have time for.</p>
        </div>
        <div className="benefit-list">
          {benefits.map((benefit) => (
            <article key={benefit.number}>
              <span>{benefit.number}</span><h3>{benefit.title}</h3><p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flavours shell" id="flavours" aria-labelledby="flavours-title">
        <div className="flavours-heading">
          <h2 id="flavours-title">Pick tomorrow&apos;s<br />breakfast tonight.</h2>
        </div>
        <div className="flavour-grid">
          <article><span>01</span><h3>Chai<br />Chocolate</h3><p>Deep cacao + warm spice.</p></article>
          <article><span>02</span><h3>Tira<br />misu</h3><p>Coffee-led. Spoon-ready.</p></article>
          <article><span>03</span><h3>Banana<br />Bread</h3><p>Bakery comfort, breakfast maths.</p></article>
          <article><span>04</span><h3>PB<br />&amp;J</h3><p>Salty peanut + sharp berry.</p></article>
        </div>
      </section>

      <section className="statement shell" aria-label="BR-OATS promise">
        <p>Soak overnight.</p><p>Show up ready.</p>
      </section>

      <section className="signup shell" id="signup" aria-labelledby="signup-title">
        <div className="signup-grid">
          <h2 id="signup-title">Get in before<br />breakfast.</h2>
          <div><p>First drops, taste tests and launch news. No wellness sermons before 9am.</p><a className="button button-yellow" href="https://tally.so/r/KY2BvM">Join the early list <span aria-hidden="true">→</span></a><small>No spam. We&apos;re busy soaking oats.</small></div>
        </div>
      </section>

      <footer className="footer shell"><a className="brand" href="#top"><Image src="/brand/snackdaddy-wordmark-yellow.svg" alt="Snackdaddy" width={145} height={36} /></a><p>BR-OATS. Breakfast that pulls its weight.</p><p>© 2026 Snackdaddy</p></footer>
    </main>
  );
}
