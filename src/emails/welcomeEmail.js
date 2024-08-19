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
          <title>Welcome to BlushBelle</title>
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
        <Preview>Welcome to Blush Belle, {fullName}!</Preview>
        <Section style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
          <Row style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
            <Heading as="h2" style={{ color: '#333' }}>
              Welcome, {fullName}!
            </Heading>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              We&apos;re thrilled to have you join Blush Belle, your go-to destination for all your shopping needs.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              At Blush Belle, we offer a wide variety of products, from the latest fashion trends to everyday essentials, all at competitive prices.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              Start exploring our vast selection of items and enjoy a seamless shopping experience with us.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
              Thank you for choosing Blush Belle. We look forward to serving you with the best shopping experience.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              Best regards,
              <br />
              The BlushBelle Team
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }
  
  export default WelcomeEmail;
  