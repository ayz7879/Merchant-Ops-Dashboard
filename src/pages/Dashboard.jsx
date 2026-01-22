import { TrendingUp, Users, AlertTriangle } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import DashboardCard from "../components/Dashboard/DashboardCard";
import VolumeChart from "../components/Dashboard/VolumeChart";
import RiskPieChart from "../components/Dashboard/RiskPieChart";

const Dashboard = () => {
  const { stats, volumeByCountry, riskDistribution } = useDashboard();

  // card config
  const STAT_CARDS = [
    {
      label: "Total Volume",
      value: stats.totalVolume,
      icon: TrendingUp,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      label: "Total Merchants",
      value: stats.totalMerchants,
      icon: Users,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      label: "Active Merchants",
      value: stats.activeMerchants,
      icon: Users,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      label: "High Risk",
      value: stats.highRisk,
      icon: AlertTriangle,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-slate-400 mt-2 text-lg">
          Overview of your merchant analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STAT_CARDS.map((stat, index) => (
          <DashboardCard key={index} stat={stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <VolumeChart data={volumeByCountry} />
        </div>

        <div className="lg:col-span-1">
          <RiskPieChart data={riskDistribution} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
