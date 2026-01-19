import { Container, Title, Text, Button, Box, Stack } from '@mantine/core';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <Box 
      py={120} 
      style={{ 
        background: '#020408', 
        position: 'relative', 
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.03)'
      }}
    >
      <Box style={{ 
        position: 'absolute', top: '50%', left: '50%', 
        width: '600px', height: '600px', 
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }} />

      <Container size="lg" style={{ position: 'relative', zIndex: 2 }}>
        <Stack align="center" gap="xl">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Box style={{ 
              border: '1px solid rgba(16, 185, 129, 0.3)', 
              padding: '6px 18px', 
              borderRadius: '50px', 
              background: 'rgba(16, 185, 129, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles size={14} color="#10B981" />
              <Text size="xs" fw={800} style={{ color: '#10B981', letterSpacing: 2, textTransform: 'uppercase' }}>
                Ready to Transform?
              </Text>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Title style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              textAlign: 'center', 
              color: 'white', 
              lineHeight: 1.1, 
              fontWeight: 900,
              maxWidth: 900
            }}>
              Enough Reading, <span style={{ 
                background: 'linear-gradient(90deg, #10B981, #2DD4BF)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>Let's Start Growing.</span>
            </Title>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Text size="lg" style={{ color: '#888', textAlign: 'center', maxWidth: 650, lineHeight: 1.6 }}>
              Get a free comprehensive audit of your digital presence and discover untapped growth opportunities.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <Button 
              size="xl" 
              radius="md" 
              variant="gradient"
              gradient={{ from: '#10B981', to: '#2DD4BF', deg: 90 }}
              rightSection={<ArrowRight size={20} />}
              style={{ 
                height: '60px', 
                padding: '0 40px', 
                fontSize: '16px', 
                fontWeight: 800,
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' 
              }}
            >
              Book Your Free Audit
            </Button> */}
          </motion.div>

        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;