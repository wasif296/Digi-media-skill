import { Container, Title, Text, SimpleGrid, Paper, Box, Group, Stack } from '@mantine/core';
import { motion } from 'framer-motion';
import { Search, Globe, Megaphone, BarChart3, PenTool, Rocket, ArrowUpRight } from 'lucide-react';

const services = [
  { title: "SEO", desc: "Dominate search rankings with data-driven SEO strategies.", icon: Search, tags: ["Research", "On-Page", "Links"] },
  { title: "Google Ads", desc: "Maximize ROI with precision-targeted paid campaigns.", icon: Megaphone, tags: ["PPC", "Strategy", "A/B Test"] },
  { title: "Web Design", desc: "Stunning, conversion-optimized websites.", icon: Globe, tags: ["UI/UX", "Mobile", "Speed"] },
  { title: "SMM", desc: "Build brand presence across all platforms.", icon: BarChart3, tags: ["Content", "Ads", "Paid"] },
  { title: "Content", desc: "SEO-copywriting that tells your story.", icon: PenTool, tags: ["Blogs", "Copy", "Email"] },
  { title: "Digital Strategy", desc: "Comprehensive roadmaps for your goals.", icon: Rocket, tags: ["Analysis", "KPI", "Growth"] },
];

const Services = () => {
  return (
    <Box py={100} style={{ background: '#020408' }}>
      <Container size="lg">
        <Stack align="center" mb={60} gap="xs">
          <Box style={{ border: '1px solid #10B981', padding: '4px 15px', borderRadius: '50px', background: 'rgba(16, 185, 129, 0.05)' }}>
            <Text size="xs" fw={800} style={{ color: '#10B981', letterSpacing: 2 }}>OUR SERVICES</Text>
          </Box>
          <Title order={2} ta="center" style={{ color: 'white', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            What We <span style={{ color: '#2DD4BF' }}>Excel</span> At
          </Title>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {services.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: index * 0.1 }}
              
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 } 
              }}
            >
              <Paper 
                p="xl" 
                radius="24px" 
                style={{ 
                  background: 'rgba(255,255,255,0.01)', 
                  border: '1px solid rgba(16, 185, 129, 0.1)', 
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2DD4BF';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(16, 185, 129, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Box mb="xl" style={{ 
                  width: '45px', height: '45px', borderRadius: '12px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' 
                }}>
                  <item.icon size={20} color="#10B981" />
                </Box>

                <Title order={3} mb="sm" style={{ color: 'white', fontSize: '1.2rem' }}>{item.title}</Title>
                <Text size="sm" c="dimmed" mb="xl" style={{ lineHeight: 1.6 }}>{item.desc}</Text>

                <Group gap={6}>
                  {item.tags.map((tag) => (
                    <Box key={tag} style={{ 
                      padding: '3px 10px', borderRadius: '50px', 
                      background: 'rgba(255,255,255,0.02)', border: '1px solid #1a1a1a' 
                    }}>
                      <Text size="9px" fw={700} c="dimmed" style={{ textTransform: 'uppercase' }}>{tag}</Text>
                    </Box>
                  ))}
                </Group>

                <Box style={{ position: 'absolute', bottom: 20, right: 20, opacity: 0.2 }}>
                   <ArrowUpRight size={18} color="white" />
                </Box>
              </Paper>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Services;