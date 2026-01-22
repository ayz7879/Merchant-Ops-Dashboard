import { CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";

// badge/status colors
export const BADGE_STYLES = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  paused: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  blocked: "bg-red-500/10 text-red-400 border-red-500/20",
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  high: "bg-red-500/10 text-red-400 border-red-500/20",
};

// status colors
export const statusColors = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  paused: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  blocked: "bg-red-500/10 text-red-400 border-red-500/30",
};

// risk colors
export const riskColors = {
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  high: "bg-red-500/10 text-red-400 border-red-500/30",
};

// Status icon
export const STATUS_ICONS = {
  active: CheckCircle,
  paused: Clock,
  blocked: XCircle,
};

// TABLE COLUMNS
export const columns = [
  {
    key: "name",
    label: "Merchant Name",
  },
  {
    key: "country",
    label: "Country",
  },
  {
    key: "volume",
    label: "Monthly Volume",
    format: (value) => `$${Number(value).toLocaleString()}`,
  },
  {
    key: "chargeback",
    label: "Chargeback",
    format: (value) => `${value}%`,
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "risk",
    label: "Risk Level",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

// Column configuration with custom render functions
export const getColumns = (Badge) => [
  {
    label: "Merchant",
    key: "name",
    render: (v) => <span className="font-medium">{v}</span>,
  },
  { label: "Country", key: "country" },
  {
    label: "Volume",
    key: "volume",
    sortable: true,
    render: (v) => `$${v.toLocaleString()}`,
  },
  {
    label: "Chargeback",
    key: "chargeback",
    sortable: true,
    render: (v) => `${v}%`,
  },
  {
    label: "Status",
    key: "status",
    render: (v) => <Badge value={v} showIcon />,
  },
  {
    label: "Risk",
    key: "risk",
    render: (v) => <Badge value={v} />,
  },
];

// filter options with labels
export const FILTER_OPTIONS = [
  {
    key: "status",
    options: ["active", "paused", "blocked"],
    label: "Status",
  },
  {
    key: "risk",
    options: ["low", "medium", "high"],
    label: "Risk",
  },
];

export const statusOptions = ["active", "paused", "blocked"];
export const riskOptions = ["low", "medium", "high"];

// Info card for displaying merchant details
export const InfoCard = ({ label, value, icon }) => (
  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
    <div className="text-xs text-slate-400 mb-1.5 flex items-center gap-2">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    <div className="text-base font-semibold text-slate-200">{value}</div>
  </div>
);

// Select field component
export const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-sm font-medium text-slate-300 mb-2 block">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all w-full`}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o.charAt(0).toUpperCase() + o.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

// Generate info cards data for merchant details
export const getInfoCards = (data) => [
  { label: "Country", value: data.country, icon: "🌍" },
  {
    label: "Monthly Volume",
    value: `$${data.volume.toLocaleString()}`,
    icon: "💰",
  },
  { label: "Chargeback", value: `${data.chargeback}%`, icon: "⚠️" },
  { label: "Risk Level", value: data.risk, icon: "📊" },
];

// Filter merchants based on search and status/risk filters
export const filterMerchants = (merchants, filters) => {
  return merchants.filter((m) => {
    const matchesSearch =
      !filters.search ||
      m.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      m.country.toLowerCase().includes(filters.search.toLowerCase());

    // Status filter
    const matchesStatus = !filters.status || m.status === filters.status;

    // Risk filter
    const matchesRisk = !filters.risk || m.risk === filters.risk;

    return matchesSearch && matchesStatus && matchesRisk;
  });
};
