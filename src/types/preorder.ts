export interface PreorderRecord {
  id: string;
  name: string;
  productsNumber: number;
  preorderWhen: string;
  startsAt: string;
  endsAt: string;
  status: boolean;
}

export interface PreorderFormData {
  name: string;
  productsNumber: number;
  preorderWhen: string;
  startsAt: string;
  endsAt: string;
  status: boolean;
}

export interface PaginatedResponse {
  data: PreorderRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type TabFilter = "all" | "active" | "inactive";

export type SortField = "name" | "createdAt" | "startsAt" | "endsAt";

export type SortDirection = "ascending" | "descending";