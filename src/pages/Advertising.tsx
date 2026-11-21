import SEO from '../components/SEO/SEO';
import PolicyPage from '../components/PolicyPage/PolicyPage';
import { siteConfig } from '../data/siteConfig';

export default function Advertising() {
  return (
    <>
      <SEO title="Advertising Disclosure" description="XYZ Games.site advertising disclosure." url="/advertising" />
      <PolicyPage title="Advertising Disclosure" lastUpdated="November 2026">
        <section>
          <h2>Advertising on {siteConfig.name}</h2>
          <p>
            {siteConfig.name} may display advertisements provided by third-party advertising networks,
            including Google AdSense, to help support the operation of this free gaming portal.
          </p>
        </section>

        <section>
          <h2>Google AdSense</h2>
          <p>
            The site supports Google AdSense, but ads remain disabled until the publisher is approved and
            valid publisher and ad unit IDs are configured. When enabled, Google AdSense may serve ads based
            on website content and user interest.
          </p>
          <p>
            Google may use cookies and web beacons to serve ads based on a user's prior visits to this
            website and other websites on the Internet. You can opt out of personalised advertising by
            visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            .
          </p>
          <p>
            Before serving ads in the EEA, UK, or Switzerland, a Google-certified consent management platform
            must be configured through AdSense Privacy &amp; messaging.
          </p>
        </section>

        <section>
          <h2>Our Advertising Standards</h2>
          <p>We are committed to responsible advertising. We will never:</p>
          <ul>
            <li>Place ads that overlay or obstruct gameplay.</li>
            <li>Place ads that are designed to look like play buttons or game controls.</li>
            <li>Use pop-up ads that interrupt the user experience.</li>
            <li>Use deceptive ad formats that encourage accidental clicks.</li>
            <li>Generate artificial ad impressions or clicks.</li>
            <li>Display ads for illegal products or services.</li>
          </ul>
        </section>

        <section>
          <h2>In-Game Advertising</h2>
          <p>
            Advertisements within individual games are managed entirely by the respective game developers
            and are independent of this portal. {siteConfig.name} does not inject advertising scripts into
            external game projects.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For advertising enquiries:{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </p>
        </section>
      </PolicyPage>
    </>
  );
}
