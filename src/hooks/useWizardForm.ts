import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { formServices } from "@/services/formService";
import { generateEmployeeID } from "@/helper/generate-employee-id";
import { useDebounceAutoSave } from "@/hooks/useDebounceAutoSave";

export type OptionType = {
  label: string;
  value: string;
};

export type FormDataType = {
  fullName: string;
  email: string;
  department: string;
  employeeId: string;
  employmentType: string;
  officeLocation: string;
  notes: string;
  image: string | null;
};

export function useWizardForm(role: "admin" | "ops" | "guest") {
  const router = useRouter();
  const step = Number(router.query.step ?? 1);

  // ⏺ Auto increment per department
  const [idCounter, setIdCounter] = useState<Record<string, number>>({});

  // Dropdown options
  const [departmentsOptions, setDepartmentsOptions] = useState<OptionType[]>([
    { label: "", value: "" },
  ]);

  const [locationsOptions, setLocationsOptions] = useState<OptionType[]>([
    { label: "", value: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    department: "",
    employeeId: generateEmployeeID("Engineering", 0),
    employmentType: "",
    officeLocation: "",
    notes: "",
    image: null,
  });

  // Fetch departments
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
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch locations
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
    } catch (err) {
      console.error(err);
    }
  };

  // Run on load
  useEffect(() => {
    fetchDepartments();
    fetchLocations();
  }, []);

  // Load saved draft
  useEffect(() => {
    const saved = localStorage.getItem("wizard-form");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // Auto save to localStorage (2 sec debounce)
  useDebounceAutoSave(formData, "wizard-form", 2000);

  // Generic update handler
  const handleChange = (
    name: keyof FormDataType,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Text input + textarea events
  const handleInputEvent = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Auto-generate EmployeeID when department changes
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
    console.log("Collected Form:", formData);
  };

  // Step validation
  const isStep1Valid =
    !!formData.fullName &&
    !!formData.department &&
    !!formData.officeLocation &&
    !!formData.employeeId;

  const canAccessStep1 = role === "admin";
  const canAccessStep2 = role === "admin" || role === "ops";

  // URL step navigation
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

  const optionsEmploymentType: OptionType[] = [
    { label: "Full-time", value: "fulltime" },
    { label: "Part-time", value: "parttime" },
    { label: "Contract", value: "contract" },
    { label: "Intern", value: "intern" },
  ];

  return {
    step,
    formData,
    departmentsOptions,
    locationsOptions,
    optionsEmploymentType,
    isStep1Valid,
    canAccessStep1,
    canAccessStep2,
    handleChange,
    handleInputEvent,
    handleDepartmentChange,
    handleSubmit,
    goToStep,
  };
}
