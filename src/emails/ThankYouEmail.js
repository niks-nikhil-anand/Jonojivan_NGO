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

function ThankYouEmail({ donorName }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Your Generosity Has Changed a Life - Thank You</title>
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
      <Preview>Your Generosity Has Changed a Life - Thank You</Preview>
      <Section style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
        <Row style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
          <Heading as="h2" style={{ color: '#333' }}>
            Dear {donorName},
          </Heading>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            From the bottom of our hearts, thank you for your incredible generosity. Because of your donation, a young girl, a woman, or a child now has a chance to change the course of her life—thanks to you.
          </Text>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            When you gave, you didn’t just contribute money—you gave hope. You gave someone the chance to dream, to learn, to rise above their circumstances. Your gift is a powerful reminder that no act of kindness is too small, and it will forever leave a mark on the heart of someone in need.
          </Text>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            Thanks to you, education is no longer just a dream, but a reality for someone who once thought it was out of reach. Your belief in their potential will echo in every classroom, every lesson, and every opportunity they now have.
          </Text>
          <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
            We can’t express enough how much your support means to us and to those whose lives are forever changed by your kindness. You’ve made the world a brighter, better place, and we’re so proud to have you as part of our Bring Smile family.
          </Text>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            With deep gratitude,
            <br />
            Bring Smile Team
          </Text>
          <Text style={{ fontSize: '16px', color: '#555', marginTop: '20px' }}>
            {donorName}, your donation is already making a difference. We look forward to sharing the stories of hope and transformation that your generosity has inspired. Thank you again for making a lasting impact.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}

export default ThankYouEmail;
