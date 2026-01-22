import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  InfoCard,
  SelectField,
  getInfoCards,
  statusOptions,
  riskOptions,
} from "../../utils/merchantUtils";

const MerchantDetail = ({ open, onClose, data, onUpdate }) => {
  // State
  const [form, setForm] = useState({ status: "", risk: "" });

  // Initial load
  useEffect(() => {
    data && setForm({ status: data.status, risk: data.risk });
  }, [data]);

  // Update
  const handleSave = () => {
    onUpdate?.(data.id, form);
    onClose();
  };
  const update = (key) => (val) => setForm({ ...form, [key]: val });

  if (!open || !data) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[480px] bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-slate-700/50">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
          <div>
            <h2 className="text-xl font-bold text-white">{data.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {data.chargeback > 2 && (
          <div className="mx-6 mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-400 text-sm">
                High Chargeback Rate
              </p>
              <p className="text-xs text-amber-300/80 mt-1">
                Chargeback ratio of {data.chargeback}% exceeds 2% threshold.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 px-6 mt-6">
          {getInfoCards(data).map((card) => (
            <InfoCard key={card.label} {...card} />
          ))}
        </div>

        <div className="px-6 space-y-4 mt-6">
          <SelectField
            label="Status"
            value={form.status}
            onChange={update("status")}
            options={statusOptions}
          />
          <SelectField
            label="Risk Level"
            value={form.risk}
            onChange={update("risk")}
            options={riskOptions}
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-700/50 p-6 mt-auto bg-slate-800/30">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/20 font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default MerchantDetail;
