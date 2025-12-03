export type WizardFormProps = {
  role: "admin" | "ops" | "guest";
  step: number;
};

export type OptionType = {
  label: string;
  value: string;
};

export type FormDataType = {
  fullName: string;
  email: string;
  department: string;
  role: string;
  employeeId: string;
  employmentType: string;
  officeLocation: string;
  notes: string;
  image: string | null;
};
