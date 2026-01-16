import { useState, useEffect } from 'react';
import { 
  Table, Button, Group, Title, Text, ActionIcon, Modal, 
  TextInput, Select, Stack, Image, Box, Paper, Badge, Container, FileButton, UnstyledButton 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Plus, Pencil, Trash2, Upload, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // --- 1. LOGOUT LOGIC (Security Fix) ---
  const handleLogout = () => {
    localStorage.removeItem('isAdmin'); // Security key mita di
    toast.success("Logged out successfully! ✨");
    navigate('/admin/login', { replace: true }); // replace: true history stack saaf kar deta hai
  };

  const form = useForm({
    initialValues: { title: '', category: 'Web Design', result: '', imageUrl: '', link: '' },
  });

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setFieldValue('imageUrl', reader.result as string);
        toast.success("Image Uploaded! 📸");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('digi_portfolio');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  const handleSave = (values: typeof form.values) => {
    if (!values.imageUrl) {
      toast.error("Upload image first!");
      return;
    }
    let updated;
    if (editingId !== null) {
      updated = projects.map(p => p.id === editingId ? { ...values, id: editingId } : p);
      toast.success("Project Updated! ✨");
    } else {
      updated = [{ ...values, id: Date.now() }, ...projects];
      toast.success("Project Added! 🚀");
    }
    setProjects(updated);
    localStorage.setItem('digi_portfolio', JSON.stringify(updated));
    setModalOpen(false);
    setEditingId(null);
    form.reset();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Remove this masterpiece?")) {
      const filtered = projects.filter(p => p.id !== id);
      setProjects(filtered);
      localStorage.setItem('digi_portfolio', JSON.stringify(filtered));
      toast.success("Deleted");
    }
  };

  return (
    <Box p="xl" style={{ background: '#050505', minHeight: '100vh', color: 'white' }}>
      <Toaster position="top-right" />
      
      <Container size="xl">
        {/* --- HEADER WITH LOGOUT --- */}
        <Group justify="space-between" mb={50}>
          <Group gap="xs">
            <Box style={{ background: '#10B981', padding: '8px', borderRadius: '12px' }}>
              <ShieldCheck size={24} color="white" />
            </Box>
            <Box>
              <Title order={2} style={{ letterSpacing: -1, lineHeight: 1 }}>
                Command <span style={{ color: '#10B981' }}>Center</span>
              </Title>
              <Text size="8px" fw={800} c="dimmed" style={{ letterSpacing: 2 }}>PORTFOLIO CONTROL</Text>
            </Box>
          </Group>

          <Group>
            <Button 
              leftSection={<Plus size={18}/>} 
              style={{ background: '#10B981' }} 
              radius="md"
              onClick={() => { setEditingId(null); form.reset(); setModalOpen(true); }}
            >
              Add Project
            </Button>
            
            {/* LOGOUT BUTTON */}
            <Button 
              variant="subtle" 
              color="red" 
              leftSection={<LogOut size={18}/>}
              onClick={handleLogout}
              style={{ fontWeight: 800 }}
            >
              Logout
            </Button>
          </Group>
        </Group>

        {/* --- TABLE --- */}
        <Paper p="xl" radius="32px" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid #1a1a1a' }}>
          <Table verticalSpacing="lg" horizontalSpacing="xl" variant="unstyled">
            <Table.Thead>
              <Table.Tr style={{ borderBottom: '1px solid #111' }}>
                <Table.Th style={{ color: '#444', fontSize: '10px' }}>PREVIEW</Table.Th>
                <Table.Th style={{ color: '#444', fontSize: '10px' }}>TITLE</Table.Th>
                <Table.Th style={{ color: '#444', fontSize: '10px' }}>METRIC</Table.Th>
                <Table.Th style={{ color: '#444', fontSize: '10px', textAlign: 'right' }}>ACTIONS</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {projects.map((item) => (
                <Table.Tr key={item.id} style={{ borderBottom: '1px solid #0a0a0a' }}>
                  <Table.Td><Image src={item.imageUrl} w={70} h={45} radius="md" /></Table.Td>
                  <Table.Td>
                    <Text fw={800} size="sm">{item.title}</Text>
                    <Badge variant="dot" color="teal" size="xs">{item.category}</Badge>
                  </Table.Td>
                  <Table.Td><Text c="emerald.4" fw={900} fs="italic">{item.result}</Text></Table.Td>
                  <Table.Td>
                    <Group justify="flex-end" gap="xs">
                      <ActionIcon variant="light" color="blue" onClick={() => { setEditingId(item.id); form.setValues(item); setModalOpen(true); }}><Pencil size={16}/></ActionIcon>
                      <ActionIcon variant="light" color="red" onClick={() => handleDelete(item.id)}><Trash2 size={16}/></ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Container>

      {/* --- MODAL --- */}
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="MANAGE CASE STUDY" centered radius="24px" styles={{ content: { background: '#0A0A0A', color: 'white', border: '1px solid #222' }, header: { background: '#0A0A0A' } }}>
        <form onSubmit={form.onSubmit(handleSave)}>
          <Stack gap="md">
            <Box style={{ border: '2px dashed #222', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <FileButton onChange={handleImageUpload} accept="image/png,image/jpeg">
                {(props) => (
                  <UnstyledButton {...props} style={{ width: '100%' }}>
                    {form.values.imageUrl ? <Image src={form.values.imageUrl} h={120} w="auto" mx="auto" radius="md" /> : <Stack align="center" gap={5}><Upload size={30} color="#10B981" /><Text size="xs" fw={700} c="dimmed">CLICK TO UPLOAD</Text></Stack>}
                  </UnstyledButton>
                )}
              </FileButton>
            </Box>
            <TextInput label="Title" required styles={inputStyles} {...form.getInputProps('title')} />
            <Select label="Category" data={['Web Design', 'SEO', 'SMM', 'Strategy']} styles={inputStyles} {...form.getInputProps('category')} />
            <TextInput label="Key Result" styles={inputStyles} {...form.getInputProps('result')} />
            <TextInput label="Project Link" styles={inputStyles} {...form.getInputProps('link')} />
            <Button fullWidth mt="xl" size="lg" style={{ background: '#10B981' }} type="submit">COMMIT CHANGES</Button>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
};

const inputStyles = { input: { background: '#050505', border: '1px solid #222', color: 'white' }, label: { color: '#666', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as any, marginBottom: '5px' } };

export default AdminDashboard;