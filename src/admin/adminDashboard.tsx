import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Group,
  Title,
  Text,
  ActionIcon,
  Modal,
  TextInput,
  Select,
  Stack,
  Image,
  Box,
  Paper,
  Badge,
  Container,
  FileButton,
  UnstyledButton,
  Loader,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  type RecordData,
  getProfile,
  updateProfile,
  type ProfileData,
} from "../api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      result: "",
      imageUrl: "",
      videoUrl: "",
      link: "",
    },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      setProjects(res.data);
    } catch {
      toast.error("Could not sync with Database ");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    setProfileLoading(true);
    try {
      const res = await getProfile();
      setProfile(res.data);
    } catch {
      toast.error("Could not fetch profile info");
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully! ✨");
    navigate("/admin/login", { replace: true });
  };

  const handleImageUpload = async (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch(
          "https://digi-media-skill-backend.onrender.com/upload",
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();
        if (data.url) {
          form.setFieldValue("imageUrl", data.url);
          toast.success("Image uploaded to Cloudinary!");
        } else {
          toast.error("Image upload failed!");
        }
      } catch {
        toast.error("Image upload failed!");
      }
    }
  };

  const handleVideoUpload = async (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch(
          "https://digi-media-skill-backend.onrender.com/upload",
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();
        if (data.url) {
          form.setFieldValue("videoUrl", data.url);
          toast.success("Video uploaded to Cloudinary!");
        } else {
          toast.error("Video upload failed!");
        }
      } catch {
        toast.error("Video upload failed!");
      }
    }
  };

  const handleSave = async (values: typeof form.values) => {
    // No field is mandatory now
    try {
      if (editingId) {
        await updateProject(editingId, values as RecordData);
        toast.success("Masterpiece Updated! ");
      } else {
        await addProject(values as RecordData);
        toast.success("Project Added to Cloud! ");
      }
      fetchData();
      setModalOpen(false);
      setEditingId(null);
      form.reset();
    } catch {
      toast.error("Server error: Save failed ");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Remove this masterpiece from Database?")) {
      try {
        await deleteProject(id);
        toast.success("Deleted from Cloud");
        fetchData();
      } catch {
        toast.error("Delete failed ");
      }
    }
  };

  const handleProfileSave = async (values: Partial<ProfileData>) => {
    setProfileLoading(true);
    try {
      await updateProfile({ ...values, avatar: avatarFile });
      toast.success("Profile updated!");
      fetchProfile();
      setAvatarFile(null);
    } catch {
      toast.error("Profile update failed");
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <Box
      p="xl"
      style={{ background: "#050505", minHeight: "100vh", color: "white" }}
    >
      <Toaster position="top-right" />

      <Container size="xl">
        <Group justify="space-between" mb={50}>
          <Group gap="xs">
            <Box
              style={{
                background: "#10B981",
                padding: "8px",
                borderRadius: "12px",
              }}
            >
              <ShieldCheck size={24} color="white" />
            </Box>
            <Box>
              <Title order={2} style={{ letterSpacing: -1, lineHeight: 1 }}>
                Command <span style={{ color: "#10B981" }}>Center</span>
              </Title>
              <Text size="8px" fw={800} c="dimmed" style={{ letterSpacing: 2 }}>
                PORTFOLIO CONTROL
              </Text>
            </Box>
          </Group>

          <Group>
            <Button
              leftSection={<Plus size={18} />}
              style={{ background: "#10B981" }}
              radius="md"
              onClick={() => {
                setEditingId(null);
                form.reset();
                setModalOpen(true);
              }}
            >
              Add Project
            </Button>

            <Button
              variant="subtle"
              color="red"
              leftSection={<LogOut size={18} />}
              onClick={handleLogout}
              style={{ fontWeight: 800 }}
            >
              Logout
            </Button>
          </Group>
        </Group>

        <Paper
          p="xl"
          radius="32px"
          style={{
            background: "linear-gradient(135deg, #0A0A0A 60%, #10B981 100%)",
            border: "1px solid #10B98133",
            boxShadow: "0 8px 32px 0 rgba(16,185,129,0.12)",
          }}
        >
          {loading ? (
            <Center p={100}>
              <Loader color="teal" />
            </Center>
          ) : (
            <Table
              verticalSpacing="lg"
              horizontalSpacing="xl"
              variant="unstyled"
            >
              <Table.Thead>
                <Table.Tr style={{ borderBottom: "1px solid #111" }}>
                  <Table.Th style={{ color: "#444", fontSize: "10px" }}>
                    PREVIEW
                  </Table.Th>
                  <Table.Th style={{ color: "#444", fontSize: "10px" }}>
                    TITLE
                  </Table.Th>
                  <Table.Th style={{ color: "#444", fontSize: "10px" }}>
                    METRIC
                  </Table.Th>
                  <Table.Th
                    style={{
                      color: "#444",
                      fontSize: "10px",
                      textAlign: "right",
                    }}
                  >
                    ACTIONS
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {projects.map((item) => (
                  <Table.Tr
                    key={item._id}
                    style={{
                      borderBottom: "1px solid #10B98133",
                      background: "rgba(16,185,129,0.03)",
                    }}
                  >
                    <Table.Td>
                      <Image
                        src={item.imageUrl}
                        w={70}
                        h={45}
                        radius="md"
                        style={{ boxShadow: "0 2px 8px #10B98133" }}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Text
                        fw={800}
                        size="sm"
                        style={{ color: "#fff", fontWeight: 700 }}
                      >
                        {item.title}
                      </Text>
                      <Badge
                        variant="dot"
                        color="teal"
                        size="xs"
                        style={{ marginTop: 4, fontWeight: 600 }}
                      >
                        {item.category}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text
                        c="emerald.4"
                        fw={900}
                        fs="italic"
                        style={{ color: "#10B981", fontWeight: 700 }}
                      >
                        {item.result}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group justify="flex-end" gap="xs">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => {
                            setEditingId(item._id!);
                            form.setValues(item);
                            setModalOpen(true);
                          }}
                        >
                          <Pencil size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(item._id!)}
                        >
                          <Trash2 size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Paper>
      </Container>

      {/* Profile Management Section */}
      <Paper
        p="xl"
        radius="lg"
        mb={40}
        style={{
          background: "#181a1b",
          border: "1px solid #10B98133",
          maxWidth: 500,
        }}
      >
        <Title order={3} mb={16} style={{ color: "#10B981" }}>
          Profile Info
        </Title>
        {profileLoading ? (
          <Loader color="teal" />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleProfileSave({
                name: (e.target as any).name.value,
                title: (e.target as any).title.value,
                intro: (e.target as any).intro.value,
              });
            }}
          >
            <Stack gap="md">
              <Group>
                <Image
                  src={
                    avatarFile
                      ? URL.createObjectURL(avatarFile)
                      : profile?.avatarUrl
                  }
                  width={80}
                  height={80}
                  radius={40}
                  alt="Profile Avatar"
                  style={{ objectFit: "cover", border: "2px solid #10B981" }}
                />
                <FileButton
                  onChange={setAvatarFile}
                  accept="image/png,image/jpeg"
                >
                  {(props) => (
                    <Button
                      {...props}
                      leftSection={<Upload size={16} />}
                      variant="outline"
                      color="teal"
                    >
                      {avatarFile ? "Change" : "Upload"} Avatar
                    </Button>
                  )}
                </FileButton>
              </Group>
              <TextInput
                label="Name"
                name="name"
                defaultValue={profile?.name || ""}
                required
              />
              <TextInput
                label="Title"
                name="title"
                defaultValue={profile?.title || ""}
                required
              />
              <TextInput
                label="Intro"
                name="intro"
                defaultValue={profile?.intro || ""}
              />
              <Button type="submit" color="teal" loading={profileLoading}>
                Save Profile
              </Button>
            </Stack>
          </form>
        )}
      </Paper>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          <span style={{ color: "#10B981", fontWeight: 900, fontSize: 22 }}>
            MANAGE PORTFOLIO ITEM
          </span>
        }
        centered
        radius="24px"
        styles={{
          content: {
            background: "#0A0A0A",
            color: "white",
            border: "1px solid #222",
          },
          header: { background: "#0A0A0A" },
        }}
      >
        <form onSubmit={form.onSubmit(handleSave)}>
          <Stack gap="md">
            <Box
              style={{
                border: "2px dashed #10B981",
                borderRadius: "16px",
                padding: "20px",
                textAlign: "center",
                background: "rgba(16,185,129,0.03)",
              }}
            >
              <Group justify="center" gap="md">
                <FileButton
                  onChange={handleImageUpload}
                  accept="image/png,image/jpeg"
                >
                  {(props) => (
                    <UnstyledButton {...props} style={{ width: "100%" }}>
                      {form.values.imageUrl ? (
                        <Image
                          src={form.values.imageUrl}
                          h={120}
                          w="auto"
                          mx="auto"
                          radius="md"
                          style={{
                            boxShadow: "0 2px 8px #10B98133",
                            border: "2px solid #10B981",
                          }}
                        />
                      ) : (
                        <Stack align="center" gap={5}>
                          <Upload size={30} color="#10B981" />
                          <Text size="xs" fw={700} c="dimmed">
                            UPLOAD IMAGE
                          </Text>
                        </Stack>
                      )}
                    </UnstyledButton>
                  )}
                </FileButton>
                <FileButton
                  onChange={handleVideoUpload}
                  accept="video/mp4,video/webm,video/ogg"
                >
                  {(props) => (
                    <UnstyledButton {...props} style={{ width: "100%" }}>
                      {form.values.videoUrl ? (
                        <video
                          src={form.values.videoUrl}
                          height={120}
                          style={{
                            display: "block",
                            margin: "0 auto",
                            borderRadius: 8,
                            boxShadow: "0 2px 8px #10B98133",
                            border: "2px solid #10B981",
                          }}
                          controls
                        />
                      ) : (
                        <Stack align="center" gap={5}>
                          <Upload size={30} color="#10B981" />
                          <Text size="xs" fw={700} c="dimmed">
                            UPLOAD VIDEO
                          </Text>
                        </Stack>
                      )}
                    </UnstyledButton>
                  )}
                </FileButton>
              </Group>
            </Box>
            <TextInput
              label="Title"
              styles={inputStyles}
              {...form.getInputProps("title")}
            />
            <Select
              label="Category"
              data={["Web Design", "SEO", "SMM", "Strategy"]}
              styles={inputStyles}
              {...form.getInputProps("category")}
            />
            <TextInput
              label="Key Result"
              styles={inputStyles}
              {...form.getInputProps("result")}
            />
            <TextInput
              label="Project Link"
              styles={inputStyles}
              {...form.getInputProps("link")}
            />
            <Button
              fullWidth
              mt="xl"
              size="lg"
              style={{ background: "#10B981" }}
              type="submit"
            >
              COMMIT CHANGES
            </Button>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={profileLoading}
        onClose={() => setProfileLoading(false)}
        title={
          <span style={{ color: "#10B981", fontWeight: 900, fontSize: 22 }}>
            PROFILE MANAGEMENT
          </span>
        }
        centered
        radius="24px"
        styles={{
          content: {
            background: "#0A0A0A",
            color: "white",
            border: "1px solid #222",
          },
          header: { background: "#0A0A0A" },
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            handleProfileSave({
              name: (form.name as any).value,
              title: (form.title as any).value,
              intro: (form.intro as any).value,
            });
          }}
        >
          <Stack gap="md">
            <Box
              style={{
                border: "2px dashed #10B981",
                borderRadius: "16px",
                padding: "20px",
                textAlign: "center",
                background: "rgba(16,185,129,0.03)",
              }}
            >
              <Group justify="center" gap="md">
                <FileButton
                  onChange={handleImageUpload}
                  accept="image/png,image/jpeg"
                >
                  {(props) => (
                    <UnstyledButton {...props} style={{ width: "100%" }}>
                      {form.values.imageUrl ? (
                        <Image
                          src={form.values.imageUrl}
                          h={120}
                          w="auto"
                          mx="auto"
                          radius="md"
                          style={{
                            boxShadow: "0 2px 8px #10B98133",
                            border: "2px solid #10B981",
                          }}
                        />
                      ) : (
                        <Stack align="center" gap={5}>
                          <Upload size={30} color="#10B981" />
                          <Text size="xs" fw={700} c="dimmed">
                            UPLOAD IMAGE
                          </Text>
                        </Stack>
                      )}
                    </UnstyledButton>
                  )}
                </FileButton>
                <FileButton
                  onChange={handleVideoUpload}
                  accept="video/mp4,video/webm,video/ogg"
                >
                  {(props) => (
                    <UnstyledButton {...props} style={{ width: "100%" }}>
                      {form.values.videoUrl ? (
                        <video
                          src={form.values.videoUrl}
                          height={120}
                          style={{
                            display: "block",
                            margin: "0 auto",
                            borderRadius: 8,
                            boxShadow: "0 2px 8px #10B98133",
                            border: "2px solid #10B981",
                          }}
                          controls
                        />
                      ) : (
                        <Stack align="center" gap={5}>
                          <Upload size={30} color="#10B981" />
                          <Text size="xs" fw={700} c="dimmed">
                            UPLOAD VIDEO
                          </Text>
                        </Stack>
                      )}
                    </UnstyledButton>
                  )}
                </FileButton>
              </Group>
            </Box>
            <TextInput
              label="Name"
              styles={inputStyles}
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Title"
              styles={inputStyles}
              {...form.getInputProps("title")}
            />
            <TextInput
              label="Intro"
              styles={inputStyles}
              {...form.getInputProps("intro")}
            />
            <Button
              fullWidth
              mt="xl"
              size="lg"
              style={{ background: "#10B981" }}
              type="submit"
            >
              COMMIT CHANGES
            </Button>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
};

const inputStyles = {
  input: { background: "#050505", border: "1px solid #222", color: "white" },
  label: {
    color: "#666",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase" as any,
    marginBottom: "5px",
  },
};

export default AdminDashboard;
