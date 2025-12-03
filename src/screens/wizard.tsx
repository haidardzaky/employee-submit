"use client";

import { InputText } from "@/components/input-text";
import { InputAutocomplete } from "@/components/input-autocomplete";

import { Button } from "@/components/button";
import styles from "@/styles/Wizard.module.css";

import { ImageUpload } from "@/components/upload-image";
import { InputSelect } from "@/components/input-select";
import { TextArea } from "@/components/text-area";

import { useWizardForm } from "@/hooks/useWizardForm";
import { WizardFormProps } from "@/types/wizardTypes";

export const WizardScreen = ({ role, step }: WizardFormProps) => {
  const {
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
  } = useWizardForm({ role, step });
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
                data-testid="input-fullname"
              />

              <InputText
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputEvent}
                data-testid="input-email"
              />

              <InputAutocomplete
                label="Department"
                value={formData.department}
                options={departmentsOptions}
                onValueChange={handleDepartmentChange}
                data-testid="input-autocomplete-department"
              />

              <InputAutocomplete
                label="Role"
                value={formData.role}
                options={roleOptions}
                onValueChange={(value) => handleChange("role", value)}
                data-testid="input-autocomplete-role"
              />

              <InputText
                label="Employee ID"
                value={formData.employeeId}
                disabled
                data-testid="input-employee-id"
              />

              <Button
                type="button"
                disabled={!isStep1Valid || submitBasicInfoLoading}
                onClick={handleSubmitBasicInfo}
                data-testid="button-next"
                style={{ float: "right" }}
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
              data-testid="input-file-image"
            />

            <InputSelect
              label="Employment Type"
              name="employmentType"
              value={formData.employmentType}
              options={employmentOptions}
              onValueChange={(value) => handleChange("employmentType", value)}
              data-testid="input-employment-type"
            />

            <InputAutocomplete
              label="Office Location"
              value={formData.officeLocation}
              options={locationsOptions}
              onValueChange={(value) => handleChange("officeLocation", value)}
              data-testid="input-autocomplete-office-location"
            />

            <TextArea
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputEvent}
              data-testid="input-text-area-notes"
            />

            <div className={styles.buttonWrapper}>
              <Button
                type="button"
                disabled={submitAllDataLoading}
                onClick={() => goToStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={submitAllDataLoading}
                data-testid="button-submit"
              >
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
