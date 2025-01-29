import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "@/components/layouts/Main";
import About from "@/pages/about/About";
import Contact from "@/pages/contact/Contact";
import AllProducts from "@/pages/all-products/AllProducts";
export const routes = createBrowserRouter([
  {
      path: "/",
      element: <Main/>,
      children:[
        {
          index: true,
          element: <App/>
        },
        {
          path: "/about",
          element: <About/>,
        },
        {
          path: "/contact",
          element: <Contact/>,
        },
        {
          path: "/all-products",
          element: <AllProducts/>,
        },
      ]
  },
  {
      path: "/dashboard",
      element: <App/>
  },
  {
      path: "/login",
      element: <App/>
  },
  {
      path: "/register",
      element: <App/>
  }
])