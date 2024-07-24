import { createBrowserRouter } from "react-router-dom"
import MainPage from "../pages/MainPage"
import LandingPage from "../pages/LandingPage"
import ErrorPage from "../pages/ErrorPage"
import DishesPage from "../pages/DishesPage"
import CategoriesPage from "../pages/CategoriesPage"
import LoginPage from "../pages/LoginPage"
import PrivateRoutes from "../components/auth/PrivateRoutes"

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'dishes', element: <DishesPage /> },
            { path: 'categories', element: <PrivateRoutes><CategoriesPage /></PrivateRoutes> },
            { path: 'login', element: <LoginPage /> },
        ]
    }
])

export default router