import { useForm } from "react-hook-form";
import { useEffect } from "react";

const AddEditForm = ({ open, onClose, onSubmit, data, editMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      country: "",
      volume: "",
      chargeback: 0,
      status: "active",
      risk: "low",
    },
  });

  // Fill data when editing
  useEffect(() => {
    if (data && editMode) {
      reset(data);
    } else if (open) {
      reset({
        name: "",
        country: "",
        volume: "",
        chargeback: 0,
        status: "active",
        risk: "low",
      });
    }
  }, [data, editMode, open, reset]);

  const onFormSubmit = (formData) => {
    onSubmit?.(formData);
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 z-50 bg-slate-900 p-6 rounded-2xl w-[90%] max-w-lg transform -translate-x-1/2 -translate-y-1/2 border border-slate-700/50 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {editMode ? "Update Merchant" : "Add Merchant"}
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Merchant Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                validate: (value) => value.trim() !== "" || "Name is required",
              })}
              placeholder="Enter merchant name"
              className={`w-full bg-slate-800 border ${errors.name ? "border-red-500" : "border-slate-700"} text-slate-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 placeholder-slate-500 transition-all`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Country Input */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Country <span className="text-red-400">*</span>
            </label>
            <input
              {...register("country", {
                required: "Country is required",
                validate: (value) =>
                  value.trim() !== "" || "Country is required",
              })}
              placeholder="Enter country"
              className={`w-full bg-slate-800 border ${errors.country ? "border-red-500" : "border-slate-700"} text-slate-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 placeholder-slate-500 transition-all`}
            />
            {errors.country && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Volume Input */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Monthly Volume <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              {...register("volume", {
                required: "Volume is required",
                min: { value: 1, message: "Volume must be at least 1" },
              })}
              placeholder="Enter monthly volume"
              className={`w-full bg-slate-800 border ${errors.volume ? "border-red-500" : "border-slate-700"} text-slate-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 placeholder-slate-500 transition-all`}
            />
            {errors.volume && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.volume.message}
              </p>
            )}
          </div>

          {/* Chargeback Input */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Chargeback Ratio (%)
            </label>
            <input
              type="number"
              step="0.1"
              {...register("chargeback")}
              placeholder="Enter chargeback ratio"
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 placeholder-slate-500 transition-all"
            />
          </div>

          {/* Status Select */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {/* Risk Select */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Risk Level
            </label>
            <select
              {...register("risk")}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/20 text-sm font-medium"
            >
              {editMode ? "Save Changes" : "Add Merchant"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEditForm;
