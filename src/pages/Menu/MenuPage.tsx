import { Box, Container } from "@mui/material";
import React from "react";
import PartnersSection from "../../components/shared/Partners";
import MenuBook from "./components/MenuBook";
import MenuSection from "./components/MenuSection";
import StatsSection from "./components/StatsSection";

const MenuPage: React.FC = () => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col relative py-12" style={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 0 }, color: "#000" }}>
        {/* Featured Menu Sections - Keep original beautiful design */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", px: 30, height: "100%" }}>
          <MenuSection sectionIndex={0} />
          <MenuSection sectionIndex={1} />
        </Box>
        <StatsSection />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", px: 30, height: "100%" }}>
          <MenuSection sectionIndex={2} />
          <MenuSection sectionIndex={3} />
        </Box>
        <PartnersSection />
        {/* Complete Menu Book with Page Flip Effect */}
        <Box sx={{ py: 8, mt: 8 }}>
          <MenuBook />
        </Box>
      </Container>
    </section>
  );
};

export default MenuPage;
