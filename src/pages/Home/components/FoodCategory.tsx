import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import type { CategoryResponse } from "../../../types/responses/category.response";

type CategoryDisplay = CategoryResponse & {
  items: number;
};

interface FoodCategoryCarouselProps {
  categories?: CategoryResponse[];
  loading?: boolean;
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400";

// Helper function to get items per view based on window width
const getItemsPerView = (): number => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 768) return 2;
  if (window.innerWidth < 1024) return 3;
  return 4;
};

const FoodCategoryCarousel: React.FC<FoodCategoryCarouselProps> = ({
  categories: categoriesProp,
  loading: loadingProp,
}) => {
  const { t } = useTranslation("home");
  const [categories, setCategories] = useState<CategoryDisplay[]>([]);
  const loading = loadingProp ?? true;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Process categories from props
  useEffect(() => {
    if (categoriesProp && categoriesProp.length > 0) {
      const processedCategories: CategoryDisplay[] = categoriesProp.map((cat) => ({
        id: cat.id,
        name: cat.name,
        image: cat.image,
        items: Math.floor(Math.random() * 20) + 15,
      }));
      setCategories(processedCategories);
    }
  }, [categoriesProp]);

  // Debounced resize handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resize = () => {
      if (!containerRef.current) return;

      const firstCard = containerRef.current.querySelector(".food-card") as HTMLElement;
      if (firstCard) {
        setCardWidth(firstCard.offsetWidth + 16);
      }
    };

    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resize, 150);
    };

    resize();
    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [categories.length]);

  // Memoize calculations
  const maxIndex = useMemo(() => Math.max(0, categories.length - getItemsPerView()), [categories.length]);

  // Memoize callbacks
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Show skeleton while loading or if error occurred
  if (loading || categories.length === 0) {
    return (
      <div className="bg-[#f5f5f0] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-semibold text-gray-800">{t("foodCategory.title") as string}</h1>
            <p className="text-gray-500 text-sm max-w-md mx-auto mt-3">{t("foodCategory.description") as string}</p>
          </div>

          <div className="relative px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-6 text-center">
                    <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f0] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold text-gray-800">{t("foodCategory.title") as string}</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto mt-3">{t("foodCategory.description") as string}</p>
        </div>

        <div className="relative px-10">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-lg flex items-center justify-center transition-all
                            ${currentIndex === 0 ? "bg-gray-200 text-gray-400" : "bg-green-600 text-white hover:bg-green-700"}
                        `}
          >
            <ChevronLeft size={26} />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-lg flex items-center justify-center transition-all
                            ${currentIndex >= maxIndex ? "bg-gray-200 text-gray-400" : "bg-green-600 text-white hover:bg-green-700"}
                        `}
          >
            <ChevronRight size={26} />
          </button>

          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
              }}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="food-card flex-shrink-0
                                            w-full
                                            sm:w-1/2
                                            md:w-1/3
                                            lg:w-1/4
                                            "
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={category.image?.url || DEFAULT_IMAGE}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                      <p className="text-gray-500 text-sm">{category.items} Item</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-2 rounded-full transition-all duration-300
                                ${currentIndex === i ? "w-8 bg-green-700" : "w-2 bg-gray-300"}
                            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(FoodCategoryCarousel);
