import { Menu, Store } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 z-50 shadow-lg shadow-black/10">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Store size={18} className="text-white sm:size-22" />
            </div>
            <h1 className="text-sm sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              Merchant Ops Dashboard
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
