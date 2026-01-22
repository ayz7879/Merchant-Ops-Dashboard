import { TrendingUp, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useDashboard } from "../hooks/useDashboard";

const Dashboard = () => {
  const { stats, volumeByCountry, riskDistribution } = useDashboard();

  const STAT_CARDS = [
    {
      label: "Total Volume",
      value: stats.totalVolume,
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      label: "Avg Success Rate",
      value: stats.avgSuccessRate,
      icon: CheckCircle2,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      label: "Active Merchants",
      value: stats.activeMerchants,
      icon: Users,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      label: "High Risk",
      value: stats.highRisk,
      icon: AlertTriangle,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
  ];

  const RISK_COLORS = {
    low: "#10b981",
    medium: "#f59e0b",
    high: "#ef4444",
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <p className="text-slate-400 mt-1">
          Overview of your merchant analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6 hover:bg-slate-800/70 hover:border-slate-600 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon size={24} className={stat.iconColor} />
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume by Country - Bar Chart */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            Volume by Country
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeByCountry}>
              <XAxis
                dataKey="country"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={{ stroke: "#475569" }}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={{ stroke: "#475569" }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value) => [
                  `$${(value / 1000000).toFixed(2)}M`,
                  "Volume",
                ]}
              />
              <Bar
                dataKey="volume"
                fill="url(#colorVolume)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution - Pie Chart */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            Risk Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.risk]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
                formatter={(value, name, props) => [
                  `${props.payload.count}`,
                  `${props.payload.risk.charAt(0).toUpperCase() + props.payload.risk.slice(1)} Risk`,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {riskDistribution.map((item) => (
              <div
                key={item.risk}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: RISK_COLORS[item.risk] }}
                  />
                  <span className="text-sm text-slate-300 capitalize">
                    {item.risk} Risk
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
