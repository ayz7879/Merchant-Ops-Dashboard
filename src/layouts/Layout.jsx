import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-16 lg:pl-72 min-h-screen">
        <div className="bg-slate-900/50 backdrop-blur-xl  border border-slate-700/50 p-8 shadow-2xl shadow-black/20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
