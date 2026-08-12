import Image from "next/image";
import Link from "next/link";
import { FlavourShowcase } from "./flavour-showcase";
import { ProductCarousel } from "./product-carousel";

const tickerItems = [
  "Higher protein",
  "Better fibre",
  "Big flavour",
  "Zero morning fuss",
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

      <section className="ticker" id="why" aria-label="BR-OATS benefits">
        <div className="ticker-track">
          {[false, true].map((duplicate) => (
            <div className="ticker-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
              {tickerItems.map((item) => <span className="ticker-item" key={item}>{item}</span>)}
            </div>
          ))}
        </div>
      </section>

      <section className="flavours shell" id="flavours" aria-labelledby="flavours-title">
        <div className="flavours-heading">
          <p className="section-kicker">The starting line-up</p>
          <h2 id="flavours-title">Meet the<br />BR-OATS.</h2>
          <p>Four proper flavours. One less thing to think about in the morning.</p>
        </div>
        <FlavourShowcase />
      </section>

      <section className="statement shell" aria-label="BR-OATS promise">
        <p>Soak overnight.</p><p>Show up ready.</p>
      </section>

      <section className="signup shell" id="signup" aria-labelledby="signup-title">
        <div className="signup-grid">
          <h2 id="signup-title">Get in before<br />breakfast.</h2>
          <div><p>First drops, taste tests and launch news. No wellness sermons before 9am.</p><a className="button button-yellow" href="https://tally.so/r/KY2BvM">Join the early list <span aria-hidden="true">→</span></a><small>No spam. We&apos;re busy soaking oats. Read our <Link href="/privacy">privacy policy</Link>.</small></div>
        </div>
      </section>

      <footer className="footer shell"><a className="brand" href="#top"><Image src="/brand/snackdaddy-wordmark-yellow.svg" alt="Snackdaddy" width={145} height={36} /></a><p>BR-OATS. Breakfast that pulls its weight.</p><div className="footer-meta"><Link href="/privacy">Privacy</Link><p>© 2026 Snackdaddy</p></div></footer>
    </main>
  );
}
