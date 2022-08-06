export type GenericListResponse<T> = {
  data?: T[];
  message?: string;
  total_row?: number;
};
