import { z } from "zod";

export const createPreorderSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  productsNumber: z.number().int().min(1, "At least 1 product required"),
  preorderWhen: z.string().min(1, "Preorder condition is required"),
  startsAt: z.string().min(1, "Start date is required"),
  endsAt: z.string().optional(),
  status: z.boolean().optional(),
});

export const updatePreorderSchema = z.object({
  name: z.string().min(1).trim().optional(),
  productsNumber: z.number().int().min(1).optional(),
  preorderWhen: z.string().min(1).optional(),
  startsAt: z.string().min(1).optional(),
  endsAt: z.string().optional(),
  status: z.boolean().optional(),
});

export const preorderListQuerySchema = z.object({
  tab: z.enum(["all", "active", "inactive"]).optional(),
  sortField: z.enum(["name", "createdAt", "startsAt", "endsAt"]).optional(),
  sortDirection: z.enum(["ascending", "descending"]).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export const idParamSchema = z.string().min(1, "ID is required");