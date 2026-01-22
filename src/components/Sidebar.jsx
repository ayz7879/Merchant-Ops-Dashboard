import { LayoutDashboard, Store } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { id: "merchants", label: "Merchants", icon: Store, path: "/merchants" },
  ];
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-slate-900/95 backdrop-blur-md border-r border-slate-700/50 z-40 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col shadow-2xl shadow-black/20`}
      >
        <nav className="flex-1 p-4 space-y-2 mt-6 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      className={isActive ? "text-cyan-400" : ""}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50 shrink-0">
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
            <p className="text-xs text-slate-400 mb-1.5">Powered by</p>
            <p className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AXIPAYS
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
