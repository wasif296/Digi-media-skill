import { useState } from 'react';
import { Container, Title, Text, Box, Stack, Group, Avatar, ActionIcon, Paper } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Owner, The Grand Kitchen",
    content: "Their social media strategy filled our restaurant every night. The ROI has been incredible.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    name: "Kamran Malik",
    role: "CEO, Malik Real Estate",
    content: "Digi Media Skill transformed our property listings into lead-generating machines. Best in Pakistan!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    name: "Jessica Williams",
    role: "Marketing Manager, TechFlow",
    content: "The custom web design they provided is not only beautiful but extremely fast.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    name: "Ayesha Farooq",
    role: "Founder, TaxEase Services",
    content: "Building trust online for tax services is hard, but they made it look easy. Highly recommended!",
    // image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    name: "Zubair Khan",
    role: "Director, Khan & Sons",
    content: "From branding to SEO, they handled everything. Our dealership's online presence is now very strong.",
    // image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const next = () => setActive((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  const prev = () => setActive((current) => (current === 0 ? testimonials.length - 1 : current - 1));

  return (
    <Box py={80} style={{ background: '#020408' }}>
      <Container size="lg">
        
        {/* Header Section */}
        <Stack align="center" mb={50} gap={5}>
          <Box style={{ border: '1px solid #10B981', padding: '4px 15px', borderRadius: '50px', background: 'rgba(16, 185, 129, 0.05)' }}>
             <Text size="xs" fw={800} style={{ color: '#10B981', letterSpacing: 2 }}>TESTIMONIALS</Text>
          </Box>
          <Title order={2} ta="center" style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800 }}>
            What Our <span style={{ color: '#10B981' }}>Clients Say</span>
          </Title>
        </Stack>

        {/* --- COMPACT TESTIMONIAL CARD --- */}
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
          <Paper
            p={{ base: 30, md: 50 }} // Padding kam kar di
            radius="32px"
            style={{
              background: '#0A0A0A',
              border: '1px solid rgba(16, 185, 129, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '350px', // Height kam kar di
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'border-color 0.4s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)')}
          >
            {/* Quote Icon (Smaller & Green) */}
            <Box style={{ position: 'absolute', top: 30, left: 30, opacity: 0.1 }}>
               <Quote size={60} color="#10B981" />
            </Box>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%' }}
              >
                <Stack align="center" gap="lg">
                  <Avatar 
                    src={testimonials[active].image} 
                    size={80} // Avatar thora chota kiya
                    radius="100%" 
                    style={{ border: '3px solid rgba(16, 185, 129, 0.2)' }}
                  />

                  <Text style={{ 
                    color: 'white', 
                    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', // Font size balanced
                    fontWeight: 500, 
                    fontStyle: 'italic',
                    maxWidth: '700px',
                    lineHeight: 1.4
                  }}>
                    "{testimonials[active].content}"
                  </Text>

                  <Box>
                    <Text fw={900} size="lg" style={{ color: 'white' }}>{testimonials[active].name}</Text>
                    <Text fw={700} size="xs" style={{ color: '#10B981', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                      {testimonials[active].role}
                    </Text>
                  </Box>
                </Stack>
              </motion.div>
            </AnimatePresence>

            {/* --- NAVIGATION ARROWS (Green Hover) --- */}
            <Group gap="md" mt={40}>
              <ActionIcon 
                variant="outline" 
                size={45} 
                radius="xl" 
                onClick={prev}
                style={{ border: '1px solid #1a1a1a', background: 'rgba(255,255,255,0.02)', color: '#999' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#10B981')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
              >
                <ChevronLeft size={20} />
              </ActionIcon>
              <ActionIcon 
                variant="outline" 
                size={45} 
                radius="xl" 
                onClick={next}
                style={{ border: '1px solid #1a1a1a', background: 'rgba(255,255,255,0.02)', color: '#999' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#10B981')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
              >
                <ChevronRight size={20} />
              </ActionIcon>
            </Group>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials;