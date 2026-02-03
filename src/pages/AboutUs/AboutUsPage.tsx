import MenuSection from "../../components/shared/MenuSection";
import TeamSection from "../../components/shared/TeamSection";
import FoodGallerySection from "./components/FoodGallerySection";
import TestimonialSection from "./components/TestimonialSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
const AboutUsPage = () => {
  return (
    <div className="min-h-screen">
      <FoodGallerySection />
      <WhyChooseUsSection />
      <TeamSection variant="about" />
      <TestimonialSection />
      <MenuSection translationNamespace="about" theme="primary" />
    </div>
  );
};
export default AboutUsPage;
