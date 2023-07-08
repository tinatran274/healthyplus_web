import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import DetailProductPage from '../pages/DetailProductPage/DetailProductPage'
import DetailUserPage from '../pages/DetailUserPage/DetailUserPage'
import CartPage from '../pages/CartPage/CartPage'
import ControlCaloriesPage from '../pages/ControlCaloriesPage/ControlCaloriesPage'
import ControlWaterPage from '../pages/ControlWaterPage/ControlWaterPage'
import IngredientPage from '../pages/IngredientPage/IngredientPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'

export const routes = [
    {
        path: '/',
        page: HomePage
    },
    {
        path: '/order',
        page: OrderPage
    },
    {
        path: '/product',
        page: ProductPage
    },
    {
        path: '/sign_in',
        page: SignInPage
    },
    {
        path: '/sign_up',
        page: SignUpPage
    },
    {
        path: '/detail_product/:id',
        page: DetailProductPage
    },
    {
        path: '/detail_user',
        page: DetailUserPage
    },
    {
        path: '/cart',
        page: CartPage
    },
    {
        path: '/control_calories',
        page: ControlCaloriesPage
    },
    {
        path: '/control_water',
        page: ControlWaterPage
    },
    {
        path: '/ingredient',
        page: IngredientPage
    },
    {
        path: '*',
        page: NotFoundPage
    }
]