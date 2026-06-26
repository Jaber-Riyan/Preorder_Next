import { useState, useCallback, useEffect } from "react";
import type {
  PreorderRecord,
  TabFilter,
  SortField,
  SortDirection,
  PaginatedResponse,
} from "../types/preorder";

const ITEMS_PER_PAGE = 8;

function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
}

export function usePreorders() {
  const [data, setData] = useState<PreorderRecord[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("descending");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    const queryString = buildQueryString({
      tab: activeTab === "all" ? undefined : activeTab,
      sortField,
      sortDirection,
      page: currentPage,
      pageSize: ITEMS_PER_PAGE,
    });
    const res = await fetch(`/api/preorders${queryString ? `?${queryString}` : ""}`);
    if (!res.ok) throw new Error("Failed to fetch preorders");
    const result: PaginatedResponse = await res.json();
    return result;
  }, [activeTab, sortField, sortDirection, currentPage]);

  useEffect(() => {
    let mounted = true;
    fetchData()
      .then((result) => {
        if (!mounted) return;
        setData(result.data);
        setTotalItems(result.total);
        setSelectedKeys(new Set());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching preorders:", error);
        if (!mounted) return;
        setData([]);
        setTotalItems(0);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [fetchData]);

  const handleTabChange = useCallback((tab: TabFilter) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedKeys(new Set());
  }, []);

  const handleSortFieldChange = useCallback((field: SortField) => {
    setSortField(field);
  }, []);

  const handleSortDirectionChange = useCallback((direction: SortDirection) => {
    setSortDirection(direction);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setSelectedKeys(new Set());
  }, []);

  const handleToggleStatus = useCallback(async (id: string, status: boolean) => {
    try {
      const res = await fetch(`/api/preorders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const result = await fetchData();
      setData(result.data);
      setTotalItems(result.total);
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  }, [fetchData]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedKeys(new Set(data.map((item) => item.id)));
      } else {
        setSelectedKeys(new Set());
      }
    },
    [data]
  );

  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const handleDeleteRecord = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/preorders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete preorder");
      const result = await fetchData();
      setData(result.data);
      setTotalItems(result.total);
      // If current page is beyond the total pages after deletion, go back to page 1
      if (currentPage > result.totalPages && result.totalPages > 0) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error deleting preorder:", error);
    }
  }, [fetchData, currentPage]);

  const selectAll =
    data.length > 0 &&
    data.every((item) => selectedKeys.has(item.id));

  return {
    data,
    allData: data,
    totalItems,
    loading,
    activeTab,
    sortField,
    sortDirection,
    currentPage,
    selectedKeys,
    selectAll,
    itemsPerPage: ITEMS_PER_PAGE,
    handleTabChange,
    handleSortFieldChange,
    handleSortDirectionChange,
    handlePageChange,
    handleToggleStatus,
    handleSelectAll,
    handleSelectRow,
    handleDeleteRecord,
  };
}