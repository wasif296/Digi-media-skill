import { Container, Title, Text, Button, Group, Box, Stack, Paper, SimpleGrid, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, ArrowUpRight } from 'lucide-react';

const SmallStat = ({ label, value }: { label: string, value: string }) => (
  <Box p="sm" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
    <Group justify="space-between" mb={4} wrap="nowrap">
       <TrendingUp size={10} color="#10B981" />
       <ArrowUpRight size={8} color="#444" />
    </Group>
    <Text fw={800} size="sm" style={{ color: 'white' }}>{value}</Text>
    <Text size="8px" c="dimmed" fw={700} style={{ textTransform: 'uppercase' }}>{label}</Text>
  </Box>
);

const Hero = () => {
  return (
    <Container size="lg" pt={{ base: 120, md: 150 }} pb={{ base: 60, md: 100 }}>
      <Group justify="space-between" align="center" wrap="wrap" gap={50}>
        <Stack gap="lg" style={{ flex: 1, minWidth: '300px' }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Group gap={8} style={{ border: '1px solid rgba(16, 185, 129, 0.2)', padding: '4px 12px', borderRadius: '50px', background: 'rgba(16, 185, 129, 0.03)', width: 'fit-content' }} mx={{ base: 'auto', md: '0' }}>
              <Box w={5} h={5} style={{ background: '#10B981', borderRadius: '50%' }} />
              <Text size="xs" fw={700} style={{ color: '#10B981', letterSpacing: 1 }}>Premium Digital Agency</Text>
            </Group>
          </motion.div>
          <Box style={{ textAlign: 'center' }} ta={{ md: 'left' }}>
            <Title style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em' }}>
              Lift your Business <br /> to <span style={{ color: '#2DD4BF' }}>New Heights</span> <br /> 
              <Text component="span" inherit visibleFrom="sm">with Our Online Success</Text>
            </Title>
            <Text size="md" mt="lg" style={{ color: '#777', maxWidth: 450, margin: '0 auto' }} mx={{ md: '0' }}>
              Your Brand's Online Success Starts Here. Transforming businesses into market leaders.
            </Text>
          </Box>
          <Group gap="md" justify="center" style={{ width: '100%' }} wrap="wrap" justify-md="flex-start">
            <Button 
  size="lg" 
  radius="md" 
  w={{ base: '100%', sm: 'auto' }} 
  rightSection={<ArrowRight size={18} />} 
  style={{ background: '#10B981' }}
  onClick={() => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }}
>
  Book your free audit
</Button>
<Button 
  size="lg" 
  radius="md" 
  variant="outline" 
  w={{ base: '100%', sm: 'auto' }} 
  
  onClick={() => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }}
  
  leftSection={<Play size={14} fill="#10B981" color="#10B981" />} 
  style={{ border: '1px solid #1a1a1a', color: 'white', background: 'rgba(255,255,255,0.02)' }}
>
  View Work
</Button>          </Group>
        </Stack>
        <Box style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <Paper p={25} radius="24px" style={{ background: 'rgba(10, 12, 16, 0.8)', border: '1px solid rgba(16, 185, 129, 0.15)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', maxWidth: '450px' }}>
              <Group justify="space-between" mb={30}>
                <Group gap={6}><Box w={8} h={8} bg="emerald.7" style={{ borderRadius: '50%' }} /><Box w={8} h={8} bg="emerald.5" style={{ borderRadius: '50%' }} /><Box w={8} h={8} bg="emerald.3" style={{ borderRadius: '50%' }} /></Group>
                <Badge variant="outline" color="emerald.5" size="xs">Live Dashboard</Badge>
              </Group>
              <SimpleGrid cols={2} spacing="md">
                <SmallStat label="Traffic" value="+284%" />
                <SmallStat label="Leads" value="+1,247" />
                <SmallStat label="Revenue" value="+$52K" />
                <SmallStat label="Sales" value="+89%" />
              </SimpleGrid>
              <Box mt={30} style={{ height: '80px' }}><svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%' }}><path d="M0 80 Q 100 20 200 60 T 400 30" fill="none" stroke="#10B981" strokeWidth="3" /></svg></Box>
            </Paper>
          </motion.div>
        </Box>
      </Group>
    </Container>
  );
};
export default Hero;