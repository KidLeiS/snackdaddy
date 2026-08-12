const snacks = [
  { name: "Smoky BBQ", note: "Big crunch. Deep smoke. Zero nonsense.", protein: "15g protein", tone: "ember" },
  { name: "Sea Salt + Vinegar", note: "Sharp, salty and properly satisfying.", protein: "14g protein", tone: "salt" },
  { name: "Chilli + Lime", note: "Bright heat with a clean finish.", protein: "15g protein", tone: "lime" },
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <nav className="nav shell" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Snackdaddy home">snackdaddy<span>.</span></a>
          <div className="nav-links"><a href="#snacks">The snacks</a><a href="#standards">Our standards</a></div>
          <a className="pill pill-small" href="#signup">Get first dibs</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" /><div className="hero-grain" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Snacks that pull their weight</p>
            <h1 id="hero-title">Better fuel.<br />No lecture.</h1>
            <p className="hero-lede">Bold, high-protein snacks made from ingredients you can pronounce. Built for the gap between good intentions and actual hunger.</p>
            <a className="pill pill-hero" href="#snacks">Meet the lineup <span aria-hidden="true">↘</span></a>
          </div>
          <div className="hero-product" aria-label="Snackdaddy Chilli and Lime protein crunch pack">
            <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
            <div className="pack pack-hero">
              <div className="pack-top" /><p className="pack-brand">snack<br />daddy<span>.</span></p>
              <p className="pack-flavour">CHILLI + LIME</p><p className="pack-type">CRUNCHY BROAD BEANS</p>
              <div className="pack-stat"><strong>15G</strong><span>PROTEIN</span></div>
            </div>
            <div className="ingredient ingredient-one" aria-hidden="true">✦</div><div className="ingredient ingredient-two" aria-hidden="true">●</div>
            <p className="hero-stamp">Plant-powered<br />Properly tasty</p>
          </div>
        </div>
      </section>

      <section className="manifesto shell" aria-label="Our point of view">
        <p className="section-kicker">Here&apos;s the thing</p>
        <div className="manifesto-grid"><h2>Healthy shouldn&apos;t<br />taste like a compromise.</h2><p>We make the snacks we actually want to eat: loud flavour, serious crunch and useful nutrition. No wellness theatre. No sad little portions.</p></div>
      </section>

      <section className="snacks shell" id="snacks" aria-labelledby="snacks-title">
        <div className="section-heading"><div><p className="section-kicker">Pick your fighter</p><h2 id="snacks-title">Three bags.<br />No weak links.</h2></div><p>Roasted broad beans with a clean label and a crunch that means business.</p></div>
        <div className="snack-grid">
          {snacks.map((snack, index) => (
            <article className={`snack-card ${snack.tone}`} key={snack.name}>
              <span className="card-number">0{index + 1}</span>
              <div className="mini-pack" aria-hidden="true"><span>snack<br />daddy.</span><small>{snack.name}</small></div>
              <div className="snack-copy"><p className="snack-protein">{snack.protein}</p><h3>{snack.name}</h3><p>{snack.note}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="standards shell" id="standards" aria-labelledby="standards-title">
        <div className="standards-art" aria-hidden="true"><span className="bean bean-one" /><span className="bean bean-two" /><span className="bean bean-three" /><p>NO<br />NASTIES</p></div>
        <div className="standards-copy"><p className="section-kicker">The non-negotiables</p><h2 id="standards-title">Good stuff in.<br />Good stuff out.</h2><p className="standards-lede">Short ingredient lists, big flavour and enough protein to make your afternoon snack actually count.</p><ul><li><span>01</span> Plant-based protein</li><li><span>02</span> High in fibre</li><li><span>03</span> No artificial flavours</li><li><span>04</span> Made for real appetites</li></ul></div>
      </section>

      <section className="signup shell" id="signup" aria-labelledby="signup-title">
        <div><p className="section-kicker">Coming in hot</p><h2 id="signup-title">Be first<br />to the bag.</h2></div>
        <div className="signup-copy"><p>Launch drops, taste tests and the occasional strong snack opinion.</p><a className="pill pill-dark" href="mailto:hello@snackdaddy.co?subject=Put%20me%20on%20the%20Snackdaddy%20list">Join the early list <span aria-hidden="true">→</span></a><small>No spam. We&apos;re busy making snacks.</small></div>
      </section>

      <footer className="footer shell"><a className="brand" href="#top">snackdaddy<span>.</span></a><p>Better fuel for wherever you&apos;re headed.</p><p>© 2026 Snackdaddy</p></footer>
    </main>
  );
}
