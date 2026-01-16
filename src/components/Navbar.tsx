import { Group, Button, Container, Text, Image, Box, Burger, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logoImg from '../assets/digi media.jpg';

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      close(); 
    }
  };

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Industries', id: 'industries' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'About', id: 'footer' },   
    { label: 'Contact', id: 'contact' }, 
  ];

  return (
    <Box 
      component="nav"
      style={{ 
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        background: 'rgba(5, 6, 8, 0.8)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <Container size="lg" h={{ base: 70, md: 80 }}>
        <Group justify="space-between" h="100%" wrap="nowrap">
          
          <Group gap="xs" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            <Image src={logoImg} w={{ base: 32, md: 40 }} h={{ base: 32, md: 40 }} radius="md" />
            <Text fw={900} size="xl" style={{ color: 'white', letterSpacing: -0.5 }}>
              Digi Media <span style={{ color: '#10B981' }}>Skill</span>
            </Text>
          </Group>

          <Group gap="xl" visibleFrom="md">
            {navLinks.map((item) => (
              <Text 
                key={item.label} 
                onClick={() => scrollToSection(item.id)} 
                fw={600} 
                size="sm" 
                style={{ color: '#999', cursor: 'pointer', transition: '0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#10B981')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
              >
                {item.label}
              </Text>
            ))}
            <Button 
              variant="gradient" 
              gradient={{ from: '#059669', to: '#10B981', deg: 90 }}
              radius="md"
              px="xl"
              style={{ fontWeight: 800 }}
              onClick={() => scrollToSection('contact')} 
            >
              Get Started
            </Button>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color="#10B981" />

        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="80%" 
        padding="xl"
        title={
          <Group gap="xs">
            <Image src={logoImg} w={30} h={30} radius="md" />
            <Text fw={900} c="white">Digi Media <span style={{ color: '#10B981' }}>Skill</span></Text>
          </Group>
        }
        styles={{
          content: { background: '#050608', color: 'white' },
          header: { background: '#050608', borderBottom: '1px solid #1a1a1a' },
          close: { color: '#10B981' }
        }}
      >
        <Stack gap="lg" mt="xl">
          {navLinks.map((item) => (
            <Text 
              key={item.label} 
              fw={600} 
              size="lg" 
              onClick={() => scrollToSection(item.id)} 
              style={{ color: '#999', cursor: 'pointer' }}
            >
              {item.label}
            </Text>
          ))}
          
          <Button 
            fullWidth 
            variant="gradient" 
            gradient={{ from: '#059669', to: '#10B981' }} 
            radius="md" 
            size="lg"
            mt="xl"
            onClick={() => scrollToSection('contact')}
          >
            Get Started
          </Button>
        </Stack>
      </Drawer>

    </Box>
  );
};

export default Navbar;