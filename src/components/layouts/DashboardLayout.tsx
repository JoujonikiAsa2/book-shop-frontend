import DashboardSidebar from "../shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const DashboardLayout = () => {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <DashboardSidebar/>
        <main>
          <SidebarTrigger className="w-12 ml-2" />
          <Outlet />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
