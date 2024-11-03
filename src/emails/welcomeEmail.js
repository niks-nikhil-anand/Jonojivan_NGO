import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  
  function WelcomeEmail({ fullName }) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Welcome to JonoJivan</title>
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
        <Preview>Welcome to JonoJivan, {fullName}!</Preview>
        <Section style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
          <Row style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
            <Heading as="h2" style={{ color: '#333' }}>
              Welcome, {fullName}!
            </Heading>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              We&apos;re thrilled to have you join JonoJivan, your go-to destination for all your shopping needs.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              At JonoJivan, Unlock optimal wellness at JonoJivan.com with premium natural health supplements, herbal personal care products, and rejuvenating skin and hair care solutions.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555' }}>
            Natural supplements, herbal products, skin care, hair care, organic beauty, wellness products, holistic health, cruelty-free. </Text>
            <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
              Thank you for choosing JonoJivan. We look forward to serving you with the best shopping experience.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              Best regards,
              <br />
              The JonoJivan Team
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }
  
  export default WelcomeEmail;
  