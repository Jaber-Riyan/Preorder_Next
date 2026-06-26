import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "../utils/cn";
import type { SortField, SortDirection } from "../types/preorder";

interface SortDropdownProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortFieldChange: (field: SortField) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
}

const sortFields: { key: SortField; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "createdAt", label: "Created At" },
  { key: "startsAt", label: "Starts At" },
  { key: "endsAt", label: "Ends At" },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded-md hover:bg-gray-100 transition-colors border border-gray-200",
          isOpen && "bg-gray-100"
        )}
        aria-label="Sort options"
      >
        <ArrowUpDown className="w-4 h-4 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
          {/* Sort by label */}
          <div className="px-4 py-2 text-sm font-medium text-gray-700">
            Sort by
          </div>

          {/* Sort field options */}
          {sortFields.map((field) => (
            <button
              key={field.key}
              onClick={() => onSortFieldChange(field.key)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                  sortField === field.key
                    ? "border-gray-900"
                    : "border-gray-300"
                )}
              >
                {sortField === field.key && (
                  <span className="w-2 h-2 rounded-full bg-gray-900" />
                )}
              </span>
              <span>{field.label}</span>
            </button>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-200 my-1" />

          {/* Sort direction options */}
          <button
            onClick={() => onSortDirectionChange("ascending")}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowUp
              className={cn(
                "w-4 h-4 shrink-0",
                sortDirection === "ascending"
                  ? "text-gray-900"
                  : "text-gray-400"
              )}
            />
            <span
              className={cn(
                sortDirection === "ascending" ? "font-medium" : ""
              )}
            >
              Ascending
            </span>
          </button>
          <button
            onClick={() => onSortDirectionChange("descending")}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowDown
              className={cn(
                "w-4 h-4 shrink-0",
                sortDirection === "descending"
                  ? "text-gray-900"
                  : "text-gray-400"
              )}
            />
            <span
              className={cn(
                sortDirection === "descending" ? "font-medium" : ""
              )}
            >
              Descending
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
