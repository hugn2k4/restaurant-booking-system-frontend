import { Suspense, lazy, memo, useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "../../components/common/ErrorBoundary";
import { SkeletonSection } from "../../components/common/SkeletonSection";
import { useSnackbar } from "../../hooks/useSnackbar";
import PageService from "../../services/pageService";
import type { HomeInitialDataResponse } from "../../types/responses/home.response";
import Hero from "./components/Hero";

// Lazy load components below the fold
const AboutUs = lazy(() => import("./components/AboutUs"));
const FoodCategory = lazy(() => import("./components/FoodCategory"));
const WhyChooseUs = lazy(() => import("./components/WhyChoseUs"));
const MenuSection = lazy(() => import("../../components/shared/MenuSection"));
const CustomerReview = lazy(() => import("./components/CustomerReview"));
const LatestNewsBlog = lazy(() => import("./components/LatestNewsBlog"));
const TeamSection = lazy(() => import("../../components/shared/TeamSection"));
const Partners = lazy(() => import("../../components/shared/Partners"));

function HomePage() {
  const [homeData, setHomeData] = useState<HomeInitialDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { showSnackbarI18n } = useSnackbar();

  const fetchHomeData = useCallback(
    async (isRetry = false) => {
      try {
        setLoading(true);

        const data = await PageService.getHomeInitialData();

        // Handle null or empty data
        if (!data) {
          throw new Error("NO_DATA");
        }

        setHomeData(data);

        if (isRetry) {
          showSnackbarI18n("errors.dataLoadSuccess", "success");
        }
      } catch (err: unknown) {
        console.error("Error fetching home data:", err);

        const error = err as { message?: string; response?: { status?: number } };
        const errorMessage = error?.message || "UNKNOWN";

        // Handle different error types
        if (errorMessage === "NO_DATA") {
          showSnackbarI18n("errors.noDataAvailable", "warning");
        } else if (error?.response?.status === 500) {
          showSnackbarI18n("errors.serverErrorShort", "error");
        } else if (error?.response?.status === 404) {
          showSnackbarI18n("errors.notFoundShort", "warning");
        }
        // Silently fail - show skeleton
      } finally {
        setLoading(false);
      }
    },
    [showSnackbarI18n]
  );

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return (
    <>
      {/* Hero - Load immediately (above fold) */}
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      {/* Below fold - Lazy load with suspense */}
      {/* Graceful degradation: Still show UI even with partial data */}
      <Suspense fallback={<SkeletonSection variant="grid" />}>
        <ErrorBoundary>
          <AboutUs />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="gallery" />}>
        <ErrorBoundary>
          <FoodCategory categories={homeData?.categories} loading={loading} />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="grid" />}>
        <ErrorBoundary>
          <WhyChooseUs />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="list" />}>
        <ErrorBoundary>
          <MenuSection
            categories={homeData?.categories}
            initialProducts={homeData?.featuredProducts}
            loading={loading}
          />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="grid" />}>
        <ErrorBoundary>
          <TeamSection />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="list" />}>
        <ErrorBoundary>
          <CustomerReview />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="grid" />}>
        <ErrorBoundary>
          <LatestNewsBlog />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="gallery" />}>
        <ErrorBoundary>
          <Partners />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default memo(HomePage);
