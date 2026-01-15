import { Container, Title, Text, Box, Group, Stack, SimpleGrid, Paper } from '@mantine/core';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: "01",
    title: "Strategy",
    desc: "We analyze your business, competitors, and target audience to craft a winning digital strategy.",
    icon: Lightbulb,
    color: "#3b82f6" // Blue Icon
  },
  {
    id: "02",
    title: "Execution",
    desc: "Our team implements the strategy with precision, launching campaigns across all channels.",
    icon: Rocket,
    color: "#3b82f6"
  },
  {
    id: "03",
    title: "Growth",
    desc: "We track, optimize, and scale your results to maximize ROI and sustainable growth.",
    icon: TrendingUp,
    color: "#3b82f6"
  }
];

const Process = () => {
  return (
    <Box py={100} style={{ background: '#020408', position: 'relative' }}>
      <Container size="lg">
        
        {/* Header Section */}
        <Stack align="center" mb={80} gap={5}>
          <Text size="xs" fw={800} style={{ color: '#3b82f6', letterSpacing: '3px', textTransform: 'uppercase' }}>
            How We Work
          </Text>
          <Title order={2} style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800 }}>
            Our <span style={{ color: '#3b82f6' }}>Process</span>
          </Title>
          <Text c="dimmed" size="sm" fw={500} ta="center" style={{ maxWidth: 500 }}>
            A proven 3-step approach that delivers measurable results
          </Text>
        </Stack>

        {/* Process Cards Grid */}
        <SimpleGrid 
          cols={{ base: 1, md: 3 }} 
          spacing={0} 
          style={{ position: 'relative' }}
        >
          {steps.map((step, index) => (
            <Box key={step.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                style={{ width: '100%', padding: '0 15px' }}
              >
                <Paper
                  p={40}
                  radius="24px"
                  style={{
                    background: '#0A0A0A',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    height: '100%',
                    minHeight: '320px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)')}
                >
                  {/* BIG BACKGROUND NUMBER (Matching Screenshot) */}
                  <Text style={{ 
                    position: 'absolute', top: 20, left: 30, 
                    fontSize: '7rem', fontWeight: 900, 
                    color: '#10B981', // Emerald Green Numbers
                    opacity: 0.1, zIndex: 0, userSelect: 'none',
                    lineHeight: 1
                  }}>
                    {step.id}
                  </Text>

                  {/* ICON BOX */}
                  <Box mb={30} style={{ 
                    width: '55px', height: '55px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(59, 130, 246, 0.03)', 
                    border: '2px solid #3b82f6', // Blue Border from Screenshot
                    position: 'relative', zIndex: 1,
                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
                  }}>
                    <step.icon size={24} color="#3b82f6" />
                  </Box>

                  {/* CONTENT */}
                  <Stack gap="sm" style={{ position: 'relative', zIndex: 1 }}>
                    <Title order={3} style={{ color: 'white', fontWeight: 800, fontSize: '1.6rem' }}>
                      {step.title}
                    </Title>
                    <Text size="sm" style={{ color: '#888', lineHeight: 1.6 }}>
                      {step.desc}
                    </Text>
                  </Stack>
                </Paper>
              </motion.div>

              {/* CONNECTING ARROW (Between Cards - Visible on Desktop) */}
              {index < steps.length - 1 && (
                <Box visibleFrom="md" style={{ 
                  position: 'absolute', right: -12, zIndex: 10,
                  display: 'flex', alignItems: 'center'
                }}>
                  <ArrowRight size={20} color="#3b82f6" style={{ opacity: 0.4 }} />
                </Box>
              )}

            </Box>
          ))}
        </SimpleGrid>

      </Container>
    </Box>
  );
};

export default Process;