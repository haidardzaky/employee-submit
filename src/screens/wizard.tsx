"use client";

import { InputText } from "@/components/input-text";
import { InputAutocomplete } from "@/components/input-autocomplete";

import { Button } from "@/components/button";
import styles from "@/styles/Wizard.module.css";

import { ImageUpload } from "@/components/upload-image";
import { InputSelect } from "@/components/input-select";
import { TextArea } from "@/components/text-area";

import { useWizardForm } from "@/hooks/useWizardForm";

type WizardFormProps = {
  role: "admin" | "ops" | "guest";
};

export const WizardScreen = ({ role }: WizardFormProps) => {
  const {
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
  } = useWizardForm(role);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Step - {step}</h1>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          canAccessStep1 ? (
            <>
              <InputText
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputEvent}
              />

              <InputText
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputEvent}
              />

              <InputAutocomplete
                label="Department"
                value={formData.department}
                options={departmentsOptions}
                onValueChange={handleDepartmentChange}
              />

              <InputText
                label="Employee ID"
                value={formData.employeeId}
                disabled
              />

              <Button
                type="button"
                disabled={!isStep1Valid}
                onClick={() => goToStep(2)}
              >
                Next
              </Button>
            </>
          ) : (
            <div>
              <p>Anda tidak bisa mengakses halaman ini</p>
            </div>
          )
        ) : canAccessStep2 ? (
          <>
            <ImageUpload
              label="Foto Karyawan"
              value={formData.image}
              onChange={(img) => handleChange("image", img)}
            />

            <InputSelect
              label="Employment Type"
              name="employmentType"
              value={formData.employmentType}
              options={optionsEmploymentType}
              onValueChange={(v) => handleChange("employmentType", v)}
            />

            <InputAutocomplete
              label="Office Location"
              value={formData.officeLocation}
              options={locationsOptions}
              onValueChange={(value) => handleChange("officeLocation", value)}
            />

            <TextArea
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputEvent}
            />

            <div className={styles.buttonWrapper}>
              <Button type="button" onClick={() => goToStep(1)}>
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </>
        ) : (
          <div>
            <p>Anda tidak memiliki akses ke halaman ini</p>
          </div>
        )}
      </form>
    </div>
  );
};
