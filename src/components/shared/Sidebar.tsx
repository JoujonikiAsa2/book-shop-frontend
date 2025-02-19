import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminSidebarItems } from "@/routes/adminRoutes";
import { userSidebarItems } from "@/routes/userRoutes";
import React from "react";

const DashboardSidebar = ({... props}:React.ComponentProps<typeof Sidebar>) => {
  
  const user = useAppSelector(selectCurrentUser);
  let sidebarItems;
  switch (user?.role) {
    case 'user':
      sidebarItems = userSidebarItems
      break;
    case 'admin':
      sidebarItems = adminSidebarItems
      break;
    default:
      break;
  }

  console.log(sidebarItems)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            
            <SidebarMenu>
              {sidebarItems?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default DashboardSidebar
