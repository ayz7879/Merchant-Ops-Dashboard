import { useEffect, useState } from "react";
import { merchantService } from "../services/merchantService";
import { Plus, Search, TrendingUp } from "lucide-react";
import AddEditForm from "../components/Merchant/AddEditForm";
import MerchantDetail from "../components/Merchant/MerchantDetail";
import MerchantTable from "../components/Merchant/MerchantTable";
import {
  BADGE_STYLES,
  STATUS_ICONS,
  FILTER_OPTIONS,
  filterMerchants,
  getColumns,
} from "../utils/merchantUtils";
import toast from "react-hot-toast";

// Badge
const Badge = ({ value, showIcon }) => {
  const Icon = STATUS_ICONS[value];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${BADGE_STYLES[value] || BADGE_STYLES.low}`}
    >
      {showIcon && Icon && <Icon size={14} />}
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
};

const Merchants = () => {
  // State
  const [merchants, setMerchants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editData, setEditData] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [filters, setFilters] = useState({ search: "", status: "", risk: "" });

  // Load merchants
  const loadMerchants = () =>
    setMerchants(merchantService.getAllMerchants() || []);

  // Initial data load
  useEffect(() => {
    loadMerchants();
  }, []);

  // Apply filters to merchant list
  const filtered = filterMerchants(merchants, filters);

  // Handle form submission for add/edit
  const handleSubmit = (merchant) => {
    try {
      if (editData) {
        merchantService.updateMerchant(editData.id, merchant);
        toast.success("Merchant updated successfully!");
      } else {
        merchantService.addMerchant(merchant);
        toast.success("Merchant added successfully!");
      }
      loadMerchants();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // Update filter state
  const updateFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Page header with title and total count */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Merchants</h2>
          <p className="text-slate-400 mt-1">
            Manage and monitor your merchant portfolio
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <TrendingUp size={18} className="text-emerald-400" />
          <span className="text-sm text-slate-300">
            {merchants.length} Total
          </span>
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start gap-3">
        {/* Search input */}
        <div className="relative w-full sm:flex-1 sm:min-w-[250px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search merchants..."
            className="bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all w-full pl-11"
          />
        </div>

        {/* Filters row*/}
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          {FILTER_OPTIONS.map(({ key, options, label }) => (
            <select
              key={key}
              value={filters[key]}
              onChange={(e) => updateFilter(key, e.target.value)}
              className="flex-1  bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
            >
              <option value="">All {label}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* Add merchant button */}
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/20 font-medium w-full sm:w-auto sm:flex-none"
        >
          <Plus size={18} /> Add Merchant
        </button>
      </div>

      {/* Merchant table */}
      <MerchantTable
        data={filtered}
        columns={getColumns(Badge)}
        onRowClick={(row) =>
          setSelected(merchantService.getMerchantById(row.id))
        }
        onEdit={setEditData}
      />

      {/* Detail view modal */}
      <MerchantDetail
        open={!!selected}
        onClose={() => setSelected(null)}
        data={selected}
        onUpdate={(id, f) => {
          merchantService.updateMerchant(id, f);
          toast.success("Merchant updated successfully!");
          loadMerchants();
        }}
      />

      {/* Add/Edit form modal */}
      <AddEditForm
        open={editData !== null || addOpen}
        editMode={!!editData}
        data={editData}
        onClose={() => {
          setAddOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Merchants;
