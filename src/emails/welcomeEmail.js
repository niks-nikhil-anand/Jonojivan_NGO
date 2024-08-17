import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
  } from '@react-email/components';
  
  function WelcomeEmail({ username, activationLink }) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Welcome to FlyingAlpha</title>
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
        <Preview>Welcome to FlyingAlpha!</Preview>
        <Section style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
          <Row style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
            <Heading as="h2" style={{ color: '#333' }}>Welcome, {username}!</Heading>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              We&apos;re excited to have you on board with FlyingAlpha, your trusted partner in real estate.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              At FlyingAlpha, we empower agents with seamless property listings and help customers effortlessly find properties for rent or purchase. Trust us to simplify your real estate journey with professionalism and ease.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              To get started, please click the button below to activate your account:
            </Text>
            <Section style={{ textAlign: 'center', margin: '20px 0' }}>
              <Button
                href={activationLink}
                style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                }}
              >
                Activate Account
              </Button>
            </Section>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              We will notify you once your account is active and ready to use.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
              Thank you for choosing FlyingAlpha. We look forward to helping you achieve your real estate goals.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              Best regards,
              <br />
              The FlyingAlpha Team
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }
  
  export default WelcomeEmail;
  