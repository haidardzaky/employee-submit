import { fetchHandler } from "@/helper/fetcher";

import {
  DepartmentsResponse,
  LocationResponse,
} from "./types/formServiceTypes";

export const formServices = {
  getDepartments: async (): Promise<DepartmentsResponse> => {
    return (await fetchHandler({
      url: "/options/departments",
      method: "GET",
    })) as DepartmentsResponse;
  },
  getLocations: async (): Promise<LocationResponse> => {
    return (await fetchHandler({
      url: "/options/locations",
      method: "GET",
    })) as LocationResponse;
  },
};
