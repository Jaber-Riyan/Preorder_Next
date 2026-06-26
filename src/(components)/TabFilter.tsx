import React from "react";
import { cn } from "../utils/cn";
import type { TabFilter as TabFilterType } from "../types/preorder";

interface TabFilterProps {
  activeTab: TabFilterType;
  onTabChange: (tab: TabFilterType) => void;
}

const tabs: { key: TabFilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
];

export const TabFilter: React.FC<TabFilterProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex items-center gap-0 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors relative",
            activeTab === tab.key
              ? "text-gray-900 bg-gray-100 rounded-t-md"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
