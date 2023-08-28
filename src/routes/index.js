import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import TechnologyProductPage from "../pages/TechnologyProductPage/TechnologyProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import DetailTechnologyProductPage from "../pages/DetailTechnologyProductPage/DetailTechnologyProductPage.jsx";
import DetailUserPage from "../pages/DetailUserPage/DetailUserPage";
import CartPage from "../pages/CartPage/CartPage";
import ControlCaloriesPage from "../pages/ControlCaloriesPage/ControlCaloriesPage";
import ControlWaterPage from "../pages/ControlWaterPage/ControlWaterPage";
import IngredientPage from "../pages/IngredientPage/IngredientPage";
import DetailIngredientPage from "../pages/DetailIngredientPage/DetailIngredientPage";
import DishPage from "../pages/DishPage/DishPage";
import DetailDishPage from "../pages/DetailDishPage/DetailDishPage";
import FavoriteDishPage from "../pages/FavoriteDishPage/FavoriteDishPage";
import SuggestDishPage from "../pages/SuggestDishPage/SuggestDishPage";
import DishFromSuggestPage from "../pages/DishFromSuggestPage/DishFromSuggestPage";
import ExercisePage from "../pages/ExercisePage/ExercisePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderHistoryPage from "../pages/OrderHistoryPage/OrderHistoryPage";
import GetUserInfoPage from "../pages/GetUserInfoPage/GetUserInfoPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
  },
  {
    path: "/product",
    page: ProductPage,
  },
  {
    path: "/technology_product",
    page: TechnologyProductPage,
  },
  {
    path: "/sign_in",
    page: SignInPage,
  },
  {
    path: "/sign_up",
    page: SignUpPage,
  },
  {
    path: "/detail_product/:id",
    page: DetailProductPage,
  },
  {
    path: "/detail_technology_product/:id",
    page: DetailTechnologyProductPage,
  },
  {
    path: "/detail_user",
    page: DetailUserPage,
  },
  {
    path: "/cart",
    page: CartPage,
  },
  {
    path: "/control_calories",
    page: ControlCaloriesPage,
  },
  {
    path: "/control_water",
    page: ControlWaterPage,
  },
  {
    path: "/ingredient",
    page: IngredientPage,
  },
  {
    path: "/detail_ingredient/:id",
    page: DetailIngredientPage,
  },
  {
    path: "/dish",
    page: DishPage,
  },
  {
    path: "/detail_dish/:id",
    page: DetailDishPage,
  },
  {
    path: "/favorite_dish",
    page: FavoriteDishPage,
  },
  {
    path: "/suggest_dish",
    page: SuggestDishPage,
  },
  {
    path: "/dish_from_suggest/:list",
    page: DishFromSuggestPage,
  },
  {
    path: "/exercise",
    page: ExercisePage,
  },
  {
    path: "/payment/:list",
    page: PaymentPage,
  },
  {
    path: "/history",
    page: OrderHistoryPage,
  },
  {
    path: "/get_user_info",
    page: GetUserInfoPage,
  },

  {
    path: "*",
    page: NotFoundPage,
  },
];
