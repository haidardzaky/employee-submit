export type DepartmentsResponse = {
  departments: CommonOptionsType[];
  basicInfo: [];
};

export type LocationResponse = {
  locations: CommonOptionsType[];
  details: [];
};

export type SuccessResponse = {
  message: string;
};

export type BasicInfoRequest = {
  fullName: string;
  email: string;
  department: string;
  role: string;
  employeeId: string;
};

export type DataSubmitRequest = {
  employmentType: string;
  officeLocation: string;
  notes: string;
  image: string | null;
};

type CommonOptionsType = { id: number; name: string };
