import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { formServices } from "@/services/formService";
import { generateEmployeeID } from "@/helper/generate-employee-id";
import { useDebounceAutoSave } from "@/hooks/useDebounceAutoSave";
import { useToast } from "@/context/ToastContext";

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

export function useWizardForm(role: "admin" | "ops" | "guest") {
  const router = useRouter();

  const { showToast } = useToast();
  const step = Number(router.query.step ?? 1);

  // Auto increment per department
  const [idCounter, setIdCounter] = useState<Record<string, number>>({});

  const [submitBasicInfoLoading, setSubmitBasicInfoLoading] = useState(false);
  const [submitAllDataLoading, setSubmitAllDataLoading] = useState(false);

  const [departmentsOptions, setDepartmentsOptions] = useState<OptionType[]>([
    { label: "", value: "" },
  ]);

  const [locationsOptions, setLocationsOptions] = useState<OptionType[]>([
    { label: "", value: "" },
  ]);

  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    department: "",
    role: "",
    employeeId: generateEmployeeID("Engineering", 0),
    employmentType: "",
    officeLocation: "",
    notes: "",
    image: null,
  });

  const fetchDepartments = async () => {
    try {
      const response = await formServices.getDepartments();
      if (response) {
        setDepartmentsOptions(
          response.departments.map((item) => ({
            label: item.name,
            value: item.name,
          }))
        );
      }
    } catch (err: any) {
      showToast(
        "error",
        err?.response?.message ?? "Failed to fetch departments!"
      );
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await formServices.getLocations();
      if (response) {
        setLocationsOptions(
          response.locations.map((item) => ({
            label: item.name,
            value: item.name,
          }))
        );
      }
    } catch (err: any) {
      showToast(
        "error",
        err?.response?.message ?? "Failed to fetch locations!"
      );
    }
  };

  const handleSubmitBasicInfo = async () => {
    setSubmitBasicInfoLoading(true);
    const req = {
      fullName: formData.fullName,
      email: formData.email,
      department: formData.department,
      role: formData.role,
      employeeId: formData.employeeId,
    };
    try {
      const response = await formServices.submitBasicInfo(req);
      if (response) {
        showToast("success", `Submit basic info ${response.message}!`);
      }
    } catch (err: any) {
      showToast("error", err?.response?.message ?? "Internal Server Error");
    } finally {
      setSubmitBasicInfoLoading(false);
      goToStep(2);
    }
  };

  const handleSubmitAllData = async () => {
    setSubmitAllDataLoading(true);
    const req = {
      employmentType: formData.employmentType,
      officeLocation: formData.officeLocation,
      notes: formData.notes,
      image: formData.image,
    };
    try {
      const response = await formServices.submitData(req);
      if (response) {
        showToast("success", `Submit detail info ${response.message}!`);
      }
    } catch (err: any) {
      showToast("error", err?.response?.message ?? "Internal Server Error");
    } finally {
      setSubmitAllDataLoading(false);
      router.replace("/list");
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchLocations();
  }, []);

  useEffect(() => {
    const dataSaved = localStorage.getItem("wizard-form");
    if (dataSaved) setFormData(JSON.parse(dataSaved));
  }, []);

  useDebounceAutoSave(formData, "wizard-form", 2000);

  const handleChange = (
    name: keyof FormDataType,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputEvent = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDepartmentChange = (value: string) => {
    setIdCounter((prev) => {
      const current = prev[value] ?? 0;
      const next = current + 1;

      setFormData((prevForm) => ({
        ...prevForm,
        department: value,
        employeeId: generateEmployeeID(value, next),
      }));

      return { ...prev, [value]: next };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitAllData();
  };

  const isStep1Valid =
    !!formData.fullName &&
    !!formData.department &&
    !!formData.officeLocation &&
    !!formData.employeeId;

  const canAccessStep1 = role === "admin";
  const canAccessStep2 = role === "admin" || role === "ops";

  const goToStep = (newStep: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, step: newStep },
      },
      undefined,
      { shallow: true }
    );
  };

  const employmentOptions: OptionType[] = [
    { label: "Full-time", value: "fulltime" },
    { label: "Part-time", value: "parttime" },
    { label: "Contract", value: "contract" },
    { label: "Intern", value: "intern" },
  ];

  const roleOptions: OptionType[] = [
    { label: "Ops", value: "ops" },
    { label: "Admin", value: "admin" },
    { label: "Engineer", value: "engineer" },
    { label: "Finance", value: "finance" },
  ];

  return {
    step,
    formData,
    departmentsOptions,
    locationsOptions,
    employmentOptions,
    roleOptions,
    isStep1Valid,
    canAccessStep1,
    canAccessStep2,
    handleChange,
    handleInputEvent,
    handleDepartmentChange,
    handleSubmit,
    goToStep,
    handleSubmitBasicInfo,
    submitBasicInfoLoading,
    submitAllDataLoading,
  };
}
