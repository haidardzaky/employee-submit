"use client";

import React from "react";
import styles from "@/styles/TextArea.module.css";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = ({
  label,
  error,
  className,
  ...props
}: TextAreaProps) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <textarea
        className={`${styles.textarea} ${error ? styles.errorBorder : ""} ${
          className ?? ""
        }`}
        {...props}
      />

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
