import type { Prisma } from "@/generated/prisma/client";

export type Preorder = Prisma.PreorderModel;

export interface CreatePreorderInput {
  name: string;
  productsNumber: number;
  preorderWhen: string;
  startsAt: string;
  endsAt?: string;
  status?: boolean;
}

export interface UpdatePreorderInput {
  name?: string;
  productsNumber?: number;
  preorderWhen?: string;
  startsAt?: string;
  endsAt?: string;
  status?: boolean;
}

export type PreorderSortField = "name" | "createdAt" | "startsAt" | "endsAt";
export type PreorderSortDirection = "ascending" | "descending";
export type PreorderTabFilter = "all" | "active" | "inactive";

export interface PreorderListQuery {
  tab?: PreorderTabFilter;
  sortField?: PreorderSortField;
  sortDirection?: PreorderSortDirection;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}