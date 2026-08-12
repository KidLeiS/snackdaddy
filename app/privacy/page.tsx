import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | Snackdaddy",
  description: "How the Snackdaddy BR-OATS demand test handles waitlist information.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-nav shell">
        <Link className="brand" href="/" aria-label="Back to Snackdaddy home">
          <Image src="/brand/snackdaddy-wordmark-yellow.svg" alt="Snackdaddy" width={145} height={36} priority />
        </Link>
        <Link className="privacy-back" href="/">Back to BR-OATS <span aria-hidden="true">↗</span></Link>
      </header>

      <article className="privacy-content shell">
        <p className="privacy-kicker">The short version</p>
        <h1>Privacy, minus<br />the legal fog.</h1>
        <p className="privacy-intro">Snackdaddy is an early-stage personal project, not currently a trading business. This page explains how we handle information from the BR-OATS waitlist while we gauge whether the idea has legs.</p>

        <div className="privacy-sections">
          <section>
            <h2>What we collect</h2>
            <p>If you join the waitlist, we collect your email address, your answers about breakfast and flavours, your consent choice, and your country. Tally and our hosting provider may also process basic technical information needed to run the form and website.</p>
          </section>

          <section>
            <h2>Why we collect it</h2>
            <p>We use your answers to understand demand for BR-OATS and shape the idea. If you opt in, we may email you about research, taste tests, launch plans, or whether the project moves forward. We rely on your consent and you can change your mind at any time.</p>
          </section>

          <section>
            <h2>Where it lives</h2>
            <p>Responses are stored by <a href="https://tally.so/help/gdpr">Tally</a>, our form provider. Tally says form data is encrypted in transit and at rest and stored in Europe. We do not sell your information. We only share it with services needed to run this demand test or where the law requires it.</p>
          </section>

          <section>
            <h2>How long we keep it</h2>
            <p>We keep responses only while they are useful for researching BR-OATS. We aim to delete or anonymise personal information within 12 months of your last interaction, or sooner if the project ends or you ask us to delete it.</p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>You can ask to see, correct, or delete your information, or withdraw your consent. The simplest route is to reply to any Snackdaddy email you receive. You can also complain to the <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/">UK Information Commissioner&apos;s Office</a>.</p>
          </section>

          <section>
            <h2>Cookies and changes</h2>
            <p>We do not currently use advertising or analytics cookies on this landing page. Tally may use essential technology to operate its form. If the project or the way we use data changes, we will update this page before using your information in a materially different way.</p>
          </section>
        </div>

        <p className="privacy-updated">Last updated: 12 August 2026</p>
      </article>
    </main>
  );
}
