import { FilterType } from "./filter";


export interface IParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: FilterType
}