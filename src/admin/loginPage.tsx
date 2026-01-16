import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Paper, 
  Title, 
  Text, 
  Container, 
  Box, 
  Stack,
  Center,
  Image,
  Group
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import logoImg from '../assets/digi media.jpg'; 

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid professional email'),
      password: (value) => (value.length < 6 ? 'Security threshold not met' : null),
    },
  });

  const handleLogin = (values: typeof form.values) => {
    if (values.email === "admin@digimedia.com" && values.password === "admin123") {
      localStorage.setItem('isAdmin', 'true');
      toast.success('Access Granted! ✨');
      navigate('/admin/dashboard'); 
    } else {
      toast.error('Invalid Credentials! Access Denied.');
    }
  };

  return (
    <Box 
      style={{ 
        background: '#020408', 
        backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box style={{ 
        position: 'absolute', top: '10%', left: '-5%', width: '400px', height: '400px', 
        background: 'rgba(16, 185, 129, 0.06)', filter: 'blur(120px)', borderRadius: '50%' 
      }} />
      <Box style={{ 
        position: 'absolute', bottom: '10%', right: '-5%', width: '350px', height: '350px', 
        background: 'rgba(45, 212, 191, 0.06)', filter: 'blur(100px)', borderRadius: '50%' 
      }} />

      <Container size={420} style={{ position: 'relative', zIndex: 10 }}>
        
        <Center mb={40}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Group gap="md">
              <Image src={logoImg} w={45} h={45} radius="md"  />
              <Box>
                <Title order={1} style={{ color: 'white', fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>
                  Digi Media <span style={{ color: '#10B981' }}>Skill</span>
                </Title>
                <Text size="8px" fw={800} c="dimmed" style={{ letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 4 }}>
                  Think Unlimited
                </Text>
              </Box>
            </Group>
          </motion.div>
        </Center>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Paper 
            p={40} 
            radius="24px" 
            style={{ 
              background: 'rgba(10, 12, 16, 0.8)', 
              border: '1px solid rgba(16, 185, 129, 0.15)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <Stack align="center" gap={5} mb={30}>
              <ShieldCheck size={32} color="#10B981" />
              <Title order={3} style={{ color: 'white', fontWeight: 800 }}>Admin Portal</Title>
              <Text size="xs" c="dimmed" style={{ letterSpacing: 1.5, textTransform: 'uppercase' }}>
                System Authentication
              </Text>
            </Stack>

            <form onSubmit={form.onSubmit(handleLogin)}>
              <Stack gap="md">
                <TextInput 
                  label={<Text size="xs" fw={800} c="dimmed" mb={5}>ADMINISTRATOR EMAIL</Text>}
                  placeholder="admin@digimedia.com" 
                  required 
                  leftSection={<Mail size={16} color="#10B981" />}
                  styles={{ 
                    input: { 
                      background: 'rgba(0,0,0,0.4)', 
                      borderColor: 'rgba(16, 185, 129, 0.1)', 
                      color: 'white',
                      height: '50px',
                      borderRadius: '12px'
                    } 
                  }}
                  {...form.getInputProps('email')}
                />
                
                <PasswordInput 
                  label={<Text size="xs" fw={800} c="dimmed" mb={5}>SECURITY KEY</Text>}
                  placeholder="••••••••" 
                  required 
                  leftSection={<Lock size={16} color="#10B981" />}
                  styles={{ 
                    input: { 
                      background: 'rgba(0,0,0,0.4)', 
                      borderColor: 'rgba(16, 185, 129, 0.1)', 
                      color: 'white',
                      height: '50px',
                      borderRadius: '12px'
                    } 
                  }}
                  {...form.getInputProps('password')}
                />

                <Button 
                  fullWidth 
                  mt="xl" 
                  size="lg" 
                  radius="md"
                  variant="gradient"
                  gradient={{ from: '#059669', to: '#10B981', deg: 90 }} 
                  type="submit"
                  rightSection={<ArrowRight size={18} />}
                  style={{ 
                    height: '55px', 
                    fontWeight: 800,
                    fontSize: '14px',
                    letterSpacing: '1px',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' 
                  }}
                >
                  AUTHENTICATE ACCESS
                </Button>
              </Stack>
            </form>
          </Paper>
        </motion.div>

        <Center mt={40}>
          <Text size="xs" c="dimmed" fw={700} style={{ letterSpacing: 2 }}>
            DIGI MEDIA SKILL • COMMAND CENTER
          </Text>
        </Center>
      </Container>
    </Box>
  );
};

export default LoginPage;