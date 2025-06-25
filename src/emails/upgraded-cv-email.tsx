import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';

interface UpgradedCvEmailProps {
  userName: string;
  downloadUrl: string;
}

export const UpgradedCvEmail = ({ userName, downloadUrl }: UpgradedCvEmailProps) => (
  <Html>
    <Head />
    <Preview>Your upgraded CV from CV Shop is ready!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Your Upgraded CV is Ready!</Heading>
        <Text style={paragraph}>Hi {userName},</Text>
        <Text style={paragraph}>
          Thank you for using CV Shop! Our experts have finished upgrading your CV. It's now polished, professional, and ready to help you land your next role.
        </Text>
        <Button style={button} href={downloadUrl}>
          Download Your Upgraded CV
        </Button>
        <Text style={paragraph}>
          Best of luck with your job search!
          <br />
          - The CV Shop Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default UpgradedCvEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
  textAlign: 'center' as const,
  color: '#1E3A8A',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  padding: '0 40px',
  color: '#525f7f',
};

const button = {
  backgroundColor: '#3B82F6',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '12px',
  margin: '20px auto',
};
