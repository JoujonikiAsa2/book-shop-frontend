import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../components/layouts/Main";
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
          element: <App/>,
        },
        {
          path: "/contact",
          element: <App/>,
        },
        {
          path: "/all-products",
          element: <App/>,
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