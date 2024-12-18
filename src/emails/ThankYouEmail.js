import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Link,
} from '@react-email/components';
import logo from '../../public/logo/Smile.png'

function ThankYouEmail({ donorName }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Heartfelt Thanks for Your Generous Support</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Heartfelt Thanks for Your Generous Support</Preview>
      <Section style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Row
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          <Heading as="h2" style={{ color: '#333' }}>
            Dear {donorName},
          </Heading>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            On behalf of everyone at <strong>Bring Smile Foundation</strong>, I extend our deepest gratitude for your generous contribution. Your support is more than just a donation; it is a beacon of hope for children who dream of a brighter tomorrow but face immense challenges today.
          </Text>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            Every rupee you have shared carries the power to ignite a future of endless possibilities. In a community where education is often a distant dream, your compassion has brought it closer to reality. Your kindness inspires us to strive harder and reach more children waiting for a chance to learn, grow, and succeed.
          </Text>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            We promise to keep you updated on the impact your support creates. Your generosity makes you a vital part of our mission to uplift lives and bring smiles to countless faces.
          </Text>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            Thank you for believing in the power of education and for being a part of this transformative journey. If you&apos;d like to connect further, meet the children you’ve helped, or know more about how your contribution is making a difference, we’d be delighted to share.
          </Text>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            With heartfelt gratitude,
            <br />
            <strong>Bring Smile Foundation</strong>
          </Text>
          <Text style={{ fontSize: '16px', color: '#555', marginTop: '10px' }}>
            <Link href="tel:9599322679" style={{ color: '#007BFF', textDecoration: 'none' }}>
              +91 9599322679
            </Link>{' '}
            |{' '}
            <Link href="mailto:support@bringsmile.org" style={{ color: '#007BFF', textDecoration: 'none' }}>
              support@bringsmile.org
            </Link>{' '}
            |{' '}
            <Link href="https://www.bringsmile.org" style={{ color: '#007BFF', textDecoration: 'none' }}>
              www.bringsmile.org
            </Link>
          </Text>
          <Row style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link href="https://www.facebook.com/BringSmileNow" style={{ margin: '0 10px' }}>
              <img
                src="https://img.icons8.com/ios-filled/50/000000/facebook.png"
                alt="Facebook"
                width="24"
                height="24"
              />
            </Link>
            <Link href="https://www.instagram.com/BringSmileNow" style={{ margin: '0 10px' }}>
              <img
                src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"
                alt="Instagram"
                width="24"
                height="24"
              />
            </Link>
            <Link href="https://x.com/bringsmilenow" style={{ margin: '0 10px' }}>
              <img
                src="https://img.icons8.com/ios-filled/50/000000/twitter.png"
                alt="Twitter"
                width="24"
                height="24"
              />
            </Link>
            <Link href="https://www.linkedin.com/in/bringsmileindia/" style={{ margin: '0 10px' }}>
              <img
                src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
                alt="LinkedIn"
                width="24"
                height="24"
              />
            </Link>
          </Row>
          <Text style={{ fontSize: '14px', color: '#777', marginTop: '20px', textAlign: 'center' }}>
            You are always welcome to visit our centers and witness firsthand the smiles you’ve brought into their lives.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}

export default ThankYouEmail;
