export type DepartmentsResponse = {
  departments: CommonOptionsType[];
  basicInfo: [];
};

export type LocationResponse = {
  locations: CommonOptionsType[];
  detail: [];
};

type CommonOptionsType = { id: number; name: string };
