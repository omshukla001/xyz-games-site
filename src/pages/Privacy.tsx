import SEO from '../components/SEO/SEO';
import PolicyPage from '../components/PolicyPage/PolicyPage';
import { siteConfig } from '../data/siteConfig';

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="XYZ Games.site Privacy Policy." url="/privacy" />
      <PolicyPage title="Privacy Policy" lastUpdated="November 2026">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to {siteConfig.name} ("{siteConfig.shortName}", "we", "us", "our"). This Privacy Policy
            explains how we handle information when you visit our website at {siteConfig.url}.
          </p>
          <p>
            We take your privacy seriously. This site is a frontend-only gaming portal. We do not operate
            a backend server, database, or user account system.
          </p>
        </section>

        <section>
          <h2>2. Information We Do Not Collect</h2>
          <p>We do <strong>not</strong>:</p>
          <ul>
            <li>Require registration or user accounts.</li>
            <li>Collect personal data through forms (except when you voluntarily contact us via email).</li>
            <li>Store your data in a database.</li>
            <li>Sell personal information that you provide directly to us.</li>
          </ul>
        </section>

        <section>
          <h2>3. Cookies and Analytics</h2>
          <p>
            This website may use browser cookies or local storage for functional purposes such as remembering
            your preferences. If Google AdSense is enabled, Google may use cookies or similar technologies
            to serve and measure ads, subject to the consent settings configured for this site and your region.
          </p>
          <p>
            If you have enabled Google Analytics or similar tools, aggregate, anonymised usage data may be
            collected. No personally identifiable information is included.
          </p>
        </section>

        <section>
          <h2>4. Third-Party Games</h2>
          <p>
            Games linked from this portal are hosted independently on third-party platforms (such as Vercel).
            When you click "Play Now" and visit an external game, that game's own privacy policy applies.
            We are not responsible for the data practices of external game sites.
          </p>
        </section>

        <section>
          <h2>5. Advertising</h2>
          <p>
            Google AdSense ads are loaded only after publisher approval and configuration of valid publisher
            and ad unit IDs. When enabled, Google and its partners may use cookies or similar technologies
            to personalize and measure ads, subject to applicable consent requirements. Before serving ads
            in the EEA, UK, or Switzerland, we must configure a Google-certified consent management platform
            in AdSense Privacy & messaging. You can manage personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2>6. Contact Information</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </p>
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this policy periodically. Changes will be reflected on this page with an updated
            "Last updated" date.
          </p>
        </section>
      </PolicyPage>
    </>
  );
}
