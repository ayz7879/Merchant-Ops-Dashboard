import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const RiskPieChart = ({ data = [] }) => {
  const RISK_COLORS = {
    low: "#10b981",
    medium: "#f59e0b",
    high: "#ef4444",
  };

  const hasData = data && data.length > 0;
  const totalCount = hasData
    ? data.reduce((sum, item) => sum + item.count, 0)
    : 0;

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Risk Distribution</h3>
          <p className="text-slate-400 text-sm mt-1">
            Merchant risk categories
          </p>
        </div>
        <div className="bg-rose-500/10 p-3 rounded-lg">
          <svg
            className="w-6 h-6 text-rose-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      {!hasData ? (
        <div className="h-[280px] flex flex-col items-center justify-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full border-8 border-slate-700/30 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <div className="absolute top-2 left-8 w-2 h-2 bg-emerald-500/30 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-2 w-2 h-2 bg-amber-500/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-2 w-2 h-2 bg-red-500/30 rounded-full animate-pulse"></div>
          </div>
          <p className="text-slate-400 font-medium">No risk data available</p>
          <p className="text-slate-500 text-sm mt-1">
            Data will appear once merchants are added
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              dataKey="count"
              strokeWidth={2}
              stroke="#1e293b"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={RISK_COLORS[entry.risk]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "#fff", fontWeight: 600 }}
              itemStyle={{ color: "#fff" }}
              formatter={(value, name, props) => [
                `${props.payload.count} merchants (${((props.payload.count / totalCount) * 100).toFixed(1)}%)`,
                `${props.payload.risk.charAt(0).toUpperCase() + props.payload.risk.slice(1)} Risk`,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      )}

      <div className="mt-3 space-y-2">
        {hasData
          ? data.map((item) => (
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
            ))
          : ["low", "medium", "high"].map((risk) => (
              <div key={risk} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full opacity-30"
                    style={{ backgroundColor: RISK_COLORS[risk] }}
                  />
                  <span className="text-sm text-slate-400 capitalize">
                    {risk} Risk
                  </span>
                </div>
                <span className="text-sm text-slate-500">0</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default RiskPieChart;
