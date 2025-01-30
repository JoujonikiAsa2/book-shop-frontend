import Orders from "@/pages/orders/Orders";
import PaymentsDetails from "@/pages/orders/PaymentsDetails";
import UpdatePassword from "@/pages/profile/UpdatePassword";
import UpdateProfile from "@/pages/profile/UpdateProfile";
import { CreditCard, Home, Inbox, Lock, UserCheck } from "lucide-react";

export const userPaths = [
  {
    path: "payment-details",
    element: <PaymentsDetails />,
  },
  {
    path: "order-details",
    element: <Orders />,
  },
  {
    path: "profile-setting",
    element: <UpdateProfile/>,
  },
  {
    path: "password-setting",
    element: <UpdatePassword/>,
  },
];

export const userSidebarItems = [
  {
    title: "Orders",
    url: "/dashboard/user/order-details",
    icon: Inbox,
  },
  {
    title: "Payment Details",
    url: "/dashboard/user/payment-details",
    icon: CreditCard,
  },
  {
    title: "Profile Setting",
    url: "/dashboard/user/profile-setting",
    icon: UserCheck,
  },
  {
    title: "Password Setting",
    url: "/dashboard/user/password-setting",
    icon: Lock,
  },
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
];
