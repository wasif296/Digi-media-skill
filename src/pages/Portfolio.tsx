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
  // Video modal state
  const [opened, setOpened] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);
  // Testimonials data
  const testimonials = [
    {
      name: "Elite Solutions CPA",
      feedback:
        "Professional, creative, and always delivers on time! Highly recommended.",
    },
    {
      name: "Fusion Food",
      feedback: "Our brand visibility improved drastically. Amazing work!",
    },
    {
      name: "Boss Cash Cars",
      feedback:
        "Great content and video editing. Helped us reach more customers.",
    },
  ];
  // Animation states
  const [showIntro, setShowIntro] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  // Animated skill index for sequential animation
  const [animatedSkillIdx, setAnimatedSkillIdx] = useState(-1);

  useEffect(() => {
    setTimeout(() => setShowIntro(true), 200);
    setTimeout(() => setShowProjects(true), 1200);
  }, []);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    getProfile()
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  useEffect(() => {
    setAnimatedSkillIdx(-1);
    const skillsCount = 7;
    let idx = 0;
    const interval = setInterval(() => {
      setAnimatedSkillIdx((prev) => {
        if (prev < skillsCount - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
      idx++;
    }, 180);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (item: RecordData) => {
    if (item.link) {
      window.open(item.link, "_blank");
    }
  };

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
      {/* Parallax background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: "linear-gradient(135deg, #020408 60%, #10B981 100%)",
          backgroundAttachment: "fixed",
          opacity: 0.15,
        }}
      />
      <Container size="lg">
        <Group mb={24}>
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
        {/* Animated Portfolio Header */}
        <Transition
          mounted={showIntro}
          transition="slide-up"
          duration={600}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Group align="center" gap={48} mb={48}>
                <Box style={{ flex: 1 }}>
                  <Title
                    order={1}
                    style={{
                      fontWeight: 900,
                      fontSize: 48,
                      color: "#fff",
                      marginBottom: 8,
                    }}
                  >
                    {profile?.name || "Your Name Here"}
                  </Title>
                  <Text
                    size="xl"
                    style={{
                      color: "#10B981",
                      fontWeight: 700,
                      marginBottom: 24,
                    }}
                  >
                    {profile?.title || "Digital Marketing Portfolio"}
                  </Text>
                  <Text
                    size="md"
                    style={{ color: "#cfcfcf", marginBottom: 32 }}
                  >
                    {profile?.intro ||
                      "Dedicated Digital Marketing Manager with expertise in social media, SEO, web development, and content creation."}
                  </Text>
                  <Button
                    size="lg"
                    radius="md"
                    style={{
                      background: "#0fb67f",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 20,
                      boxShadow: "0 0 16px #4ade1533",
                    }}
                    onClick={() => {
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      } else {
                        navigate("/#contact");
                      }
                    }}
                  >
                    Let's get started →
                  </Button>
                </Box>
                <Box
                  style={{ flex: 1, display: "flex", justifyContent: "center" }}
                >
                  <Image
                    src={
                      profile?.avatarUrl ||
                      "https://ui-avatars.com/api/?name=Your+Name"
                    }
                    width={220}
                    height={220}
                    radius={110}
                    alt="Profile Avatar"
                    style={{
                      objectFit: "cover",
                      border: "4px solid #10B981",
                      background: "#181a1b",
                    }}
                  />
                </Box>
              </Group>
            </div>
          )}
        </Transition>
        {/* Stylish Marquee Skills Section */}
        <Box
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            marginBottom: 48,
          }}
        >
          <Box
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "80px",
              background: "linear-gradient(to right, #020408, transparent)",
              zIndex: 2,
            }}
          />
          <Box
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "80px",
              background: "linear-gradient(to left, #020408, transparent)",
              zIndex: 2,
            }}
          />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            style={{
              display: "flex",
              width: "max-content",
              gap: "48px",
              alignItems: "center",
            }}
          >
            {scrollingSkills.map((skill, idx) => (
              <Paper
                key={idx}
                radius="md"
                shadow="sm"
                style={{
                  background: "#181a1b",
                  color: "#10B981",
                  fontWeight: 700,
                  padding: "16px 32px",
                  fontSize: 16,
                  border: "1px solid #10B98133",
                  cursor: "pointer",
                  opacity: 0.85,
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
              >
                {skill}
              </Paper>
            ))}
          </motion.div>
        </Box>
        {/* Portfolio Projects Section with Fade-in Animation */}
        <Transition
          mounted={showProjects}
          transition="fade"
          duration={700}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Title
                order={2}
                style={{
                  fontWeight: 800,
                  fontSize: 32,
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                Case Studies & Projects
              </Title>
              <SimpleGrid cols={3} spacing="xl" style={{ width: "100%" }}>
                {projects.map((item, idx) => (
                  <Transition
                    key={item._id || idx}
                    mounted={showProjects}
                    transition="pop"
                    duration={400 + idx * 100}
                    timingFunction="ease"
                  >
                    {(cardStyles) => (
                      <div style={{ position: "relative", ...cardStyles }}>
                        <Paper
                          radius="xl"
                          shadow="xl"
                          style={{
                            background:
                              "linear-gradient(135deg, #181a1b 60%, #10B981 100%)",
                            border: "1px solid rgba(16,185,129,0.15)",
                            overflow: "hidden",
                            padding: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minHeight: 340,
                            width: "100%",
                            cursor: item.link ? "pointer" : "default",
                            transition: "box-shadow 0.2s, transform 0.2s",
                            boxShadow: "0 8px 32px 0 rgba(16,185,129,0.12)",
                          }}
                          className="portfolio-card"
                          onClick={() => {
                            if (item.videoUrl) {
                              setModalVideoUrl(item.videoUrl!);
                              setOpened(true);
                            } else {
                              handleCardClick(item);
                            }
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.03)";
                            const overlay = e.currentTarget.querySelector(
                              ".portfolio-overlay",
                            ) as HTMLElement;
                            if (overlay) overlay.style.opacity = "1";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            const overlay = e.currentTarget.querySelector(
                              ".portfolio-overlay",
                            ) as HTMLElement;
                            if (overlay) overlay.style.opacity = "0";
                          }}
                        >
                          <Box
                            style={{
                              width: "100%",
                              aspectRatio: "16/9",
                              background: "#181a1b",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderBottom: "2px solid #10B981",
                              position: "relative",
                            }}
                          >
                            {item.videoUrl ? (
                              <Box style={{ width: "100%", height: "100%", position: "relative" }}>
                                <video
                                  src={item.videoUrl}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "16px 16px 0 0",
                                    boxShadow: "0 2px 12px #10B98133",
                                  }}
                                  muted
                                  playsInline
                                  poster={item.imageUrl || undefined}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(0,0,0,0.15)",
                                    borderRadius: "16px 16px 0 0",
                                    pointerEvents: "none",
                                  }}
                                >
                                  <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="24"
                                      fill="#10B981"
                                      fillOpacity="0.85"
                                    />
                                    <polygon
                                      points="20,16 34,24 20,32"
                                      fill="#fff"
                                    />
                                  </svg>
                                </div>
                              </Box>
                            ) : item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                w="100%"
                                h={180}
                                radius={16}
                                style={{
                                  objectFit: "cover",
                                  borderRadius: "16px 16px 0 0",
                                  boxShadow: "0 2px 12px #10B98133",
                                }}
                              />
                            ) : (
                              <Text c="dimmed">No Preview</Text>
                            )}
                            {/* Hover overlay */}
                            <div
                              className="portfolio-overlay"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: "rgba(16,185,129,0.85)",
                                color: "#fff",
                                opacity: 0,
                                transition: "opacity 0.3s",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: 700,
                                fontSize: 18,
                                borderRadius: "16px 16px 0 0",
                              }}
                            >
                              <div>{item.title || "Untitled"}</div>
                              <div style={{ fontSize: 14, marginTop: 4 }}>
                                {item.category}
                              </div>
                              {item.result && (
                                <div style={{ fontSize: 13, marginTop: 8 }}>
                                  {item.result}
                                </div>
                              )}
                            </div>
                          </Box>
                          <Box style={{ padding: 24, width: "100%" }}>
                            <Title
                              order={3}
                              style={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: 22,
                                marginBottom: 8,
                              }}
                            >
                              {item.title || "Untitled"}
                            </Title>
                            <Text
                              size="sm"
                              style={{
                                color: "#10B981",
                                fontWeight: 600,
                                marginTop: 4,
                                letterSpacing: 1,
                              }}
                            >
                              {item.category}
                            </Text>
                          </Box>
                        </Paper>
                      </div>
                    )}
                  </Transition>
                ))}
              </SimpleGrid>
            </div>
          )}
        </Transition>
      </Container>
      {/* Testimonials Section */}
      <Container size="lg" mt={80} mb={60}>
        <Title
          order={2}
          style={{
            fontWeight: 800,
            fontSize: 28,
            color: "#10B981",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          What Clients Say
        </Title>
        <SimpleGrid cols={3} spacing="xl">
          {testimonials.map((t, idx) => (
            <Paper
              key={idx}
              radius="md"
              shadow="xl"
              style={{
                background: "#181a1b",
                color: "#fff",
                padding: "32px 24px",
                border: "1px solid #10B98133",
                minHeight: 120,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              <Text style={{ fontStyle: "italic", marginBottom: 12 }}>
                "{t.feedback}"
              </Text>
              <Text style={{ color: "#10B981", fontWeight: 700 }}>
                {t.name}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
      <style>{`
        @media (max-width: 900px) {
          .portfolio-card {
            min-width: 100%;
            margin-bottom: 24px;
          }
          .mantine-SimpleGrid-root {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      {/* Video Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="lg"
        centered
        withCloseButton={true}
        title="Project Video"
        overlayProps={{ backgroundOpacity: 0.7, blur: 2 }}
      >
        {modalVideoUrl && (
          <video
            src={modalVideoUrl}
            style={{ width: "100%", borderRadius: 12 }}
            controls
            autoPlay
          />
        )}
      </Modal>
    </Box>
  );
};

export default Portfolio;
