const DashboardCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 hover:bg-slate-800/80 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-40 group-hover:translate-x-40 transition-transform duration-1000" />

      <div className="relative flex items-start justify-between mb-3">
        <div
          className={`p-2.5 rounded-xl ${stat.bgColor} ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon size={20} className={`${stat.iconColor} drop-shadow-sm`} />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">
          {stat.label}
        </p>
        <p className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent">
          {stat.value}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
