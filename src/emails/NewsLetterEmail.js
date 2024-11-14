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
  
  function NewsLetterEmail({ fullName }) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Welcome to JonoJivan Grocery</title>
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
        <Preview>Welcome to JonoJivan Grocery, {fullName}! Get 10% off on your first purchase</Preview>
        <Section style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
          <Row style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
            <Heading as="h2" style={{ color: '#333' }}>
              Hello, {fullName}!
            </Heading>
            <Text style={{ fontSize: '16px', color: '#555' }}>
              Thank you for joining the JonoJivan Grocery family! We are excited to offer you a convenient and reliable way to shop for your grocery needs.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
              As a welcome gift, use the code <strong>JONOJIVAN10</strong> to enjoy 10% off on your first purchase!
            </Text>
            <Button
              href="https://www.jonojivan.com"
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                borderRadius: '5px',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              Start Shopping
            </Button>
            <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
              JonoJivan Grocery is committed to providing fresh, quality products at affordable prices. From fresh produce to household essentials, we have everything you need to make your life easier.
            </Text>
            <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
              Stay tuned for more exclusive offers, seasonal promotions, and updates on new arrivals!
            </Text>
            <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
              Warm regards,
              <br />
              The JonoJivan Grocery Team
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }
  
  export default NewsLetterEmail;
  