import { Container, Title, Text, Box, Group, SimpleGrid, Paper, List, Button, ThemeIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { Award, Users, Rocket, Globe, Check } from 'lucide-react';

const stats = [
  { label: "Years Experience", value: "10+", icon: Award },
  { label: "Happy Clients", value: "500+", icon: Users },
  { label: "Projects Delivered", value: "1000+", icon: Rocket },
  { label: "Countries Served", value: "25+", icon: Globe },
];

const About = () => {
  return (
    <Box py={100} style={{ background: '#020408' }}>
      <Container size="lg">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap={60}>
          
          <Box style={{ flex: 1.2, minWidth: '300px' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box mb="md" style={{ border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 15px', borderRadius: '50px', background: 'rgba(16, 185, 129, 0.05)', width: 'fit-content' }}>
                <Text size="xs" fw={800} style={{ color: '#10B981', letterSpacing: 2 }}>ABOUT US</Text>
              </Box>

              <Title style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, fontWeight: 900 }}>
                Leading Digital Marketing <br /> Agency in <span style={{ color: '#2DD4BF' }}>Pakistan</span>
              </Title>

              <Text mt="xl" c="dimmed" size="md" style={{ lineHeight: 1.6, maxWidth: '600px' }}>
                Transforming Local/International Small Businesses into Market Leaders. We are not just an agency; we are your business partner in growth.
              </Text>
              <Text mt="md" c="dimmed" size="sm" style={{ lineHeight: 1.6, maxWidth: '600px', opacity: 0.6 }}>
                With a decade of expertise and a passion for innovation, we craft digital strategies that don't just meet expectations—they exceed them.
              </Text>

              <SimpleGrid cols={{ base: 2, sm: 4 }} mt={50} spacing="md">
                {stats.map((item, index) => (
                  <Paper 
                    key={index} 
                    p="md" 
                    radius="md" 
                    style={{ 
                      background: 'rgba(255,255,255,0.01)', 
                      border: '1px solid rgba(16, 185, 129, 0.1)',
                      textAlign: 'center'
                    }}
                  >
                    <item.icon size={20} color="#10B981" style={{ marginBottom: '10px' }} />
                    <Text fw={900} size="xl" style={{ color: '#10B981', lineHeight: 1 }}>{item.value}</Text>
                    <Text size="9px" fw={700} c="dimmed" mt={4} style={{ textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</Text>
                  </Paper>
                ))}
              </SimpleGrid>
            </motion.div>
          </Box>

          <Box style={{ flex: 0.8, minWidth: '320px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Paper 
                p={40} 
                radius="32px" 
                style={{ 
                  background: 'rgba(10, 12, 16, 0.8)', 
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
                }}
              >
                <Group mb="xl">
                  <Box style={{ background: '#10B981', padding: '10px', borderRadius: '12px' }}>
                    <Users size={24} color="white" />
                  </Box>
                  <Box>
                    <Text fw={800} c="white" size="sm">Your Growth Partner</Text>
                    <Text size="xs" c="dimmed">Dedicated to your success</Text>
                  </Box>
                </Group>

                <List
                  spacing="md"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="emerald" size={20} radius="xl" variant="light" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                      <Check size={12} strokeWidth={4} color="#10B981" />
                    </ThemeIcon>
                  }
                  style={{ color: '#ccc', fontWeight: 600 }}
                >
                  <List.Item>Data-Driven Strategies</List.Item>
                  <List.Item>Certified Professionals</List.Item>
                  <List.Item>Transparent Reporting</List.Item>
                  <List.Item>ROI Focused</List.Item>
                </List>

                <Button 
  fullWidth 
  mt={40} 
  size="lg" 
  radius="md" 
  variant="gradient"
  gradient={{ from: '#10B981', to: '#2DD4BF', deg: 90 }}
  
  // --- YE LINE ADD KAREIN ---
  onClick={() => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }}
  
  style={{ fontWeight: 800, boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}
>
  Partner With Us
</Button>
              </Paper>
            </motion.div>
          </Box>

        </Group>
      </Container>
    </Box>
  );
};

export default About;