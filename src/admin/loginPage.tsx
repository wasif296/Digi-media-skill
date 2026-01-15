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
  Center
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password is too short' : null),
    },
  });

  const handleLogin = (values: typeof form.values) => {
  if (values.email === "admin@digimedia.com" && values.password === "admin123") {
    localStorage.setItem('isAdmin', 'true');
    
    navigate('/admin/dashboard'); 
  } else {
    toast.error('Invalid Credentials');
  }
};

  return (
    <Box 
      style={{ 
        background: '#050608', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box style={{ 
        position: 'absolute', top: '10%', left: '-5%', width: '400px', height: '400px', 
        background: 'rgba(37, 99, 235, 0.1)', filter: 'blur(120px)', borderRadius: '50%' 
      }} />
      <Box style={{ 
        position: 'absolute', bottom: '10%', right: '-5%', width: '350px', height: '350px', 
        background: 'rgba(6, 182, 212, 0.1)', filter: 'blur(100px)', borderRadius: '50%' 
      }} />

      <Container size={420} style={{ position: 'relative', zIndex: 10 }}>
        
        <Center mb={40} style={{ flexDirection: 'column' }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title order={1} style={{ color: 'white', fontWeight: 900, letterSpacing: -1 }}>
              Digi Media <span style={{ color: '#3b82f6' }}>Skill</span>
            </Title>
            <Box style={{ height: '3px', width: '40px', background: '#3b82f6', marginTop: '5px' }} />
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
              background: 'rgba(255, 255, 255, 0.02)', 
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <Stack align="center" gap={5} mb={30}>
              <ShieldCheck size={32} color="#06B6D4" />
              <Title order={3} style={{ color: 'white', fontWeight: 800 }}>Admin Portal</Title>
              <Text size="xs" c="dimmed" style={{ letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Secure Authentication
              </Text>
            </Stack>

            <form onSubmit={form.onSubmit(handleLogin)}>
              <Stack gap="md">
                <TextInput 
                  label={<Text size="xs" fw={700} c="dimmed">EMAIL ADDRESS</Text>}
                  placeholder="admin@digimedia.com"
                  required 
                  leftSection={<Mail size={16} color="#3b82f6" />}
                  styles={{ 
                    input: { 
                      background: 'rgba(0,0,0,0.4)', 
                      borderColor: 'rgba(255,255,255,0.1)', 
                      color: 'white',
                      height: '50px',
                      borderRadius: '12px'
                    } 
                  }}
                  {...form.getInputProps('email')}
                />
                
                <PasswordInput
                  label={<Text size="xs" fw={700} c="dimmed">SECURITY KEY</Text>}
                  placeholder="••••••••" 
                  required 
                  leftSection={<Lock size={16} color="#3b82f6" />}
                  styles={{ 
                    input: { 
                      background: 'rgba(0,0,0,0.4)', 
                      borderColor: 'rgba(255,255,255,0.1)', 
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
  radius="12px"
  variant="gradient"
  gradient={{ from: '#3b82f6', to: '#06b6d4', deg: 90 }} 
  onClick={() => navigate('/admin/dashboard')} 
  
  rightSection={<ArrowRight size={18} />}
  style={{ 
    height: '55px', 
    fontWeight: 800,
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' 
  }}
>
  LOGIN TO ADMIN PORTAL
</Button>
              </Stack>
            </form>
          </Paper>
        </motion.div>

        <Center mt={40}>
          <Text size="xs" c="dimmed" style={{ letterSpacing: 2 }}>
            © 2024 DIGI MEDIA SKILL
          </Text>
        </Center>
      </Container>
    </Box>
  );
};

export default LoginPage;
