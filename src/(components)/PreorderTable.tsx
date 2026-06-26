import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { ToggleSwitch } from "./ToggleSwitch";
import { PreorderRecord } from "../types/preorder";

interface PreorderTableProps {
  data: PreorderRecord[];
  selectedKeys: Set<string>;
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onToggleStatus: (id: string, status: boolean) => void;
  onEdit: (record: PreorderRecord) => void;
  onDelete: (record: PreorderRecord) => void;
}

export const PreorderTable: React.FC<PreorderTableProps> = ({
  data,
  selectedKeys,
  selectAll,
  onSelectAll,
  onSelectRow,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="w-12 py-3 px-4 text-left">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500 cursor-pointer accent-gray-700"
              />
            </th>
            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
              Products
            </th>
            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600 hidden md:table-cell">
              Preorder when
            </th>
            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600 hidden md:table-cell">
              Starts at
            </th>
            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">
              Ends at
            </th>
            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
              Status
            </th>
            <th className="py-3 px-3 text-left text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr
              key={record.id}
              className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
            >
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedKeys.has(record.id)}
                  onChange={(e) => onSelectRow(record.id, e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500 cursor-pointer accent-gray-700"
                />
              </td>
              <td className="py-3 px-3">
                <span className="text-sm font-semibold text-gray-900">
                  {record.name}
                </span>
              </td>
              <td className="py-3 px-3">
                <span className="text-sm text-gray-600">
                  {record.productsNumber}
                </span>
              </td>
              <td className="py-3 px-3 hidden md:table-cell">
                <span className="text-sm text-gray-600">
                  {record.preorderWhen}
                </span>
              </td>
              <td className="py-3 px-3 hidden md:table-cell">
                <span className="text-sm text-gray-600">
                  {record.startsAt}
                </span>
              </td>
              <td className="py-3 px-3 hidden lg:table-cell">
                <span className="text-sm text-gray-600">
                  {record.endsAt || ""}
                </span>
              </td>
              <td className="py-3 px-3">
                <ToggleSwitch
                  checked={record.status}
                  onChange={(checked) => onToggleStatus(record.id, checked)}
                />
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(record)}
                    className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                    aria-label={`Edit ${record.name}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(record)}
                    className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                    aria-label={`Delete ${record.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                No preorders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};