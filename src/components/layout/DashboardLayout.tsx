import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex">
      {/* Sidebar */} 
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
