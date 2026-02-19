import {
  Box,
  Container,
  Title,
  Text,
  SimpleGrid,
  Paper,
  Button,
  Group,
  Image,
  Transition,
  Modal,
} from "@mantine/core";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProjects,
  getProfile,
  type ProfileData,
  type RecordData,
} from "../api";

const Portfolio = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<RecordData[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [opened, setOpened] = useState(false);
  const [modalMedia, setModalMedia] = useState<{
    type: "video" | "image";
    url: string;
  } | null>(null);

  const [showIntro, setShowIntro] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowIntro(true), 200);
    setTimeout(() => setShowProjects(true), 1200);

    getProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
    getProfile()
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  const scrollingSkills = [
    "Web Development",
    "SEO",
    "Keyword Research",
    "Local SEO",
    "Social Media Management",
    "Canva Designing",
    "Video Editing",
  ];

  return (
    <Box
      style={{
        background: "#020408",
        backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        minHeight: "100vh",
        color: "white",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <Navbar />

      {/* Background Layer - Top fix */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "500px", // Sirf top area ke liye
          zIndex: 0,
          background: "linear-gradient(135deg, #020408 60%, #10B981 100%)",
          opacity: 0.15,
        }}
      />

      <Container
        size="lg"
        style={{ position: "relative", zIndex: 1, paddingTop: "40px" }}
      >
        {/* Back Button with enough space from Navbar */}
        <Group mb={40} mt={50}>
          <Button
            variant="outline"
            color="gray"
            radius="xl"
            size="md"
            onClick={() => navigate("/")}
            style={{ fontWeight: 700 }}
          >
            ← Back to Home
          </Button>
        </Group>

        {/* Profile Section - Spacing fixed */}
        <Transition mounted={showIntro} transition="slide-up" duration={600}>
          {(styles) => (
            <div style={styles}>
              <Group align="flex-start" gap={48} mb={80}>
                <Box style={{ flex: 1, paddingTop: "20px" }}>
                  <Title
                    order={1}
                    style={{
                      fontWeight: 900,
                      fontSize: 48,
                      color: "#fff",
                      marginBottom: 8,
                    }}
                  >
                    {profile?.name || "Digimedia skills"}
                  </Title>
                  <Text
                    size="xl"
                    style={{
                      color: "#10B981",
                      fontWeight: 700,
                      marginBottom: 24,
                    }}
                  >
                    {profile?.title || "Digital Marketing Manager"}
                  </Text>
                  <Text
                    size="md"
                    style={{
                      color: "#cfcfcf",
                      marginBottom: 32,
                      maxWidth: "500px",
                      lineHeight: 1.6,
                    }}
                  >
                    {profile?.intro ||
                      "Dedicated Digital Marketing Manager with expertise in social media, SEO, web development, and content creation."}
                  </Text>
                  <Button
                    size="lg"
                    radius="md"
                    style={{
                      background: "#10B981",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                    onClick={() => navigate("/#contact")}
                  >
                    Let's get started →
                  </Button>
                </Box>

                <Box
                  style={{ flex: 1, display: "flex", justifyContent: "center" }}
                >
                  <Paper
                    radius={20}
                    style={{
                      overflow: "hidden",
                      border: "4px solid #10B981",
                      background: "#181a1b",
                      width: "100%",
                      maxWidth: "500px",
                    }}
                  >
                    <Image
                      src={profile?.avatarUrl}
                      alt="Profile Avatar"
                      style={{
                        width: "100%",
                        height: "auto",
                        minHeight: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </Paper>
                </Box>
              </Group>
            </div>
          )}
        </Transition>

        {/* Projects Section - CLEAN NO TEXT VERSION */}
        <Box mt={60}>
          <Title
            order={2}
            mb={40}
            style={{ fontWeight: 800, fontSize: 32, color: "#fff" }}
          >
            Case Studies & Projects
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {projects.map((item, idx) => (
              <Transition
                key={item._id || idx}
                mounted={showProjects}
                transition="pop"
                duration={400 + idx * 100}
              >
                {(cardStyles) => (
                  <Paper
                    radius="xl"
                    style={{
                      ...cardStyles,
                      background: "#181a1b",
                      border: "2px solid rgba(16,185,129,0.2)",
                      overflow: "hidden",
                      height: 300,
                      cursor: "pointer",
                      transition: "transform 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                      e.currentTarget.style.borderColor = "#10B981";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.borderColor =
                        "rgba(16,185,129,0.2)";
                    }}
                    onClick={() => {
                      if (item.videoUrl) {
                        setModalMedia({ type: "video", url: item.videoUrl });
                        setOpened(true);
                      } else if (item.imageUrl) {
                        setModalMedia({ type: "image", url: item.imageUrl });
                        setOpened(true);
                      }
                    }}
                  >
                    <Box
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        background: "#000",
                      }}
                    >
                      {item.videoUrl ? (
                        <>
                          <video
                            src={item.videoUrl}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            muted
                            playsInline
                          />
                          <Box
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "rgba(0,0,0,0.2)",
                            }}
                          >
                            <svg width="50" height="50" viewBox="0 0 48 48">
                              <circle
                                cx="24"
                                cy="24"
                                r="24"
                                fill="#10B981"
                                fillOpacity="0.8"
                              />
                              <polygon
                                points="20,16 34,24 20,32"
                                fill="white"
                              />
                            </svg>
                          </Box>
                        </>
                      ) : (
                        <Image
                          src={item.imageUrl}
                          height="100%"
                          width="100%"
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </Box>
                  </Paper>
                )}
              </Transition>
            ))}
          </SimpleGrid>
        </Box>

        {/* Testimonials */}
        <Box mt={100} mb={100}>
          <Title order={2} ta="center" mb={40} c="#10B981">
            What Clients Say
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
            {[
              {
                name: "Elite Solutions CPA",
                feedback:
                  "Professional, creative, and always delivers on time!",
              },
              {
                name: "Fusion Food",
                feedback:
                  "Our brand visibility improved drastically. Amazing work!",
              },
              {
                name: "Boss Cash Cars",
                feedback: "Great content and video editing.",
              },
            ].map((t, i) => (
              <Paper
                key={i}
                p="xl"
                radius="md"
                style={{ background: "#181a1b", border: "1px solid #10B98133" }}
              >
                <Text fs="italic" mb={16} c="gray.3">
                  "{t.feedback}"
                </Text>
                <Text fw={700} c="#10B981">
                  — {t.name}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Box>
      </Container>

      {/* Media Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="lg"
        centered
        radius="md"
        overlayProps={{ blur: 3 }}
      >
        {modalMedia?.type === "video" ? (
          <video
            src={modalMedia.url}
            controls
            autoPlay
            style={{ width: "100%", borderRadius: 8 }}
          />
        ) : (
          <Image src={modalMedia?.url} radius="md" />
        )}
      </Modal>
    </Box>
  );
};

export default Portfolio;
