import { useState } from 'react';
import { Container, Title, Text, Box, Stack, TextInput, Textarea, Button, Group, UnstyledButton, Paper, Center, SimpleGrid } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Check, ArrowRight, ArrowLeft, MessageSquare, Target } from 'lucide-react';
import toast from 'react-hot-toast';
// --- API IMPORT ---
import { sendInquiryApi } from '../api'; 

const ContactForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    services: [] as string[],
    message: ''
  });

  const servicesList = ["SEO", "Google Ads", "Web Design", "Social Media", "Content Marketing", "Digital Strategy"];

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  // --- NODEMAILER BACKEND SENDING LOGIC ---
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Seedha aapka NestJS backend call hoga
      const res = await sendInquiryApi(formData);
      
      if (res.data.success) {
        toast.success("Inquiry Sent via Studio Backend! 🚀", {
          duration: 5000,
          style: { borderRadius: '12px', background: '#10B981', color: '#fff' },
        });
        
        // Reset form
        setStep(1);
        setFormData({ fullName: '', email: '', phone: '', company: '', services: [], message: '' });
      } else {
        toast.error("Backend Error: Could not process inquiry.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error("Connection Error: Server is not responding. ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={100} id="contact" style={{ background: '#020408' }}>
      <Container size={750}>
        
        {/* Header Section */}
        <Stack align="center" mb={60} gap={5}>
          <Box style={{ border: '1px solid rgba(45, 212, 191, 0.3)', padding: '5px 15px', borderRadius: '50px', background: 'rgba(45, 212, 191, 0.05)' }}>
             <Text size="xs" fw={800} c="#10B981" style={{ letterSpacing: 2 }}>GET STARTED</Text>
          </Box>
          <Title order={2} ta="center" style={{ color: 'white', fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-1.5px' }}>
            Let's <span style={{ color: '#2DD4BF' }}>Connect</span>
          </Title>
          <Text c="dimmed" ta="center" fw={500}>Tell us about your project in a few simple steps</Text>
        </Stack>

        {/* --- STEP INDICATORS (Line Fix) --- */}
        <Group justify="center" mb={60} gap={0} style={{ position: 'relative' }}>
           {[1, 2, 3].map((s) => (
             <Group key={s} gap={0}>
                <Box style={{ 
                  width: '45px', height: '45px', borderRadius: '50%',
                  background: step >= s ? '#10B981' : '#1A1A1A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `3px solid ${step >= s ? '#10B981' : '#333'}`,
                  transition: '0.4s', zIndex: 2
                }}>
                   {step > s ? <Check size={20} color="white" strokeWidth={3} /> : <Text fw={900} size="sm" c={step >= s ? "white" : "gray.6"}>{s}</Text>}
                </Box>
                {/* LINE FIX: Stops at step 3 */}
                {s < 3 && (
                  <Box style={{ width: '80px', height: '3px', background: step > s ? '#10B981' : '#1A1A1A', transition: '0.4s' }} />
                )}
             </Group>
           ))}
        </Group>

        {/* --- FORM BOX --- */}
        <Paper p={{ base: 30, md: 60 }} radius="32px" style={{ background: 'rgba(10, 10, 10, 0.7)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)' }}>
          <form>
            <AnimatePresence mode="wait">
              
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Stack gap={40}>
                    <Center><Stack align="center" gap={10}><User color="#2DD4BF" size={35}/><Title order={3} c="white" style={{ letterSpacing: '-0.5px' }}>Your Details</Title></Stack></Center>
                    <Stack gap="md">
                      <TextInput label="Full Name *" placeholder="Enter your full name" required styles={inputStyles} value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                      <TextInput label="Email Address *" placeholder="Enter your email address" required styles={inputStyles} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      <TextInput label="Phone Number" placeholder="Enter phone number" styles={inputStyles} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      <TextInput label="Company Name" placeholder="Enter company name" styles={inputStyles} value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                    </Stack>
                    <Group justify="flex-end">
                      <Button size="lg" radius="xl" color="emerald" rightSection={<ArrowRight size={18}/>} onClick={() => setStep(2)} style={{ background: '#10B981', padding: '0 40px' }}>Continue</Button>
                    </Group>
                  </Stack>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Stack gap={40}>
                    <Center><Stack align="center" gap={10}><Target color="#2DD4BF" size={35}/><Title order={3} c="white">Services Needed</Title><Text size="xs" c="dimmed">Select all that apply</Text></Stack></Center>
                    <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md">
                      {servicesList.map(service => (
                        <UnstyledButton 
                          key={service} 
                          onClick={() => toggleService(service)}
                          style={{
                            padding: '20px 10px', borderRadius: '16px', textAlign: 'center', border: '1px solid',
                            background: formData.services.includes(service) ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                            borderColor: formData.services.includes(service) ? '#10B981' : 'rgba(255,255,255,0.05)',
                            color: formData.services.includes(service) ? '#2DD4BF' : '#666',
                            transition: '0.3s', fontWeight: 800, fontSize: '13px'
                          }}
                        >
                          {service}
                        </UnstyledButton>
                      ))}
                    </SimpleGrid>
                    <Group justify="space-between" mt="xl">
                      <Button variant="subtle" color="gray" leftSection={<ArrowLeft size={18}/>} onClick={() => setStep(1)}>Back</Button>
                      <Button size="lg" radius="xl" color="emerald" onClick={() => setStep(3)} style={{ background: '#10B981', padding: '0 40px' }}>Continue</Button>
                    </Group>
                  </Stack>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Stack gap={40}>
                    <Center><Stack align="center" gap={10}><MessageSquare color="#2DD4BF" size={35}/><Title order={3} c="white">Project Details</Title><Text size="xs" c="dimmed">Tell us about your goals</Text></Stack></Center>
                    <Textarea placeholder="Describe your project here..." minRows={6} styles={inputStyles} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                    <Group justify="space-between" mt="xl">
                      <Button variant="subtle" color="gray" leftSection={<ArrowLeft size={18}/>} onClick={() => setStep(2)}>Back</Button>
                      <Button onSubmit={handleSendEmail} loading={loading} size="lg" radius="xl" color="emerald" type="submit" style={{ background: '#10B981', padding: '0 40px' }}>Submit Inquiry</Button>
                    </Group>
                  </Stack>
                </motion.div>
              )}

            </AnimatePresence>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

const inputStyles = {
  input: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: 'white',
    height: '60px',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: 600,
    '&:focus': { borderColor: '#10B981', background: 'rgba(0,0,0,0.5)' }
  },
  label: { color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' as any, letterSpacing: '1px' }
};

export default ContactForm;