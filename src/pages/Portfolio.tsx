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
  Flex,
  Stack,
} from "@mantine/core";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import maryamPic from "../assets/maryam.jpeg";
import { getProjects, type RecordData } from "../api";

const Portfolio = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<RecordData[]>([]);
  const [opened, setOpened] = useState(false);
  const [modalMedia, setModalMedia] = useState<{
    type: "video" | "image";
    url: string;
  } | null>(null);

  const [showIntro, setShowIntro] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowIntro(true), 50);
    setTimeout(() => setShowProjects(true), 800);

    getProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

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

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "500px",
          zIndex: 0,
          background: "linear-gradient(135deg, #020408 60%, #10B981 100%)",
          opacity: 0.15,
        }}
      />

      <Container
        size="lg"
        style={{ position: "relative", zIndex: 1, paddingTop: "40px" }}
      >
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

        <Transition mounted={showIntro} transition="slide-up" duration={600}>
          {(styles) => (
            <div style={styles}>
              <Flex
                direction={{ base: "column-reverse", md: "row" }}
                gap={{ base: 40, md: 60 }}
                mb={80}
                align="flex-start"
              >
                {/* Text Content Organized with Bold Headings */}
                <Box style={{ flex: 1.5, width: "100%" }}>
                  <Title
                    order={1}
                    style={{
                      fontWeight: 900,
                      fontSize: "clamp(32px, 8vw, 56px)",
                      color: "#fff",
                      marginBottom: 4,
                      lineHeight: 1.1,
                    }}
                  >
                    Mariam Faisal
                  </Title>
                  <Text
                    size="xl"
                    style={{
                      color: "#10B981",
                      fontWeight: 700,
                      marginBottom: 30,
                    }}
                  >
                    Digital Marketing Manager
                  </Text>

                  <Stack gap="lg" style={{ maxWidth: "650px" }}>
                    {/* PROFILE Section */}
                    <Box>
                      <Text
                        fw={800}
                        c="#10B981"
                        size="sm"
                        mb={5}
                        style={{ letterSpacing: "1px" }}
                      >
                        PROFILE
                      </Text>
                      <Text
                        size="md"
                        style={{ color: "#cfcfcf", lineHeight: 1.6 }}
                      >
                        Dedicated Digital Marketing Manager with experience in
                        social media management, video editing, SEO, and web
                        development. Skilled in creating engaging content,
                        managing business pages, and improving online presence
                        for brands across different industries.
                      </Text>
                    </Box>

                    {/* SKILLS Section */}
                    <Box>
                      <Text
                        fw={800}
                        c="#10B981"
                        size="sm"
                        mb={5}
                        style={{ letterSpacing: "1px" }}
                      >
                        SKILLS
                      </Text>
                      <Text
                        size="md"
                        style={{ color: "#cfcfcf", lineHeight: 1.6 }}
                      >
                        Web Development • SEO (Search Engine Optimization) •
                        Keyword Research • Local SEO • Social Media Management •
                        Canva Designing • Video Editing
                      </Text>
                    </Box>

                    {/* SERVICES Section */}
                    <Box>
                      <Text
                        fw={800}
                        c="#10B981"
                        size="sm"
                        mb={5}
                        style={{ letterSpacing: "1px" }}
                      >
                        SERVICES
                      </Text>
                      <Text
                        size="md"
                        style={{ color: "#cfcfcf", lineHeight: 1.6 }}
                      >
                        Social Media Management • Video Editing • Web
                        Development • SEO & Keyword Research • Content Creation
                      </Text>
                    </Box>

                    {/* WORK EXPERIENCE Section */}
                    <Box>
                      <Text
                        fw={800}
                        c="#10B981"
                        size="sm"
                        mb={8}
                        style={{ letterSpacing: "1px" }}
                      >
                        WORK EXPERIENCE
                      </Text>
                      <Stack gap="xs">
                        <Box>
                          <Text fw={700} c="white" size="sm">
                            Social Media Manager & Video Editor – Eat Anmol USA
                          </Text>
                          <Text size="sm" c="dimmed">
                            Managed social media platforms, created content, and
                            developed marketing strategies.
                          </Text>
                        </Box>
                        <Box>
                          <Text fw={700} c="white" size="sm">
                            E‑Commerce Marketing Specialist – HOMA Collection
                          </Text>
                          <Text size="sm" c="dimmed">
                            Handled e‑commerce marketing strategies and social
                            media ads to drive online sales.
                          </Text>
                        </Box>
                        <Box>
                          <Text fw={700} c="white" size="sm">
                            Digital Marketing – Go Filer
                          </Text>
                          <Text size="sm" c="dimmed">
                            Ran advertising campaigns to increase brand
                            visibility and engagement.
                          </Text>
                        </Box>
                        <Box>
                          <Text fw={700} c="white" size="sm">
                            Freelance Digital Marketer – Various Projects
                          </Text>
                          <Text size="sm" c="dimmed">
                            SEO, ad campaigns, and content creation for multiple
                            clients.
                          </Text>
                        </Box>
                        <Box>
                          <Text fw={700} c="white" size="sm">
                            Social Media Manager – Elite Solutions CPA
                          </Text>
                          <Text size="sm" c="dimmed">
                            Managed multiple social media pages, created
                            engaging posts, and edited professional videos.
                          </Text>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>

                  <Button
                    size="lg"
                    radius="md"
                    mt={40}
                    style={{
                      background: "#10B981",
                      color: "#fff",
                      fontWeight: 800,
                    }}
                    onClick={() => navigate("/#contact")}
                  >
                    Let's get started →
                  </Button>
                </Box>

                {/* Profile Image */}
                <Box
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    position: "sticky",
                    top: "100px",
                  }}
                >
                  <Paper
                    radius={24}
                    style={{
                      overflow: "hidden",
                      border: "4px solid #10B981",
                      background: "#181a1b",
                      width: "100%",
                      maxWidth: "400px",
                      boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    <Image
                      src={maryamPic}
                      alt="Mariam Faisal"
                      loading="eager"
                      fetchPriority="high"
                      style={{
                        width: "100%",
                        height: "auto",
                        minHeight: "350px",
                        objectFit: "cover",
                      }}
                    />
                  </Paper>
                </Box>
              </Flex>
            </div>
          )}
        </Transition>

        {/* Projects section */}
        <Box mt={60}>
          <Title
            order={2}
            mb={40}
            style={{
              fontWeight: 800,
              fontSize: "clamp(24px, 5vw, 36px)",
              color: "#fff",
            }}
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
                    }}
                    onClick={() => {
                      if (item.videoUrl)
                        setModalMedia({ type: "video", url: item.videoUrl });
                      else if (item.imageUrl)
                        setModalMedia({ type: "image", url: item.imageUrl });
                      setOpened(true);
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
      </Container>

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
