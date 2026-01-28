import {
  Container,
  Title,
  Text,
  Box,
  Group,
  Stack,
  Image,
} from "@mantine/core";
import { motion } from "framer-motion";
import { Home, Utensils, Calculator, Car, UtensilsCrossed } from "lucide-react";

import realEstateImg from "../assets/Real Estate.jpg";
import restaurantImg from "../assets/Restaurant Industry.jpg";
import taxImg from "../assets/FilerTax Services.jpg";
import carImg from "../assets/Scrap & Used Cars.jpg";
import cateringImg from "../assets/Catering Services.jpg";

const industries = [
  {
    id: "01",
    title: "Real Estate",
    desc: "Generating high-quality leads for property developers and agents through targeted Google Ads, stunning property websites, and local SEO strategies.",
    icon: Home,
    image: realEstateImg,
    stats: ["250% Lead Increase", "85% Lower CPA"],
    align: "left",
  },
  {
    id: "02",
    title: "Restaurant Industry",
    desc: "Filling tables and boosting online orders with mouth-watering social media campaigns and Google Business optimization.",
    icon: Utensils,
    image: restaurantImg,
    stats: ["3x Online Orders", "45K+ Followers"],
    align: "right",
  },
  {
    id: "03",
    title: "Filer / Tax Services",
    desc: "Building trust and authority for tax professionals through educational content marketing and targeted PPC campaigns.",
    icon: Calculator,
    image: taxImg,
    stats: ["200+ Monthly Leads", "#1 Local Rankings"],
    align: "left",
  },
  {
    id: "04",
    title: "Scrap & Used Cars",
    desc: "Dominating local searches for car buyers and sellers with aggressive SEO and instant quote lead generation systems.",
    icon: Car,
    image: carImg,
    stats: ["500+ Inquiries/Month", "4.9★ Reviews"],
    align: "right",
  },
  {
    id: "05",
    title: "Catering Services",
    desc: "Showcasing culinary excellence through stunning portfolio websites and event-focused advertising strategies.",
    icon: UtensilsCrossed,
    image: cateringImg,
    stats: ["175% Booking Increase", "2M+ Reach"],
    align: "left",
  },
];

const Industries = () => {
  return (
    <Box
      py={120}
      style={{
        background: "#020408",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container size="lg">
        <Stack align="center" mb={100} gap="xs">
          <Box
            style={{
              border: "1px solid #10B981",
              padding: "4px 15px",
              borderRadius: "50px",
              background: "rgba(16, 185, 129, 0.05)",
            }}
          >
            <Text size="xs" fw={800} c="#10B981" style={{ letterSpacing: 2 }}>
              INDUSTRIES
            </Text>
          </Box>
          <Title
            order={2}
            ta="center"
            style={{
              color: "white",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            Deep Expertise in{" "}
            <span style={{ color: "#2DD4BF" }}>Your Industry</span>
          </Title>
          <Text c="dimmed" ta="center" fw={500}>
            Specialized strategies tailored to your sector's unique challenges
          </Text>
        </Stack>

        <Box style={{ position: "relative" }}>
          <Box
            visibleFrom="md"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(255, 255, 255, 0.1)",
              transform: "translateX(-50%)",
              zIndex: 1,
            }}
          />

          {industries.map((item) => {
            const isTextLeft = item.align === "left";

            return (
              <Box key={item.id} mb={{ base: 80, md: 120 }}>
                <Group
                  justify="space-between"
                  align="center"
                  wrap="nowrap"
                  style={{ flexDirection: isTextLeft ? "row" : "row-reverse" }}
                  gap={0}
                >
                  <Box
                    style={{
                      flex: 1,
                      paddingRight: isTextLeft ? "60px" : "0",
                      paddingLeft: isTextLeft ? "0" : "60px",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isTextLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <Stack
                        align={isTextLeft ? "flex-end" : "flex-start"}
                        gap="md"
                        style={{ textAlign: isTextLeft ? "right" : "left" }}
                      >
                        <Box
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#10B981",
                            boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                          }}
                        >
                          <item.icon size={22} color="white" />
                        </Box>
                        <Title
                          order={3}
                          style={{
                            color: "white",
                            fontSize: "1.8rem",
                            fontWeight: 800,
                          }}
                        >
                          {item.title}
                        </Title>
                        <Text
                          c="dimmed"
                          size="md"
                          style={{ lineHeight: 1.6, maxWidth: "450px" }}
                        >
                          {item.desc}
                        </Text>

                        <Group gap="sm">
                          {item.stats.map((stat) => (
                            <Box
                              key={stat}
                              style={{
                                padding: "5px 12px",
                                borderRadius: "50px",
                                border: "1px solid rgba(45, 212, 191, 0.2)",
                                background: "rgba(45, 212, 191, 0.05)",
                              }}
                            >
                              <Text
                                size="10px"
                                fw={800}
                                style={{
                                  color: "#2DD4BF",
                                  textTransform: "uppercase",
                                }}
                              >
                                {stat}
                              </Text>
                            </Box>
                          ))}
                        </Group>
                      </Stack>
                    </motion.div>
                  </Box>

                  <Box
                    visibleFrom="md"
                    style={{
                      zIndex: 5,
                      width: "80px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#020408",
                        border: "2px solid #10B981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
                      }}
                    >
                      <Text size="10px" fw={900} style={{ color: "#2DD4BF" }}>
                        {item.id}
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    style={{
                      flex: 1,
                      paddingLeft: isTextLeft ? "60px" : "0",
                      paddingRight: isTextLeft ? "0" : "60px",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <Box
                        style={{
                          overflow: "hidden",
                          borderRadius: "24px",
                          border: "1px solid rgba(255,255,255,0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            radius="24px"
                            style={{
                              width: "100%",
                              height: "280px",
                              objectFit: "cover",
                              filter: "brightness(0.7)",
                            }}
                          />
                        </motion.div>
                      </Box>
                    </motion.div>
                  </Box>
                </Group>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Industries;
