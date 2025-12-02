import { fetchHandler } from "@/helper/fetcher";

import {
  BasicInfoRequest,
  DataSubmitRequest,
  DepartmentsResponse,
  LocationResponse,
  SuccessResponse,
} from "./types/formServiceTypes";
import { isMock } from "@/common/constant";

const methodSubmit = isMock ? "GET" : "POST";

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
  submitBasicInfo: async (req: BasicInfoRequest): Promise<SuccessResponse> => {
    return (await fetchHandler({
      options: {
        baseURL: process.env.NEXT_PUBLIC_API_SERVICE_BASIC_INFO,
        data: req,
      },
      url: "/basicInfo",
      method: methodSubmit,
    })) as SuccessResponse;
  },
  submitData: async (req: DataSubmitRequest): Promise<SuccessResponse> => {
    return (await fetchHandler({
      options: {
        baseURL: process.env.NEXT_PUBLIC_API_SERVICE_DETAILS,
        data: req,
      },
      url: "/details",
      method: methodSubmit,
    })) as SuccessResponse;
  },
};
