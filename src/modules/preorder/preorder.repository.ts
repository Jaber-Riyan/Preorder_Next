import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import type {
  Preorder,
  CreatePreorderInput,
  UpdatePreorderInput,
  PreorderListQuery,
  PaginatedResult,
} from "./preorder.types";
import { DEFAULT_PAGE_SIZE } from "./preorder.constants";

export const preorderRepository = {
  async findAll(
    query: PreorderListQuery
  ): Promise<PaginatedResult<Preorder>> {
    const {
      tab = "all",
      sortField = "createdAt",
      sortDirection = "descending",
      page = 1,
      pageSize = DEFAULT_PAGE_SIZE,
    } = query;

    const where: Prisma.PreorderWhereInput = {};
    if (tab === "active") where.status = true;
    if (tab === "inactive") where.status = false;

    const orderBy: Prisma.PreorderOrderByWithRelationInput = {};
    if (sortDirection === "ascending") {
      (orderBy as Record<string, Prisma.SortOrder>)[sortField] = "asc";
    } else {
      (orderBy as Record<string, Prisma.SortOrder>)[sortField] = "desc";
    }

    const [data, total] = await Promise.all([
      prisma.preorder.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.preorder.count({ where }),
    ]);

    return {
      data: data as unknown as Preorder[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  async findById(id: string): Promise<Preorder | null> {
    const result = await prisma.preorder.findUnique({ where: { id } });
    return result as unknown as Preorder | null;
  },

  async create(input: CreatePreorderInput): Promise<Preorder> {
    const result = await prisma.preorder.create({
      data: {
        name: input.name,
        productsNumber: input.productsNumber,
        preorderWhen: input.preorderWhen,
        startsAt: input.startsAt,
        endsAt: input.endsAt ?? null,
        status: input.status ?? true,
      },
    });
    return result as unknown as Preorder;
  },

  async update(
    id: string,
    input: UpdatePreorderInput
  ): Promise<Preorder | null> {
    const existing = await prisma.preorder.findUnique({ where: { id } });
    if (!existing) return null;

    const result = await prisma.preorder.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.productsNumber !== undefined && {
          productsNumber: input.productsNumber,
        }),
        ...(input.preorderWhen !== undefined && {
          preorderWhen: input.preorderWhen,
        }),
        ...(input.startsAt !== undefined && { startsAt: input.startsAt }),
        ...(input.endsAt !== undefined && { endsAt: input.endsAt ?? null }),
        ...(input.status !== undefined && { status: input.status }),
      },
    });
    return result as unknown as Preorder;
  },

  async delete(id: string): Promise<boolean> {
    const existing = await prisma.preorder.findUnique({ where: { id } });
    if (!existing) return false;

    await prisma.preorder.delete({ where: { id } });
    return true;
  },
};