import { useState, useEffect, useRef } from 'react';
import { Container, Title, Text, Box, Group, Button, Paper, Badge, Grid, Stack } from '@mantine/core';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

const PortfolioCard = ({ category, title, result, height, isLarge }: any) => (
  <motion.div 
    whileHover={{ y: -10 }} 
    transition={{ duration: 0.3 }}
    style={{ height: '100%' }}
  >
    <Paper
      p="xl"
      radius="32px"
      style={{
        height: `${height}px`,
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(10, 12, 16, 0.95))',
        border: '1px solid rgba(16, 185, 129, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Group justify="space-between" align="flex-start" style={{ zIndex: 2 }}>
        <Badge variant="outline" color="emerald" size="xs" radius="sm" style={{ letterSpacing: 1 }}>{category}</Badge>
        <Badge color="emerald" radius="xl" size="md" variant="filled" style={{ boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}>{result}</Badge>
      </Group>

      <Box style={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: isLarge ? '70%' : '85%', height: '35%', background: 'rgba(16, 185, 129, 0.03)',
        borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
         <TrendingUp size={isLarge ? 80 : 40} color="#10B981" opacity={0.15} />
      </Box>

      <Stack gap={15} style={{ zIndex: 2 }}>
        <Title order={3} style={{ color: 'white', fontSize: isLarge ? '1.8rem' : '1rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
          {title}
        </Title>
        <Button 
          variant="light" 
          color="emerald" 
          size="xs" 
          radius="md" 
          style={{ width: 'fit-content', background: 'rgba(16, 185, 129, 0.1)', fontWeight: 700 }}
          rightSection={<ArrowUpRight size={14}/>}
        >
          View Case Study
        </Button>
      </Stack>
    </Paper>
  </motion.div>
);

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Web Design", "SEO", "SMM"];

  return (
    <Box py={120} style={{ background: '#020408' }}>
      <Container size="xl">
        
        <Box mb={70} style={{ textAlign: 'center' }}>
          <Badge variant="dot" color="emerald" size="lg" mb="md">OUR IMPACT</Badge>
          <Title order={2} style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>
            Real Results for <span style={{ color: '#10B981' }}>Real Businesses</span>
          </Title>
          <Text c="dimmed" size="lg" mt="md" fw={500}>Transforming digital presence with measurable outcomes</Text>
        </Box>

        <Group justify="center" mb={60} gap="sm">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              radius="xl"
              variant={activeFilter === cat ? "filled" : "outline"}
              color={activeFilter === cat ? "emerald" : "gray"}
              style={{ 
                height: '42px', padding: '0 30px', fontWeight: 700,
                background: activeFilter === cat ? '#10B981' : 'transparent',
                borderColor: activeFilter === cat ? '#10B981' : '#1A1A1A',
                color: activeFilter === cat ? 'white' : '#666',
              }}
            >
              {cat}
            </Button>
          ))}
        </Group>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <PortfolioCard 
              category="Web Design"
              title="E-commerce Revenue Growth"
              result="+400% ROI"
              height={450}
              isLarge
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="xl" style={{ height: '100%' }}>
              <Group grow gap="xl">
                <PortfolioCard 
                  category="SEO"
                  title="Real Estate Leads"
                  result="500+ Leads"
                  height={215}
                />
                <PortfolioCard 
                  category="SMM"
                  title="Social Reach"
                  result="1.2M+ Reach"
                  height={215}
                />
              </Group>
              <PortfolioCard 
                category="Web Design"
                title="Custom Corporate Web Design"
                result="Optimized"
                height={215}
              />
            </Stack>
          </Grid.Col>
        </Grid>

        <Group justify="space-around" mt={150} wrap="nowrap" gap={100}>
           <div style={{ textAlign: 'center' }}>
             <Text fw={900} style={{ fontSize: 'clamp(2rem, 7vw, 5rem)', color: '#2DD4BF', lineHeight: 1, letterSpacing: '-4px' }}>
               <Counter value={500} />+
             </Text>
             <Text c="dimmed" fw={800} size="sm" style={{ letterSpacing: 3, marginTop: 15, textTransform: 'uppercase' }}>Milestones Done</Text>
           </div>

           <div style={{ textAlign: 'center' }}>
             <Text fw={900} style={{ fontSize: 'clamp(2rem, 7vw, 5rem)', color: '#2DD4BF', lineHeight: 1, letterSpacing: '-4px' }}>
               <Counter value={200} />+
             </Text>
             <Text c="dimmed" fw={800} size="sm" style={{ letterSpacing: 3, marginTop: 15, textTransform: 'uppercase' }}>Global Partners</Text>
           </div>

           <div style={{ textAlign: 'center' }}>
             <Text fw={900} style={{ fontSize: 'clamp(2rem, 7vw, 5rem)', color: '#2DD4BF', lineHeight: 1, letterSpacing: '-4px' }}>
               <Counter value={5} />+
             </Text>
             <Text c="dimmed" fw={800} size="sm" style={{ letterSpacing: 3, marginTop: 15, textTransform: 'uppercase' }}>Years of Expertise</Text>
           </div>
        </Group>

      </Container>
    </Box>
  );
};

export default Portfolio;