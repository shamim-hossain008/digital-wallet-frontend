export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  search: string;
};

export type PaginatedResponse<T> = {
  meta: PaginationMeta;
  data: T[];
};
