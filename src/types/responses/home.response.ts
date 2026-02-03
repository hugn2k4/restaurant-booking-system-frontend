import type { CategoryResponse } from "./category.response";
import type { ProductResponse } from "./product.response";

export interface HomeInitialDataResponse {
  categories: CategoryResponse[];
  featuredProducts: ProductResponse[];
  // Bạn có thể thêm các field khác nếu backend trả về
  // banners?: any[]; // Tùy thuộc vào structure banner của bạn
  // chefs?: ChefResponse[];
  // reviews?: ReviewResponse[];
  // blogs?: BlogResponse[];
}
