import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "@/components/layouts/Main";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import AllProducts from "@/pages/all-products/AllProducts";
import ProductDetails from "@/pages/all-products/ProductDetails";
import CheckOut from "@/pages/orders/CheckOut";
import Register from "@/pages/Register";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import Login from "@/pages/Login";
import PaymentsDetails from "../pages/orders/PaymentsDetails";
import Orders from "@/pages/orders/Orders";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PaymentProcessing from "@/pages/orders/PaymentProcessing";
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
        path: "/checkout/:productId",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "payment-details",
        element: (
          <ProtectedRoute>
            <PaymentsDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment-processing",
        element: (
          <ProtectedRoute>
            <PaymentProcessing />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-details",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
    ],
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
