"use client";

import React, { forwardRef } from "react";
import styles from "../styles/InputText.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className={styles.container}>
        {label && <label className={styles.label}>{label}</label>}

        <input
          ref={ref}
          className={`${styles.input} ${
            error ? styles.errorInput : ""
          } ${className}`}
          {...props}
        />

        {error && <p className={styles.errorText}>{error}</p>}

        {!error && helperText && (
          <p className={styles.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);
