"use client";

import React, { useRef, useState } from "react";
import styles from "../styles/UploadImage.module.css";

export interface ImageUploadProps {
  label?: string;
  value?: string | null; // base64 string from parent
  onChange?: (base64: string | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label = "Upload Image",
  value = null,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(value);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);

      reader.readAsDataURL(file); // Convert to base64
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setPreview(null);
      onChange?.(null);
      return;
    }

    const base64 = await fileToBase64(file);

    setPreview(base64);
    onChange?.(base64);
  };

  const handleRemoveFile = () => {
    setPreview(null);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>

      <div>
        {preview && (
          <div className={styles.wrapperPreview}>
            <div>
              <img
                src={preview}
                className={`${styles.preview} ${
                  preview ? styles.previewVisible : ""
                }`}
                alt="Preview"
              />
            </div>
            <div className={styles.buttonClearWrapper}>
              <button
                type="button"
                className={styles.button}
                style={{ backgroundColor: "red" }}
                onClick={handleRemoveFile}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          className={styles.button}
          onClick={handleButtonClick}
        >
          Choose Image
        </button>

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className={styles.input}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
