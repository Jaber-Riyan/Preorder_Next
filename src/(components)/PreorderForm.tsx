import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { ToggleSwitch } from "./ToggleSwitch";
import type { PreorderRecord } from "../types/preorder";

interface PreorderFormProps {
  mode: "create" | "edit";
  initialData?: PreorderRecord;
  isSubmitting?: boolean;
  onSave: (data: Partial<PreorderRecord>) => void;
  onCancel: () => void;
  onBack: () => void;
}

const preorderWhenOptions = [
  { value: "regardless-of-stock", label: "Regardless of stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

export const PreorderForm: React.FC<PreorderFormProps> = ({
  mode,
  initialData,
  isSubmitting = false,
  onSave,
  onCancel,
  onBack,
}) => {
  const [name, setName] = useState("");
  const [productsNumber, setProductsNumber] = useState(1);
  const [preorderWhen, setPreorderWhen] = useState("regardless-of-stock");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setProductsNumber(initialData.productsNumber);
      setPreorderWhen(initialData.preorderWhen);
      setStartsAt(initialData.startsAt);
      setEndsAt(initialData.endsAt);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    const formData: Partial<PreorderRecord> = {
      name: name.trim(),
      productsNumber,
      preorderWhen,
      startsAt,
      endsAt,
      status,
    };

    onSave(formData);
  };

  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return "";
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-10 text-black">
      <div className="w-full max-w-300 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 active:bg-gray-950 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                ? "Create Preorder"
                : "Save changes"}
            </button>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Card Header */}
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Preorder details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                These values appear in the preorders list.
              </p>
            </div>

            {/* Form Fields */}
            <div className="divide-y divide-gray-200">
              {/* Name */}
              <div className="px-6 py-5 flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/3">
                  <label className="text-sm font-semibold text-gray-900">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    A label to recognize this preorder by.
                  </p>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter preorder name"
                    className={inputClass}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Products */}
              <div className="px-6 py-5 flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/3">
                  <label className="text-sm font-semibold text-gray-900">
                    Products
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Number of products covered by this preorder.
                  </p>
                </div>
                <div className="md:w-2/3 flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={productsNumber}
                    onChange={(e) =>
                      setProductsNumber(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-gray-500">product(s)</span>
                </div>
              </div>

              {/* Preorder when */}
              <div className="px-6 py-5 flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/3">
                  <label className="text-sm font-semibold text-gray-900">
                    Preorder when
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    When customers are allowed to preorder.
                  </p>
                </div>
                <div className="md:w-2/3">
                  <select
                    value={preorderWhen}
                    onChange={(e) => setPreorderWhen(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                  >
                    {preorderWhenOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Starts at */}
              <div className="px-6 py-5 flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/3">
                  <label className="text-sm font-semibold text-gray-900">
                    Starts at
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    When the preorder window opens.
                  </p>
                </div>
                <div className="md:w-2/3 relative">
                  <input
                    type="datetime-local"
                    value={formatDateForInput(startsAt)}
                    onChange={(e) => setStartsAt(e.target.value)}
                    className={inputClass + " pr-10"}
                    disabled={isSubmitting}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Ends at */}
              <div className="px-6 py-5 flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/3">
                  <label className="text-sm font-semibold text-gray-900">
                    Ends at
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty for no end date.
                  </p>
                </div>
                <div className="md:w-2/3 relative">
                  <input
                    type="datetime-local"
                    value={formatDateForInput(endsAt)}
                    onChange={(e) => setEndsAt(e.target.value)}
                    className={inputClass + " pr-10"}
                    placeholder="mm/dd/yyyy, --:--"
                    disabled={isSubmitting}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Status */}
              <div className="px-6 py-5 flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/3">
                  <label className="text-sm font-semibold text-gray-900">
                    Status
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Active preorders are visible to customers.
                  </p>
                </div>
                <div className="md:w-2/3 flex items-center gap-3">
                  <ToggleSwitch checked={status} onChange={setStatus} disabled={isSubmitting} />
                  <span className="text-sm text-gray-600">Active</span>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 active:bg-gray-950 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting
                  ? mode === "create"
                    ? "Creating..."
                    : "Saving..."
                  : mode === "create"
                  ? "Create Preorder"
                  : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};