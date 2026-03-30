import { Skeleton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

const TestimonialSection: React.FC = () => {
  const { t } = useTranslation("about");
  const [currentIndex, setCurrentIndex] = useState(0);
  const loading = false;

  // 3 khách hàng với hình riêng + đánh giá chân thật
  const testimonials = t("testimonials.items", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    avatar: string;
    text: string;
  }>;

  const current = testimonials[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // 3 giây/lần

    return () => clearInterval(interval); // Clear khi component unmount
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-8 md:py-16 bg-white mt-20 md:mt-60">
      <div className="text-center mb-8 md:mb-12 px-4">
        <h3 className="text-primary mb-2" style={{ fontSize: "clamp(20px, 5vw, 30px)", fontFamily: "Great Vibes" }}>
          {t("testimonials.subtitle")}
        </h3>
        <h2 className="font-bold text-gray-800 mb-4" style={{ fontSize: "clamp(24px, 7vw, 44px)" }}>
          {t("testimonials.title")}
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center relative">
          {/* Arrow Left - Hidden on mobile */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 transition-all z-10"
          >
            <ChevronLeft className="w-5 md:w-7 h-5 md:h-7 text-gray-600" />
          </button>

          {/* Arrow Right - Hidden on mobile */}
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 transition-all z-10"
          >
            <ChevronRight className="w-5 md:w-7 h-5 md:h-7 text-gray-600" />
          </button>

          {/* Avatar - Responsive size */}
          <div className="mb-4 md:mb-6">
            {loading ? (
              <Skeleton variant="circular" width={120} height={120} className="mx-auto" />
            ) : (
              <img
                src={current.avatar}
                alt={current.name}
                className="w-28 md:w-40 h-28 md:h-40 object-cover rounded-full mx-auto border-4 border-white shadow-xl"
              />
            )}
          </div>

          {/* 5 Stars */}
          <div className="flex justify-center mb-3 md:mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-lg md:text-2xl">
                ⭐
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="text-gray-600 leading-relaxed mb-4 md:mb-6 max-w-3xl mx-auto italic px-4 md:px-8"
            style={{ fontSize: "clamp(14px, 4vw, 18px)" }}
          >
            "{current.text}"
          </blockquote>

          {/* Name & Role */}
          <div>
            <p className="font-semibold text-gray-800" style={{ fontSize: "clamp(16px, 4vw, 18px)" }}>
              {current.name}
            </p>
            <p className="text-gray-500" style={{ fontSize: "clamp(13px, 3vw, 14px)" }}>
              {current.role}
            </p>
          </div>

          {/* Dots - active dot dài hơn */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index ? "bg-yellow-400 w-10 h-2" : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
