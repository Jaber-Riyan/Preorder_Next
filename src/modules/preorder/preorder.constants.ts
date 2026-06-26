export const PREORDER_WHEN_OPTIONS = [
  { value: "regardless-of-stock", label: "Regardless of stock" },
  { value: "out-of-stock", label: "Out of stock" },
] as const;

export const PREORDER_TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
] as const;

export const PREORDER_SORT_FIELDS = [
  { key: "name", label: "Name" },
  { key: "createdAt", label: "Created At" },
  { key: "startsAt", label: "Starts At" },
  { key: "endsAt", label: "Ends At" },
] as const;

export const DEFAULT_PAGE_SIZE = 8;

export const ERROR_MESSAGES = {
  NOT_FOUND: "Preorder not found",
  INVALID_ID: "Invalid preorder ID",
  VALIDATION_ERROR: "Validation error",
  INTERNAL_ERROR: "Internal server error",
} as const;