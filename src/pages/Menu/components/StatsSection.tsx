import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "../../../hooks/useTranslation";

// Import Icons/Images
import ImageChef from "../../../assets/icons/image_chef.png";
import ImageExperience from "../../../assets/icons/image_experience.png";
import ImageFood from "../../../assets/icons/image_food.png";
import ImageHappy from "../../../assets/icons/image_happy.png";
import ImageStatsBackground from "../../../assets/images/defaults/image_stats_background.png";

const StatsSection: React.FC = () => {
  const { t } = useTranslation("menu");

  const statsData = [
    { image: ImageChef, number: "420", description: t("stats.professionalChefs") },
    { image: ImageFood, number: "320", description: t("stats.itemsOfFood") },
    { image: ImageExperience, number: "30+", description: t("stats.yearsOfExperience") },
    { image: ImageHappy, number: "220", description: t("stats.happyCustomers") },
  ];

  return (
    <Box
      sx={{
        mb: { xs: 5, md: 8 },
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        py: { xs: 3, md: 4 },
        minHeight: { xs: "auto", md: "50vh" },
        position: "relative",
        px: { xs: 2, sm: 4, md: 8 },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${ImageStatsBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000000be",
          zIndex: 2,
        },
        "& > *": {
          position: "relative",
          zIndex: 3,
        },
      }}
    >
      {statsData.map((stat, index) => (
        <Box key={index} sx={{ textAlign: "center", mx: { xs: 1, md: 2 }, mb: { xs: 3, sm: 0 } }}>
          <Box
            sx={{
              width: { xs: "84px", sm: "100px", md: "120px" },
              height: { xs: "84px", sm: "100px", md: "120px" },
              margin: "0 auto",
            }}
          >
            <img
              src={stat.image}
              alt={`${stat.number} ${stat.description}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box sx={{ mt: { xs: 1.5, md: 3 } }}>
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", md: "1.5rem" },
                "&:hover": { color: "var(--color-yellow)" },
                transition: "color 0.3s ease",
              }}
            >
              {stat.number}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                fontSize: { xs: "0.85rem", md: "1rem" },
                "&:hover": { color: "var(--color-yellow)" },
                transition: "color 0.3s ease",
              }}
            >
              {stat.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StatsSection;
