export interface DataGridOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  searchFields?: string[];
  filter?: Record<string, any>;
  sort?: Record<string, 1 | -1>;
}

export interface DataGridResult<T> {
  results: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}
