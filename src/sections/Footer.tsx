import {
  Container,
  Grid,
  Text,
  Stack,
  Group,
  ActionIcon,
  Divider,
  Box,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      py={60}
      style={{
        background: "#020408",
        borderTop: "1px solid rgba(255,255,255,0.03)",
      }}
    >
      <Container size="lg">
        <Grid gutter={50}>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="lg">
              <Box>
                <Text
                  fw={900}
                  size="24px"
                  style={{
                    background: "linear-gradient(90deg, #10B981, #2DD4BF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-1px",
                  }}
                >
                  Digi Media Skills
                </Text>
                <Text
                  mt="md"
                  c="dimmed"
                  size="sm"
                  style={{ maxWidth: "350px", lineHeight: 1.5, opacity: 0.6 }}
                >
                  Your trusted partner for digital marketing excellence.
                  Transforming businesses into digital success stories since day
                  one.
                </Text>
              </Box>

              <Group gap="sm">
                {[
                  {
                    icon: Instagram,
                    link: "https://www.instagram.com/digimediaskill/",
                  },
                  {
                    icon: Facebook,
                    link: "https://www.facebook.com/profile.php?id=61555963475713",
                  },
                  { icon: Linkedin, link: "#" },
                  { icon: Twitter, link: "#" },
                ].map((social, index) => (
                  <ActionIcon
                    key={index}
                    size={38}
                    radius="xl"
                    variant="outline"
                    // --- LINKS LOGIC ---
                    component={motion.a}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    // ------------------
                    style={{
                      borderColor: "rgba(255,255,255,0.1)",
                      background: "transparent",
                      color: "#777",
                      cursor: "pointer",
                    }}
                    whileHover={{
                      scale: 1.1,
                      borderColor: "#10B981",
                      color: "#10B981",
                    }}
                  >
                    <social.icon size={15} />
                  </ActionIcon>
                ))}
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="xl">
              <Text
                fw={700}
                size="sm"
                c="white"
                style={{ letterSpacing: "1px" }}
              >
                Quick Links
              </Text>
              <Stack gap="xs">
                {["Services", "About Us", "Industries", "Contact"].map(
                  (item) => (
                    <Text
                      key={item}
                      size="xs"
                      fw={500}
                      style={{
                        color: "#666",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#10B981")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#666")
                      }
                    >
                      {item}
                    </Text>
                  ),
                )}
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Stack gap="xl">
              <Text
                fw={700}
                size="sm"
                c="white"
                style={{ letterSpacing: "1px" }}
              >
                Contact Info
              </Text>
              <Stack gap="md">
                <Group gap="sm" wrap="nowrap">
                  <Mail size={16} color="#10B981" />
                  <Text size="xs" style={{ color: "#888" }}>
                    info@digimediaskills.com
                  </Text>
                </Group>
                <Group gap="sm" wrap="nowrap">
                  <Phone size={16} color="#10B981" />
                  <Text size="xs" style={{ color: "#888" }}>
                    +92 3352543404
                  </Text>
                </Group>
                <Group gap="sm" wrap="nowrap">
                  <MapPin size={16} color="#10B981" />
                  <Text size="xs" style={{ color: "#888" }}>
                    Pakistan
                  </Text>
                </Group>
                <Group gap="sm" wrap="nowrap">
                  <Instagram size={16} color="#10B981" />
                  <Text size="xs" style={{ color: "#888" }}>
                    @digimediaskill
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider mt={50} mb={25} color="rgba(255,255,255,0.03)" />

        <Group justify="space-between" wrap="wrap">
          <Text size="xs" c="dimmed" style={{ opacity: 0.5 }}>
            © {currentYear} Digi Media Skills. All rights reserved.
          </Text>
          <Group gap="xl">
            <Text
              size="xs"
              c="dimmed"
              style={{ cursor: "pointer", opacity: 0.5 }}
              className="hover-teal"
            >
              Privacy Policy
            </Text>
            <Text
              size="xs"
              c="dimmed"
              style={{ cursor: "pointer", opacity: 0.5 }}
              className="hover-teal"
            >
              Terms of Service
            </Text>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

export default Footer;
