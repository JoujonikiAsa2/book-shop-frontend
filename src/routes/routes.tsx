import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "@/components/layouts/Main";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import AllProducts from "@/pages/all-products/AllProducts";
import ProductDetails from "@/pages/all-products/ProductDetails";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import { generateRouter } from "@/utils/generateRouter";
import { adminPaths } from "./adminRoutes";
import { userPaths } from "./userRoutes";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PaymentProcessing from "@/pages/orders/PaymentProcessing";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import Cart from "@/pages/orders/Cart";
import ProceedCheckout from "@/pages/orders/ProceedCheckout";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <ProtectedRoute><ProceedCheckout /></ProtectedRoute>
      },
      {
        path: "/checkout/:id",
        element: <ProtectedRoute><ProceedCheckout /></ProtectedRoute>
      },
      {
        path: "/payment-processing",
        element: (
          <ProtectedRoute>
            <PaymentProcessing />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard/user",
    element: <DashboardLayout />,
    children: generateRouter(userPaths),
  },
  {
    path: "/dashboard/admin",
    element: <DashboardLayout />,
    children: generateRouter(adminPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
