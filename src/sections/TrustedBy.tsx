import { Box, Text, Container } from '@mantine/core';
import { motion } from 'framer-motion';

const companies = [
  "Meta", "Shopify", "Adobe", "Microsoft", "Stripe", 
  "Hubspot", "Google", "Salesforce", "Mailchimp", "Amazon"
];

const scrollingList = [...companies, ...companies, ...companies];

const TrustedBy = () => {
  return (
    <Box py={60} style={{ background: '#020408', overflow: 'hidden' }}>
      <Container size="lg">
        <Text 
          ta="center" 
          size="xs" 
          fw={800} 
          style={{ 
            color: '#10B981', 
            letterSpacing: '4px', 
            textTransform: 'uppercase', 
            opacity: 0.8,
            marginBottom: '40px'
          }}
        >
          TRUSTED BY INDUSTRY LEADERS
        </Text>
      </Container>

      <Box style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        
        <Box style={{ 
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', 
            background: 'linear-gradient(to right, #020408, transparent)', zIndex: 2 
        }} />
        <Box style={{ 
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', 
            background: 'linear-gradient(to left, #020408, transparent)', zIndex: 2 
        }} />

        <motion.div
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ 
            repeat: Infinity, 
            duration: 30, 
            ease: "linear" 
          }}
          style={{ display: 'flex', width: 'max-content', gap: '100px' }}
        >
          {scrollingList.map((name, index) => (
            <Text 
              key={index} 
              fw={900} 
              style={{ 
                color: 'white', 
                opacity: 0.15, 
                fontSize: 'clamp(24px, 4vw, 25px)',
                whiteSpace: 'nowrap',
                letterSpacing: '-1px',
                userSelect: 'none'
              }}
            >
              {name}
            </Text>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};

export default TrustedBy;