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
  Skeleton, // Skeleton add kiya loading ke liye
} from "@mantine/core";
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
  const [loadingProfile, setLoadingProfile] = useState(true); // Image loading state
  const [opened, setOpened] = useState(false);
  const [modalMedia, setModalMedia] = useState<{
    type: "video" | "image";
    url: string;
  } | null>(null);

  const [showIntro, setShowIntro] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    // Artificial delay ko kam kar diya taake intro jaldi show ho
    setTimeout(() => setShowIntro(true), 50);
    setTimeout(() => setShowProjects(true), 800);

    getProfile()
      .then((res) => {
        setProfile(res.data);
        setLoadingProfile(false); // Data aate hi loading khatam
      })
      .catch(() => setLoadingProfile(false));

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
                gap={{ base: 30, md: 60 }}
                mb={80}
                align="center"
              >
                {/* Text Content */}
                <Box style={{ flex: 1.5, width: "100%" }}>
                  <Title
                    order={1}
                    style={{
                      fontWeight: 900,
                      fontSize: "clamp(32px, 8vw, 56px)",
                      color: "#fff",
                      marginBottom: 8,
                      lineHeight: 1.1,
                    }}
                  >
                    {profile?.name || "Mariam Faisal"}
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
                      maxWidth: "600px",
                      lineHeight: 1.7,
                    }}
                  >
                    {profile?.intro ||
                      "Dedicated Digital Marketing Manager with expertise in social media, SEO, and content creation."}
                  </Text>
                  <Button
                    size="lg"
                    radius="md"
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

                {/* Profile Image with Skeleton Fix */}
                <Box
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
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
                      minHeight: "350px", // Box pehle se bana rahega layout jump nahi karega
                    }}
                  >
                    {/* Jab tak URL nahi aata Skeleton dikhega */}
                    <Skeleton
                      visible={loadingProfile}
                      height="100%"
                      width="100%"
                    >
                      <Image
                        src={profile?.avatarUrl}
                        alt="Mariam Faisal"
                        // Ye properties image load fast karti hain
                        loading="eager"
                        fetchPriority="high"
                        style={{
                          width: "100%",
                          height: "auto",
                          minHeight: "350px",
                          objectFit: "cover",
                        }}
                      />
                    </Skeleton>
                  </Paper>
                </Box>
              </Flex>
            </div>
          )}
        </Transition>

        {/* Projects section (unchanged but kept for completeness) */}
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
