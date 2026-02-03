import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";
import productApi from "../../../api/productApi";
import { useTranslation } from "../../../hooks/useTranslation";
import type { CategoryResponse } from "../../../types/responses/category.response";
import type { ProductResponse } from "../../../types/responses/product.response";

interface CategoryWithProducts {
  category: CategoryResponse;
  products: ProductResponse[];
}

const MenuBook: React.FC = () => {
  const { t } = useTranslation("menu");
  const navigate = useNavigate();

  const [categoriesWithProducts, setCategoriesWithProducts] = useState<CategoryWithProducts[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);
  const [opening, setOpening] = useState(false);
  const [activeLayer, setActiveLayer] = useState<"A" | "B">("A");

  // Store data for each layer separately
  const [layerAPage, setLayerAPage] = useState(0);
  const [layerBPage, setLayerBPage] = useState(0);

  // Fetch all categories and their products
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesResponse = await categoryApi.getCategories();
        if (!categoriesResponse.success || !categoriesResponse.data) {
          return;
        }

        const categories = categoriesResponse.data;

        // Fetch products for each category
        const categoriesWithProductsData = await Promise.all(
          categories.map(async (category) => {
            const productsResponse = await productApi.searchProducts(
              null,
              [category.id],
              null,
              null,
              null,
              0,
              100, // Get all products
              "id,asc"
            );

            return {
              category,
              products: productsResponse.success && productsResponse.data ? productsResponse.data.content : [],
            };
          })
        );

        // Filter out categories with no products
        const filteredData = categoriesWithProductsData.filter((item) => item.products.length > 0);
        setCategoriesWithProducts(filteredData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const totalPages = Math.ceil(categoriesWithProducts.length / 2);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1 && !flipping) {
      const nextPage = currentPage + 1;
      // Pre-load next page data into inactive layer FIRST
      if (activeLayer === "A") {
        setLayerBPage(nextPage);
      } else {
        setLayerAPage(nextPage);
      }

      // Start flip animation after a tiny delay to ensure data is loaded
      setTimeout(() => {
        setFlipDirection("next");
        setFlipping(true);
      }, 50);

      // Switch layer when animation completes (1.2s)
      setTimeout(() => {
        setCurrentPage(nextPage);
        setActiveLayer((prev) => (prev === "A" ? "B" : "A"));
        setFlipping(false);
        setFlipDirection(null);
      }, 1250);
    }
  }, [currentPage, totalPages, activeLayer, flipping]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0 && !flipping) {
      const prevPage = currentPage - 1;
      // Pre-load prev page data into inactive layer FIRST
      if (activeLayer === "A") {
        setLayerBPage(prevPage);
      } else {
        setLayerAPage(prevPage);
      }

      // Start flip animation after a tiny delay to ensure data is loaded
      setTimeout(() => {
        setFlipDirection("prev");
        setFlipping(true);
      }, 50);

      // Switch layer when animation completes (1.2s)
      setTimeout(() => {
        setCurrentPage(prevPage);
        setActiveLayer((prev) => (prev === "A" ? "B" : "A"));
        setFlipping(false);
        setFlipDirection(null);
      }, 1250);
    }
  }, [currentPage, activeLayer, flipping]);

  const handleOpenBook = useCallback(() => {
    setOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setOpening(false);
    }, 1000);
    // Smooth scroll to book
    setTimeout(() => {
      document.getElementById("menu-book-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, []);

  const handleCloseBook = useCallback(() => {
    setIsOpen(false);
    setCurrentPage(0);
  }, []);

  const handleProductClick = useCallback(
    (productId: number) => {
      navigate(`/shop/${productId}`);
    },
    [navigate]
  );

  // Get data for each layer based on their page state
  const layerAData = {
    leftPage: categoriesWithProducts[layerAPage * 2],
    rightPage: categoriesWithProducts[layerAPage * 2 + 1],
  };

  const layerBData = {
    leftPage: categoriesWithProducts[layerBPage * 2],
    rightPage: categoriesWithProducts[layerBPage * 2 + 1],
  };

  if (loading) {
    return (
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          py: 8,
          px: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Skeleton variant="rectangular" width={600} height={800} />
          <Skeleton variant="rectangular" width={600} height={800} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      id="menu-book-section"
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        py: 8,
        px: 4,
        minHeight: "80vh",
        // background: "radial-gradient(ellipse at center, #f5f1e8 0%, #ebe4d5 50%, #ddd5c3 100%)",
        position: "relative",
        transition: "all 0.6s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3,
          pointerEvents: "none",
        },
      }}
    >
      {/* Closed Book Cover - visible when not open or during opening */}
      {(!isOpen || opening) && (
        <Box
          onClick={handleOpenBook}
          sx={{
            width: 650,
            height: 850,
            mx: "auto",
            background: "linear-gradient(135deg, #8b6914 0%, #a0822c 50%, #8b6914 100%)",
            borderRadius: "8px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.3)",
            cursor: opening ? "default" : "pointer",
            position: opening ? "absolute" : "relative",
            top: opening ? "50%" : "auto",
            left: opening ? "50%" : "auto",
            transform: opening
              ? "translate(-50%, -50%) perspective(2000px) rotateY(0deg) scale(0.95)"
              : "perspective(2000px) rotateY(0deg)",
            transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            opacity: opening ? 0 : 1,
            pointerEvents: opening ? "none" : "auto",
            zIndex: opening ? 1 : "auto",
            "&:hover": {
              transform: "perspective(2000px) rotateY(-5deg) scale(1.02)",
              boxShadow: "0 35px 70px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.3)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
              border: "3px solid rgba(212, 175, 55, 0.6)",
              borderRadius: "4px",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: 40,
              left: 40,
              right: 40,
              bottom: 40,
              border: "1px solid rgba(212, 175, 55, 0.4)",
              borderRadius: "2px",
            },
          }}
        >
          {/* Embossed Title */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "4rem",
                fontWeight: 700,
                color: "#d4af37",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.5)",
                mb: 2,
                letterSpacing: "0.1em",
              }}
            >
              MENU
            </Typography>
            <Typography
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: "1.2rem",
                color: "#f4e4c1",
                fontStyle: "italic",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {t("subtitle")}
            </Typography>
            <Box
              sx={{
                mt: 4,
                width: 200,
                height: 2,
                bgcolor: "#d4af37",
                mx: "auto",
                boxShadow: "0 0 10px rgba(212,175,55,0.5)",
              }}
            />
            <Typography
              sx={{
                mt: 4,
                fontFamily: "Georgia, serif",
                fontSize: "1rem",
                color: "#f4e4c1",
                opacity: 0.8,
              }}
            >
              Click to open
            </Typography>
          </Box>

          {/* Book Spine Effect */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 40,
              background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)",
              borderRadius: "8px 0 0 8px",
            }}
          />
        </Box>
      )}

      {/* Open Book with Pages - visible when open or during opening */}
      {(isOpen || opening) && (
        <>
          {/* Book Container with 3D Perspective */}
          <Box
            sx={{
              perspective: "3000px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: opening ? "absolute" : "relative",
              top: opening ? "50%" : "auto",
              left: opening ? "50%" : "auto",
              transform: opening ? "translate(-50%, -50%)" : "none",
              mb: opening ? 0 : 4,
              opacity: opening ? 0 : 1,
              zIndex: opening ? 2 : "auto",
              animation: opening ? "fadeInBook 1s ease-out forwards" : "none",
              "@keyframes fadeInBook": {
                "0%": {
                  opacity: 0,
                },
                "100%": {
                  opacity: 1,
                },
              },
            }}
          >
            {/* Book Wrapper - Creates V-shape opening */}
            <Box
              sx={{
                position: "relative",
                display: "flex",
                transformStyle: "preserve-3d",
                minHeight: "800px",
                minWidth: "1250px",
              }}
            >
              {/* Book Shadow/Base */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "90%",
                  height: "40px",
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
                  filter: "blur(15px)",
                  zIndex: 0,
                }}
              />

              {/* Layer A - Full page spread */}
              <Box
                sx={{
                  display: "flex",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: activeLayer === "A" ? 1 : flipping ? 1 : 0,
                  pointerEvents: activeLayer === "A" ? "auto" : "none",
                  zIndex: activeLayer === "A" ? 2 : 1,
                  transition: activeLayer === "A" ? "opacity 0s" : "opacity 1.2s ease-in",
                }}
              >
                {/* Left Page */}
                <Box
                  sx={{
                    transform:
                      activeLayer === "A" && flipping && flipDirection === "next"
                        ? "rotateY(-180deg)"
                        : activeLayer === "A" && flipping && flipDirection === "prev"
                          ? "rotateY(-15deg)"
                          : "rotateY(-5deg)",
                    transformOrigin: "right center",
                    transformStyle: "preserve-3d",
                    transition: "transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
                    boxShadow: "-5px 5px 30px rgba(0,0,0,0.25)",
                    position: "relative",
                    zIndex: activeLayer === "A" && flipping && flipDirection === "next" ? 10 : 2,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <MenuPage
                    data={layerAData.leftPage}
                    isLeft={true}
                    onProductClick={handleProductClick}
                    pageNumber={currentPage * 2 + 1}
                  />
                </Box>

                {/* Center Spine */}
                <Box
                  sx={{
                    width: "50px",
                    height: "800px",
                    background:
                      "linear-gradient(to right, #6b4d0f 0%, #8b6914 30%, #a0822c 50%, #8b6914 70%, #6b4d0f 100%)",
                    boxShadow: "inset 0 0 30px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)",
                    position: "relative",
                    zIndex: 3,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "10%",
                      bottom: "10%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "2px",
                      background: "rgba(212, 175, 55, 0.3)",
                    },
                  }}
                />

                {/* Right Page */}
                <Box
                  sx={{
                    transform:
                      activeLayer === "A" && flipping && flipDirection === "prev"
                        ? "rotateY(180deg)"
                        : activeLayer === "A" && flipping && flipDirection === "next"
                          ? "rotateY(-15deg)"
                          : "rotateY(5deg)",
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    transition: "transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
                    boxShadow: "5px 5px 30px rgba(0,0,0,0.25)",
                    position: "relative",
                    zIndex: activeLayer === "A" && flipping && flipDirection === "prev" ? 10 : 2,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <MenuPage
                    data={layerAData.rightPage}
                    isLeft={false}
                    onProductClick={handleProductClick}
                    pageNumber={currentPage * 2 + 2}
                  />
                </Box>
              </Box>

              {/* Layer B - Full page spread */}
              <Box
                sx={{
                  display: "flex",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: activeLayer === "B" ? 1 : flipping ? 1 : 0,
                  pointerEvents: activeLayer === "B" ? "auto" : "none",
                  zIndex: activeLayer === "B" ? 2 : 1,
                  transition: activeLayer === "B" ? "opacity 0s" : "opacity 1.2s ease-in",
                }}
              >
                {/* Left Page */}
                <Box
                  sx={{
                    transform:
                      activeLayer === "B" && flipping && flipDirection === "next"
                        ? "rotateY(-180deg)"
                        : activeLayer === "B" && flipping && flipDirection === "prev"
                          ? "rotateY(-15deg)"
                          : "rotateY(-5deg)",
                    transformOrigin: "right center",
                    transformStyle: "preserve-3d",
                    transition: "transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
                    boxShadow: "-5px 5px 30px rgba(0,0,0,0.25)",
                    position: "relative",
                    zIndex: activeLayer === "B" && flipping && flipDirection === "next" ? 10 : 2,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <MenuPage
                    data={layerBData.leftPage}
                    isLeft={true}
                    onProductClick={handleProductClick}
                    pageNumber={currentPage * 2 + 1}
                  />
                </Box>

                {/* Center Spine */}
                <Box
                  sx={{
                    width: "50px",
                    height: "800px",
                    background:
                      "linear-gradient(to right, #6b4d0f 0%, #8b6914 30%, #a0822c 50%, #8b6914 70%, #6b4d0f 100%)",
                    boxShadow: "inset 0 0 30px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)",
                    position: "relative",
                    zIndex: 3,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "10%",
                      bottom: "10%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "2px",
                      background: "rgba(212, 175, 55, 0.3)",
                    },
                  }}
                />

                {/* Right Page */}
                <Box
                  sx={{
                    transform:
                      activeLayer === "B" && flipping && flipDirection === "prev"
                        ? "rotateY(180deg)"
                        : activeLayer === "B" && flipping && flipDirection === "next"
                          ? "rotateY(-15deg)"
                          : "rotateY(5deg)",
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    transition: "transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
                    boxShadow: "5px 5px 30px rgba(0,0,0,0.25)",
                    position: "relative",
                    zIndex: activeLayer === "B" && flipping && flipDirection === "prev" ? 10 : 2,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <MenuPage
                    data={layerBData.rightPage}
                    isLeft={false}
                    onProductClick={handleProductClick}
                    pageNumber={currentPage * 2 + 2}
                  />
                </Box>
              </Box>
            </Box>

            {/* Preload next/prev pages (hidden but rendered for instant display) */}
            <Box sx={{ position: "absolute", visibility: "hidden", pointerEvents: "none", zIndex: -1 }}>
              {/* Preload next page */}
              {currentPage < totalPages - 1 && (
                <>
                  <MenuPage
                    data={categoriesWithProducts[(currentPage + 1) * 2]}
                    isLeft={true}
                    onProductClick={handleProductClick}
                    pageNumber={(currentPage + 1) * 2 + 1}
                  />
                  <MenuPage
                    data={categoriesWithProducts[(currentPage + 1) * 2 + 1]}
                    isLeft={false}
                    onProductClick={handleProductClick}
                    pageNumber={(currentPage + 1) * 2 + 2}
                  />
                </>
              )}
              {/* Preload previous page */}
              {currentPage > 0 && (
                <>
                  <MenuPage
                    data={categoriesWithProducts[(currentPage - 1) * 2]}
                    isLeft={true}
                    onProductClick={handleProductClick}
                    pageNumber={(currentPage - 1) * 2 + 1}
                  />
                  <MenuPage
                    data={categoriesWithProducts[(currentPage - 1) * 2 + 1]}
                    isLeft={false}
                    onProductClick={handleProductClick}
                    pageNumber={(currentPage - 1) * 2 + 2}
                  />
                </>
              )}
            </Box>

            {/* Navigation Buttons */}
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              sx={{
                position: "absolute",
                left: { xs: 10, md: 40 },
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.95)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                width: 56,
                height: 56,
                "&:hover": {
                  bgcolor: "#d4af37",
                  color: "white",
                  transform: "translateY(-50%) scale(1.1)",
                },
                "&:disabled": {
                  opacity: 0.3,
                  bgcolor: "rgba(255,255,255,0.5)",
                },
                transition: "all 0.3s ease",
                zIndex: 100,
              }}
            >
              <ChevronLeft size={32} />
            </IconButton>

            <IconButton
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              sx={{
                position: "absolute",
                right: { xs: 10, md: 40 },
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.95)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                width: 56,
                height: 56,
                "&:hover": {
                  bgcolor: "#d4af37",
                  color: "white",
                  transform: "translateY(-50%) scale(1.1)",
                },
                "&:disabled": {
                  opacity: 0.3,
                  bgcolor: "rgba(255,255,255,0.5)",
                },
                transition: "all 0.3s ease",
                zIndex: 100,
              }}
            >
              <ChevronRight size={32} />
            </IconButton>
          </Box>

          {/* Close Book Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
            <IconButton
              onClick={handleCloseBook}
              sx={{
                bgcolor: "#8b6914",
                color: "#f4e4c1",
                "&:hover": {
                  bgcolor: "#a0822c",
                  transform: "scale(1.1)",
                },
                width: 48,
                height: 48,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              ✕
            </IconButton>
          </Box>

          {/* Page Counter */}
          <Box
            sx={{
              textAlign: "center",
              color: "#8b6914",
              fontFamily: "Georgia, serif",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t("pageIndicator", { current: currentPage + 1, total: totalPages })}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

// Single Menu Page Component
interface MenuPageProps {
  data?: CategoryWithProducts;
  isLeft: boolean;
  onProductClick: (id: number) => void;
  pageNumber: number;
}

const MenuPage: React.FC<MenuPageProps> = memo(({ data, isLeft, onProductClick, pageNumber }) => {
  if (!data) {
    // Back cover or empty page design
    return (
      <Box
        sx={{
          width: 600,
          height: 800,
          bgcolor: "#fdfbf7",
          borderLeft: isLeft ? "none" : "2px solid #e8e4dc",
          borderRight: isLeft ? "2px solid #e8e4dc" : "none",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdfbf7 0%, #f8f4ed 50%, #fdfbf7 100%)",
        }}
      >
        {/* Decorative pattern */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            opacity: 0.2,
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              border: "3px solid #d4af37",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                width: 150,
                height: 150,
                border: "2px solid #d4af37",
                borderRadius: "50%",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                width: 100,
                height: 100,
                border: "1px solid #d4af37",
                borderRadius: "50%",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "3rem",
                fontWeight: 700,
                color: "#d4af37",
                letterSpacing: "0.2em",
              }}
            >
              END
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 600,
        height: 800,
        bgcolor: "#fdfbf7",
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 30px,
            rgba(139, 69, 19, 0.03) 30px,
            rgba(139, 69, 19, 0.03) 31px
          )
        `,
        p: 6,
        borderLeft: isLeft ? "none" : "2px solid #e8e4dc",
        borderRight: isLeft ? "2px solid #e8e4dc" : "none",
        position: "relative",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          bgcolor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "rgba(139, 69, 19, 0.2)",
          borderRadius: "4px",
        },
      }}
    >
      {/* Page Number */}
      <Typography
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          color: "text.secondary",
          fontSize: "0.875rem",
          fontFamily: "Georgia, serif",
        }}
      >
        {pageNumber}
      </Typography>

      {/* Category Title */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "2.5rem",
          fontWeight: 700,
          color: "#2c1810",
          mb: 1,
          textAlign: "center",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "2px",
            bgcolor: "#d4af37",
          },
        }}
      >
        {data.category.name}
      </Typography>

      {/* Menu Items */}
      <Box sx={{ mt: 4 }}>
        {data.products.map((product) => (
          <Box
            key={product.id}
            onClick={() => onProductClick(product.id)}
            sx={{
              mb: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateX(4px)",
                "& .product-name": {
                  color: "#d4af37",
                },
              },
            }}
          >
            {/* Product Name and Price */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mb: 0.5,
              }}
            >
              <Typography
                className="product-name"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "#2c1810",
                  flex: 1,
                  transition: "color 0.3s ease",
                }}
              >
                {product.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "#d4af37",
                  ml: 2,
                  whiteSpace: "nowrap",
                }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            </Box>

            {/* Dotted Line */}
            <Box
              sx={{
                borderBottom: "1px dotted #d4c5b0",
                mb: 0.5,
              }}
            />

            {/* Product Description */}
            {product.description && (
              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: "0.9rem",
                  color: "text.secondary",
                  lineHeight: 1.6,
                  pl: 1,
                }}
              >
                {product.description}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
});

MenuPage.displayName = "MenuPage";

export default memo(MenuBook);
