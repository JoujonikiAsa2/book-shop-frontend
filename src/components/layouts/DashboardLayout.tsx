import DashboardSidebar from "../shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
      <SidebarProvider>
        <DashboardSidebar />
        <main>
          <SidebarTrigger  className="w-12"/>
          <Outlet/>
        </main>
      </SidebarProvider>
  );
};

export default DashboardLayout;
