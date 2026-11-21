import SEO from '../components/SEO/SEO';
import PolicyPage from '../components/PolicyPage/PolicyPage';
import { siteConfig } from '../data/siteConfig';

export default function Terms() {
  return (
    <>
      <SEO title="Terms & Conditions" description="XYZ Games.site Terms and Conditions." url="/terms" />
      <PolicyPage title="Terms & Conditions" lastUpdated="November 2026">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using {siteConfig.name} ("{siteConfig.shortName}"), you accept and agree to be
            bound by these Terms and Conditions. If you do not agree, please do not use this website.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            {siteConfig.name} is a frontend gaming portal that aggregates links to independently hosted browser
            games. We do not host or distribute game code directly. All games are hosted on external platforms.
          </p>
        </section>

        <section>
          <h2>3. Use of the Website</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use the website for lawful purposes only.</li>
            <li>Not attempt to reverse-engineer, scrape, or replicate the website or its content.</li>
            <li>Not use automated tools to access or interact with the website without permission.</li>
          </ul>
        </section>

        <section>
          <h2>4. External Games and Links</h2>
          <p>
            Games listed on this portal are hosted on external websites. We provide links as a convenience.
            We do not endorse, control, or assume liability for the content, availability, or practices of
            any external game or website.
          </p>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            The branding, design, and original content of {siteConfig.name} are protected by copyright.
            Individual game titles, artwork, and content remain the property of their respective developers
            and publishers.
          </p>
        </section>

        <section>
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            This website is provided "as is" without warranties of any kind. We do not guarantee that the
            website will be error-free, uninterrupted, or that linked games will always be available.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.name} shall not be liable for any indirect,
            incidental, special, or consequential damages arising from your use of the website or linked games.
          </p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by applicable laws. Any disputes shall be resolved in accordance
            with applicable jurisdiction.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            For questions about these Terms, contact us at:{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </p>
        </section>
      </PolicyPage>
    </>
  );
}
