const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-6">
        {/* Main Spinner */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-700/50 border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-amber-500 rounded-full animate-ping"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p className="text-slate-400 text-lg font-medium">Loading...</p>
        </div>

        {/* Glass card background */}
        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl -z-10 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
