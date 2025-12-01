import { InputText } from "@/components/input-text";
import { InputAutocomplete } from "@/components/input-autocomplete";
import { MainLayout } from "@/layout/main-layout";
import { generateEmployeeID } from "@/helper/generate-employee-id";
import { Button } from "@/components/button";
import styles from "@/styles/Wizard.module.css";
import { Fragment, useState } from "react";
import { ImageUpload } from "@/components/upload-image";
import { InputSelect } from "@/components/input-select";
import { TextArea } from "@/components/text-area";

export const WizardScreen = () => {
  const [step, setStep] = useState(1);
  const suggestions = [
    { label: "Engineering", value: "engineering" },
    { label: "Finance", value: "finance" },
  ];

  const suggestionsLocation = [
    { label: "Jakarta", value: "jakarta" },
    { label: "Bandung", value: "bandung" },
    { label: "Surabaya", value: "surabaya" },
  ];

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const optionsEmploymentType = [
    { label: "Full-time", value: "fulltime" },
    {
      label: "Part-time",
      value: "parttime",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Step - {step}</h1>
      {step === 1 ? (
        <>
          <InputText label="Full Name" />
          <InputText label="Email" />
          <InputAutocomplete label="Department" options={suggestions} />
          <InputText
            label="Employee ID"
            value={generateEmployeeID("Engineering", 0)}
            disabled
          />
          <Button
            style={{ float: "right", marginLeft: "auto" }}
            onClick={handleNextStep}
          >
            Next
          </Button>
        </>
      ) : (
        <>
          <ImageUpload label="Upload Image" />
          <InputSelect
            label="Employment Type"
            options={optionsEmploymentType}
          />
          <InputAutocomplete
            label="Office Location"
            options={suggestionsLocation}
          />
          <TextArea label="Notes" />
          <Button
            style={{ float: "right", marginLeft: "auto" }}
            onClick={() => console.info("test")}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};
