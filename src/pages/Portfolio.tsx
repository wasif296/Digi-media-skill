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
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../api";
import type { RecordData } from "../api";

const Portfolio = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<RecordData[]>([]);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  const handleCardClick = (item: RecordData) => {
    if (item.link) {
      window.open(item.link, "_blank");
    }
  };

  return (
    <Box
      style={{
        background: "#020408",
        backgroundImage:
          "linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        minHeight: "100vh",
        color: "white",
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
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
        <Title
          order={1}
          style={{
            fontWeight: 900,
            fontSize: 40,
            letterSpacing: -1,
            color: "#fff",
          }}
        >
          Our Portfolio
        </Title>
        <Text
          size="lg"
          style={{ color: "#cfcfcf", marginBottom: 32, marginTop: 8 }}
        >
          Watch our success stories
        </Text>
        <SimpleGrid cols={3} spacing="xl" style={{ width: "100%" }}>
          {projects.map((item, idx) => (
            <Paper
              key={item._id || idx}
              radius="xl"
              shadow="xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 320,
                width: "100%",
                cursor: item.link ? "pointer" : "default",
                transition: "box-shadow 0.2s",
              }}
              className="portfolio-card"
              onClick={() => handleCardClick(item)}
            >
              <Box
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "#181a1b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.videoUrl ? (
                  <video
                    src={item.videoUrl}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "16px 16px 0 0",
                    }}
                    controls
                  />
                ) : item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    w="100%"
                    h={180}
                    radius={16}
                    style={{
                      objectFit: "cover",
                      borderRadius: "16px 16px 0 0",
                    }}
                  />
                ) : (
                  <Text c="dimmed">No Preview</Text>
                )}
              </Box>
              <Box style={{ padding: 24, width: "100%" }}>
                <Title
                  order={3}
                  style={{ color: "#fff", fontWeight: 700, fontSize: 22 }}
                >
                  {item.title || "Untitled"}
                </Title>
                <Text
                  size="sm"
                  style={{ color: "#10B981", fontWeight: 600, marginTop: 4 }}
                >
                  {item.category}
                </Text>
              </Box>
            </Paper>
          ))}
        </SimpleGrid>
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
      </Container>
    </Box>
  );
};

export default Portfolio;
