import { preorderRepository } from "./preorder.repository";
import {
  createPreorderSchema,
  updatePreorderSchema,
  preorderListQuerySchema,
} from "./preorder.validation";
import type {
  Preorder,
  PaginatedResult,
} from "./preorder.types";
import { ERROR_MESSAGES } from "./preorder.constants";

export const preorderService = {
  async list(query: Record<string, unknown>) {
    const parsed = preorderListQuerySchema.parse(query);
    return preorderRepository.findAll(parsed);
  },

  async getById(id: string) {
    const preorder = await preorderRepository.findById(id);
    if (!preorder) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    return preorder;
  },

  async create(input: Record<string, unknown>) {
    const parsed = createPreorderSchema.parse(input);
    return preorderRepository.create(parsed);
  },

  async update(id: string, input: Record<string, unknown>) {
    const parsed = updatePreorderSchema.parse(input);
    const updated = await preorderRepository.update(id, parsed);
    if (!updated) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    return updated;
  },

  async delete(id: string) {
    const deleted = await preorderRepository.delete(id);
    if (!deleted) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    return { message: "Preorder deleted successfully" };
  },
};