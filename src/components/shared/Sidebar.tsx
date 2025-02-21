import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminSidebarItems } from "@/routes/adminRoutes";
import { userSidebarItems } from "@/routes/userRoutes";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const user = useAppSelector(selectCurrentUser);
  const [currentPage, setCurrentPage] = useState<number>(0);
  let sidebarItems;
  switch (user?.role) {
    case "user":
      sidebarItems = userSidebarItems;
      break;
    case "admin":
      sidebarItems = adminSidebarItems;
      break;
    default:
      break;
  }

  console.log(sidebarItems);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent  className="flex flex-col justify-between poppins-medium text-[#497D74] pt-6">
            <SidebarMenu>
              {sidebarItems?.map((item, index) => (
                <SidebarMenuItem key={item.title} className={`${index === currentPage ? "rounded-lg bg-[#E07A5F] text-white hover:bg-[#E07A5F]/80" : ""}`} onClick={() => setCurrentPage(index)}>
                  <SidebarMenuButton asChild className="hover:bg-[#E07A5F]/30 hover:text-white">
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
