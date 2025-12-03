"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/UploadImage.module.css";
import { fileToBase64 } from "@/helper/file-to-base64";

export interface ImageUploadProps {
  label?: string;
  value?: string | null;
  onChange?: (base64: string | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label = "Upload Image",
  value = null,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(value);

  useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

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

    // bisa kosongkan input file
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>

      {preview && (
        <div className={styles.wrapperPreview}>
          <img
            src={preview}
            className={`${styles.preview} ${
              preview ? styles.previewVisible : ""
            }`}
            alt="Preview"
          />

          <button
            type="button"
            className={styles.button}
            style={{ backgroundColor: "red" }}
            onClick={handleRemoveFile}
          >
            X
          </button>
        </div>
      )}

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
        data-testid="input-file-image"
      />
    </div>
  );
};
