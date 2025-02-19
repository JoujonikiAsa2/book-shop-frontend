import CreateProduct from "@/pages/all-products/CreateProduct";
import ManageOrder from "@/pages/management/ManageOrder";
import ManageProducts from "@/pages/management/ManageProducts";
import ManageUsers from "@/pages/management/ManageUsers";
import UpdatePassword from "@/pages/profile/UpdatePassword";
import UpdateProfile from "@/pages/profile/UpdateProfile";
import { File, FileBadge, PlusIcon, User2 } from "lucide-react";
import { Home } from "lucide-react"


export const adminPaths = [
  {
    path: "profile-setting",
    element: < UpdateProfile/>,
  },
  {
    path: "password-setting",
    element: < UpdatePassword/>,
  },
  {
    path: "manage-orders",
    element: <ManageOrder />,
  },
  {
    path: "manage-users",
    element: <ManageUsers />,
  },
  {
    path: "manage-products",
    element: <ManageProducts />,
  },
  {
    path: "create-products",
    element: <CreateProduct />,
  },
];

export const adminSidebarItems = [
    {
      title: "Create Product",
      url: "create-products",
      icon: PlusIcon,
    },
    {
      title: "Manage Products",
      url: "manage-products",
      icon: FileBadge,
    },
    {
      title: "Manage Orders",
      url: "manage-orders",
      icon: File,
    },
    {
      title: "Manage Users",
      url: "manage-users",
      icon: User2,
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
]
