import SEO from '../components/SEO/SEO';
import PolicyPage from '../components/PolicyPage/PolicyPage';
import { siteConfig } from '../data/siteConfig';

export default function Copyright() {
  return (
    <>
      <SEO title="Copyright Policy" description="XYZ Games.site Copyright Policy." url="/copyright" />
      <PolicyPage title="Copyright Policy" lastUpdated="November 2026">
        <section>
          <h2>Ownership of Content</h2>
          <p>
            The original design, branding, copy, and structure of {siteConfig.name} are copyright ©{' '}
            {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
        </section>

        <section>
          <h2>Third-Party Game Content</h2>
          <p>
            Individual games, game names, screenshots, thumbnails, and descriptions referenced on this portal
            remain the intellectual property of their respective developers. We display this information solely
            to describe and link to those games.
          </p>
        </section>

        <section>
          <h2>DMCA / Copyright Complaints</h2>
          <p>
            If you believe any content on {siteConfig.name} infringes your copyright, please contact us with:
          </p>
          <ul>
            <li>Your name and contact information.</li>
            <li>Identification of the copyrighted work claimed to be infringed.</li>
            <li>Identification of the material on our site that you claim is infringing.</li>
            <li>A statement that you have a good-faith belief that use of the material is not authorised.</li>
            <li>A statement that the information in the notification is accurate and that you are authorised
                to act on behalf of the copyright owner.</li>
          </ul>
          <p>
            Send notices to:{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </p>
        </section>

        <section>
          <h2>Fair Use</h2>
          <p>
            Descriptive references to game titles and thumbnail images are used under fair use principles
            for the purpose of identification, commentary, and linking.
          </p>
        </section>
      </PolicyPage>
    </>
  );
}
