import { useState, useEffect, useRef } from 'react';
import { Container, Title, Text, Box, Group, Button, Paper, Badge, Stack, SimpleGrid, Loader, Center } from '@mantine/core';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
// 1. API functions aur types import karein
import { getProjects, type RecordData } from '../api'; 

// --- ANIMATED COUNTER ---
const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => setDisplayValue(Math.floor(latest)));
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState<RecordData[]>([]); // Proper typing
  const [loading, setLoading] = useState(true);

  // --- 2. ASALI DATABASE SE DATA LOAD KARNA ---
  useEffect(() => {
    const fetchProjectsFromDB = async () => {
      try {
        setLoading(true);
        const res = await getProjects(); // Backend hit karega: http://localhost:5000/portfolio
        setProjects(res.data);
      } catch (err) {
        console.error("Database connection failed for portfolio:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectsFromDB();
  }, []);

  const categories = ["All", "Web Design", "SEO", "SMM"];
  
  const filteredProjects = projects.filter(p => 
    activeFilter === "All" ? true : p.category === activeFilter
  );

  return (
    <Box py={100} id="portfolio" style={{ background: '#020408' }}>
      <Container size="lg">
        
        {/* Header */}
        <Box mb={70} style={{ textAlign: 'center' }}>
          <Badge variant="dot" color="emerald" size="lg" mb="md">OUR IMPACT</Badge>
          <Title order={2} style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>
            Real Results for <span style={{ color: '#10B981' }}>Real Businesses</span>
          </Title>
        </Box>

        {/* Filters */}
        <Group justify="center" mb={60} gap="sm">
          {categories.map((cat) => (
            <Button
              key={cat}
              radius="xl"
              variant={activeFilter === cat ? "filled" : "outline"}
              color={activeFilter === cat ? "emerald" : "gray"}
              style={{ 
                height: '42px', padding: '0 30px', fontWeight: 700,
                background: activeFilter === cat ? '#10B981' : 'transparent',
                borderColor: activeFilter === cat ? '#10B981' : '#1A1A1A',
                color: activeFilter === cat ? 'white' : '#666',
              }}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </Button>
          ))}
        </Group>

        {/* --- DYNAMIC GRID --- */}
        {loading ? (
          <Center p={100}><Loader color="teal" size="xl" /></Center>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <motion.div 
                  key={p._id} // MongoDB uses _id
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper
                    p="xl"
                    radius="32px"
                    onClick={() => p.link && window.open(p.link, '_blank')}
                    style={{
                      height: '380px',
                      cursor: p.link ? 'pointer' : 'default',
                      position: 'relative',
                      overflow: 'hidden',
                      background: '#0A0A0A',
                      border: '1px solid rgba(16, 185, 129, 0.15)',
                    }}
                  >
                    {/* Background Image from DB */}
                    <Box style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `linear-gradient(to top, #020408 30%, transparent 90%), url(${p.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      zIndex: 1,
                      opacity: 0.7
                    }} />

                    {/* Content over image */}
                    <Stack justify="space-between" style={{ height: '100%', position: 'relative', zIndex: 2 }}>
                      <Group justify="space-between">
                        <Badge variant="outline" color="emerald" size="xs">{p.category}</Badge>
                        <Badge color="emerald" radius="xl" variant="filled">{p.result}</Badge>
                      </Group>

                      <Stack gap={10}>
                        <Title order={3} style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>
                          {p.title}
                        </Title>
                        <Button 
                          variant="light" 
                          color="emerald" 
                          size="xs" 
                          radius="md" 
                          style={{ width: 'fit-content', background: 'rgba(16, 185, 129, 0.1)' }}
                          rightSection={<ArrowUpRight size={14}/>}
                        >
                          View Project
                        </Button>
                      </Stack>
                    </Stack>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </SimpleGrid>
        )}

        {/* Animated Counters */}
        <Group justify="space-around" mt={120} wrap="wrap" gap={50}>
           <div style={{ textAlign: 'center' }}>
             <Text fw={900} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#2DD4BF', lineHeight: 1 }}>
               <Counter value={500} />+
             </Text>
             <Text c="dimmed" fw={700} size="xs" style={{ letterSpacing: 2, marginTop: 10, textTransform: 'uppercase' }}>Milestones Done</Text>
           </div>
           <div style={{ textAlign: 'center' }}>
             <Text fw={900} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#2DD4BF', lineHeight: 1 }}>
               <Counter value={200} />+
             </Text>
             <Text c="dimmed" fw={700} size="xs" style={{ letterSpacing: 2, marginTop: 10, textTransform: 'uppercase' }}>Happy Clients</Text>
           </div>
           <div style={{ textAlign: 'center' }}>
             <Text fw={900} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#2DD4BF', lineHeight: 1 }}>
               <Counter value={5} />+
             </Text>
             <Text c="dimmed" fw={700} size="xs" style={{ letterSpacing: 2, marginTop: 10, textTransform: 'uppercase' }}>Years Exp</Text>
           </div>
        </Group>

      </Container>
    </Box>
  );
};

export default Portfolio;