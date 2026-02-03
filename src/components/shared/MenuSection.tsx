import { Box, Skeleton, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";

// API
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";

// Types
import type { CategoryResponse } from "../../types/responses/category.response";
import type { ProductResponse } from "../../types/responses/product.response";

/**
 * Theme variants for MenuSection
 * - default: gray background, green accents (for home page)
 * - light: white background, green accents
 * - brown: light brown background, brown accents
 * - primary: gray background, primary color accents (original about page style)
 */
export type MenuSectionTheme = "default" | "light" | "brown" | "primary";

interface MenuSectionProps {
  categories?: CategoryResponse[];
  initialProducts?: ProductResponse[];
  loading?: boolean;
  theme?: MenuSectionTheme;
  title?: string;
  description?: string;
  translationNamespace?: string;
  showViewAllButton?: boolean;
  maxProducts?: number;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  categories: categoriesProp,
  initialProducts,
  loading: loadingProp,
  theme = "default",
  title,
  description,
  translationNamespace = "home",
  showViewAllButton = true,
  maxProducts = 8,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = useTranslation(translationNamespace as any);
  const navigate = useNavigate();

  // State
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const [loadingCategories, setLoadingCategories] = useState(loadingProp ?? false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Ref to track if we should skip initial fetch (when initialProducts are provided)
  const hasInitialProducts = useRef(false);
  const isInitialMount = useRef(true);

  // Theme configuration
  const themeConfig = {
    default: {
      background: "bg-gray-50",
      titleColor: "text-gray-800",
      descriptionColor: "text-gray-600",
      activeColor: "text-green-primary",
      activeBorder: "border-green-primary",
      hoverColor: "hover:text-green-primary",
      priceColor: "text-green-primary",
      borderColor: "border-gray-200",
      buttonBg: "bg-white",
      buttonText: "text-green-primary",
      buttonBorder: "border-green-primary",
      buttonHoverBg: "hover:bg-green-primary",
      buttonHoverText: "hover:text-white",
    },
    light: {
      background: "bg-white",
      titleColor: "text-gray-800",
      descriptionColor: "text-gray-600",
      activeColor: "text-green-primary",
      activeBorder: "border-green-primary",
      hoverColor: "hover:text-green-primary",
      priceColor: "text-green-primary",
      borderColor: "border-gray-200",
      buttonBg: "bg-white",
      buttonText: "text-green-primary",
      buttonBorder: "border-green-primary",
      buttonHoverBg: "hover:bg-green-primary",
      buttonHoverText: "hover:text-white",
    },
    brown: {
      background: "bg-amber-50",
      titleColor: "text-amber-900",
      descriptionColor: "text-amber-700",
      activeColor: "text-amber-600",
      activeBorder: "border-amber-600",
      hoverColor: "hover:text-amber-600",
      priceColor: "text-amber-600",
      borderColor: "border-amber-200",
      buttonBg: "bg-white",
      buttonText: "text-amber-600",
      buttonBorder: "border-amber-600",
      buttonHoverBg: "hover:bg-amber-600",
      buttonHoverText: "hover:text-white",
    },
    primary: {
      background: "bg-gray-50",
      titleColor: "text-gray-800",
      descriptionColor: "text-gray-600",
      activeColor: "text-primary",
      activeBorder: "border-primary",
      hoverColor: "hover:text-primary",
      priceColor: "text-primary",
      borderColor: "border-gray-200",
      buttonBg: "bg-white",
      buttonText: "text-primary",
      buttonBorder: "border-primary",
      buttonHoverBg: "hover:bg-primary",
      buttonHoverText: "hover:text-white",
    },
  };

  const currentTheme = themeConfig[theme];

  // Fetch categories from API if not provided via props
  useEffect(() => {
    if (!categoriesProp || categoriesProp.length === 0) {
      const fetchCategories = async () => {
        try {
          setLoadingCategories(true);
          const response = await categoryApi.getCategories();
          if (response.success && response.data) {
            setCategories(response.data);
            if (response.data.length > 0) {
              setActiveCategoryId(response.data[0].id);
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingCategories(false);
        }
      };

      fetchCategories();
    }
  }, [categoriesProp]);

  // Set categories from props
  useEffect(() => {
    if (categoriesProp && categoriesProp.length > 0) {
      setCategories(categoriesProp);
      // Select first category by default
      if (categoriesProp.length > 0) {
        setActiveCategoryId(categoriesProp[0].id);
      }
    }
  }, [categoriesProp]);

  // Set initial products from props
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      hasInitialProducts.current = true;
      setProducts(initialProducts);
      setLoadingProducts(false);
    }
  }, [initialProducts]);

  // Fetch products khi activeCategoryId thay đổi
  useEffect(() => {
    if (!activeCategoryId) return;

    // Skip fetch on initial mount if we have initialProducts
    if (isInitialMount.current && hasInitialProducts.current) {
      isInitialMount.current = false;
      return;
    }

    // Mark that initial mount is complete
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }

    // Fetch products for specific category
    const fetchProductsByCategory = async () => {
      try {
        setLoadingProducts(true);

        const response = await productApi.searchProducts(
          null,
          [activeCategoryId],
          null,
          null,
          null,
          0,
          maxProducts,
          "id,asc"
        );

        if (response.success && response.data) {
          setProducts(response.data.content || []);
          setLoadingProducts(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProductsByCategory();
  }, [activeCategoryId, maxProducts, initialProducts]);

  // Memoize callbacks
  const handleCategoryClick = useCallback((categoryId: number) => {
    setActiveCategoryId(categoryId);
  }, []);

  const handleProductClick = useCallback(
    (productId: number) => {
      navigate(`/shop/${productId}`);
    },
    [navigate]
  );

  const handleViewAllMenu = useCallback(() => {
    navigate("/menu");
  }, [navigate]);

  return (
    <section className={`py-16 ${currentTheme.background}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Title & Description */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold ${currentTheme.titleColor} mb-4`}>
            {title || (t("menuSection.title") as string)}
          </h2>
          <p className={`${currentTheme.descriptionColor} max-w-2xl mx-auto`}>
            {description || (t("menuSection.description") as string)}
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-6 md:gap-8 mb-12 border-b ${currentTheme.borderColor} pb-4`}>
          {loadingCategories || categories.length === 0 ? (
            <Box sx={{ display: "flex", gap: 3, py: 2 }}>
              <Skeleton width={80} height={32} />
              <Skeleton width={80} height={32} />
              <Skeleton width={80} height={32} />
              <Skeleton width={80} height={32} />
            </Box>
          ) : (
            categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`pb-2 font-medium text-lg transition-all duration-300 border-b-2 ${
                  activeCategoryId === category.id
                    ? `${currentTheme.activeColor} ${currentTheme.activeBorder}`
                    : `${currentTheme.descriptionColor} border-transparent ${currentTheme.hoverColor}`
                }`}
              >
                {category.name}
              </button>
            ))
          )}
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loadingProducts || products.length === 0
            ? Array.from({ length: maxProducts }).map((_, i) => (
                <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">
                      <Skeleton width="80%" />
                    </Typography>
                    <Typography variant="body2">
                      <Skeleton width="60%" />
                    </Typography>
                    <Typography variant="body2">
                      <Skeleton width="40%" />
                    </Typography>
                  </Box>
                  <Skeleton width="60px" />
                </Box>
              ))
            : products.map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-start border-b ${currentTheme.borderColor} pb-6 cursor-pointer`}
                  onClick={() => handleProductClick(item.id)}
                >
                  <div className="flex-1">
                    <button
                      className={`text-xl font-semibold ${currentTheme.titleColor} mb-2 ${currentTheme.hoverColor} text-left transition-colors cursor-pointer`}
                    >
                      {item.name}
                    </button>
                    <p className={`${currentTheme.descriptionColor} mb-2 line-clamp-2`}>{item.description}</p>
                  </div>
                  <div className={`text-2xl font-bold ${currentTheme.priceColor} ml-4 whitespace-nowrap`}>
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}
        </div>

        {/* View More Button */}
        {showViewAllButton && (
          <div className="text-center mt-12">
            <button
              className={`${currentTheme.buttonBg} ${currentTheme.buttonText} border ${currentTheme.buttonBorder} px-8 py-3 font-semibold transition-all ${currentTheme.buttonHoverBg} ${currentTheme.buttonHoverText}`}
              onClick={handleViewAllMenu}
            >
              {t("menuSection.viewAllMenu") as string}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(MenuSection);
