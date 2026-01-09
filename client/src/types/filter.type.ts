import { Status } from "../types";

export type Filter = {
  startDate: string;
  endDate: string;
  status: Status;
  pageLimit: number;
  pageNumber: number;
  nameContainsChars: string;
};
