import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-center gap-3 py-3 px-4 border-t border-gray-200">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-1 rounded transition-colors",
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="text-sm text-gray-600">
        Showing {startItem} to {endItem} from {totalItems}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-1 rounded transition-colors",
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
