"use client";

import { InputText } from "@/components/input-text";
import { InputAutocomplete } from "@/components/input-autocomplete";

import { Button } from "@/components/button";
import styles from "@/styles/Wizard.module.css";

import { ImageUpload } from "@/components/upload-image";
import { InputSelect } from "@/components/input-select";
import { TextArea } from "@/components/text-area";

import { useWizardForm } from "@/hooks/useWizardForm";

export type WizardFormProps = {
  role: "admin" | "ops" | "guest";
};

export const WizardScreen = ({ role }: WizardFormProps) => {
  const {
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

              <InputAutocomplete
                label="Role"
                value={formData.role}
                options={roleOptions}
                onValueChange={(value) => handleChange("role", value)}
              />

              <InputText
                label="Employee ID"
                value={formData.employeeId}
                disabled
              />

              <Button
                type="button"
                disabled={!isStep1Valid || submitBasicInfoLoading}
                onClick={handleSubmitBasicInfo}
              >
                {submitBasicInfoLoading ? "Loading..." : "Next"}
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
              options={employmentOptions}
              onValueChange={(value) => handleChange("employmentType", value)}
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
              <Button
                type="button"
                disabled={submitAllDataLoading}
                onClick={() => goToStep(1)}
              >
                Back
              </Button>
              <Button type="submit" disabled={submitAllDataLoading}>
                {submitAllDataLoading ? "Loading..." : "Submit"}
              </Button>
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
