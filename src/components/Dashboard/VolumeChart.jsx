import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const VolumeChart = ({ data = [] }) => {
  const hasData = data && data.length > 0;

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Volume by Country</h3>
          <p className="text-slate-400 text-sm mt-1">
            Transaction volume across regions
          </p>
        </div>
        <div className="bg-cyan-500/10 p-3 rounded-lg">
          <svg
            className="w-6 h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
      </div>

      {!hasData ? (
        <div className="h-[320px] flex flex-col items-center justify-center">
          <div className="bg-slate-700/30 p-6 rounded-full mb-4 animate-pulse">
            <svg
              className="w-16 h-16 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-slate-400 text-lg font-medium">
            No volume data available
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Data will appear once transactions are recorded
          </p>
          <div className="flex gap-2 mt-6">
            <div className="w-12 h-24 bg-slate-700/20 rounded animate-pulse"></div>
            <div className="w-12 h-32 bg-slate-700/20 rounded animate-pulse delay-75"></div>
            <div className="w-12 h-20 bg-slate-700/20 rounded animate-pulse delay-150"></div>
            <div className="w-12 h-28 bg-slate-700/20 rounded animate-pulse delay-300"></div>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.3}
            />
            <XAxis
              dataKey="country"
              tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 500 }}
              axisLine={{ stroke: "#475569" }}
              tickLine={{ stroke: "#475569" }}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 500 }}
              axisLine={{ stroke: "#475569" }}
              tickLine={{ stroke: "#475569" }}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
              cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
              formatter={(value) => [
                `$${(value / 1000000).toFixed(2)}M`,
                "Volume",
              ]}
            />
            <Bar
              dataKey="volume"
              fill="url(#colorVolume)"
              radius={[10, 10, 0, 0]}
              maxBarSize={60}
            />
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.9} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default VolumeChart;
