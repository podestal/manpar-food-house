import { createBrowserRouter } from "react-router-dom"
import MainPage from "../pages/MainPage"
import LandingPage from "../pages/LandingPage"
import ErrorPage from "../pages/ErrorPage"
import DishesPage from "../pages/DishesPage"
import LoginPage from "../pages/LoginPage"
import PrivateRoutes from "../components/auth/PrivateRoutes"
import Orders from "../pages/Orders"
import TablesPage from "../pages/TablesPage"
import DashboardPage from "../pages/DashboardPage"

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'dishes', element: <DishesPage /> },
            { path: 'tables', element: <PrivateRoutes><TablesPage /></PrivateRoutes> },
            { path: 'orders', element: <PrivateRoutes><Orders /></PrivateRoutes> },
            { path: 'dashboard', element: <PrivateRoutes><DashboardPage /></PrivateRoutes> },
            { path: 'login', element: <LoginPage /> },
        ]
    }
])

export default router