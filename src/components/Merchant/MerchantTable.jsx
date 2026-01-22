import { Edit, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

const MerchantTable = ({ columns, data, onRowClick, onEdit }) => {
  // state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  // sorted data
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;

    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="text-slate-500" />;
    }
    if (sortConfig.direction === "asc") {
      return <ArrowUp size={14} className="text-cyan-400" />;
    }
    if (sortConfig.direction === "desc") {
      return <ArrowDown size={14} className="text-cyan-400" />;
    }
    return <ArrowUpDown size={14} className="text-slate-500" />;
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-700/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider"
              >
                {col.sortable ? (
                  <button
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-2 hover:text-slate-200 transition-colors"
                  >
                    {col.label}
                    {getSortIcon(col.key)}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className="border-b border-slate-700/30 hover:bg-slate-700/20 cursor-pointer transition-colors duration-150"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-slate-200">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(row);
                  }}
                  className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors duration-150 text-slate-300 hover:text-cyan-400"
                >
                  <Edit size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!sortedData.length && (
        <div className="w-full text-center text-slate-400 py-12 text-sm">
          No merchants found
        </div>
      )}
    </div>
  );
};

export default MerchantTable;
