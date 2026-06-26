"use client";

import { useRouter } from "next/navigation";
import { TabFilter } from "../../(components)/TabFilter";
import { SortDropdown } from "../../(components)/SortDropdown";
import { PreorderTable } from "../../(components)/PreorderTable";
import { Pagination } from "../../(components)/Pagination";
import { usePreorders } from "../../hooks/usePreorder";
import { useToast } from "../../hooks/useToast";
import type { PreorderRecord } from "../../types/preorder";
import { Toast } from "../../(components)/Toast";

export default function App() {
  const router = useRouter();
  const {
    data,
    totalItems,
    activeTab,
    sortField,
    sortDirection,
    currentPage,
    selectedKeys,
    selectAll,
    itemsPerPage,
    handleTabChange,
    handleSortFieldChange,
    handleSortDirectionChange,
    handlePageChange,
    handleToggleStatus,
    handleSelectAll,
    handleSelectRow,
    handleDeleteRecord,
  } = usePreorders();

  const { toast, showToast, hideToast } = useToast();

  const handleCreatePreorder = () => {
    router.push("/preorders/create");
  };

  const handleEdit = (record: PreorderRecord) => {
    router.push(`/preorders/${record.id}/edit`);
  };

  const handleDelete = (record: PreorderRecord) => {
    handleDeleteRecord(record.id);
    showToast(`Deleted preorder: ${record.name}`, "warning");
  };

  const handleStatusToggle = (key: string, status: boolean) => {
    handleToggleStatus(key, status);
    showToast(
      `Preorder ${status ? "activated" : "deactivated"}`,
      status ? "success" : "info"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 md:p-6 lg:p-10">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={hideToast}
      />

      <div className="w-full max-w-3000 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Preorders</h1>
          <button
            onClick={handleCreatePreorder}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 active:bg-gray-950 transition-colors shadow-sm"
          >
            Create Preorder
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
          {/* Tabs and Sort */}
          <div className="flex items-center justify-between px-4">
            <TabFilter activeTab={activeTab} onTabChange={handleTabChange} />
            <div className="relative z-10">
              <SortDropdown
                sortField={sortField}
                sortDirection={sortDirection}
                onSortFieldChange={handleSortFieldChange}
                onSortDirectionChange={handleSortDirectionChange}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-b-xl">
            {/* Table */}
            <PreorderTable
              data={data}
              selectedKeys={selectedKeys}
              selectAll={selectAll}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              onToggleStatus={handleStatusToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}