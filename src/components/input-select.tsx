"use client";

import React from "react";
import styles from "../styles/InputSelect.module.css";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface InputSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const InputSelect: React.FC<InputSelectProps> = ({
  label,
  options,
  error,
  ...props
}) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <select className={styles.select} {...props}>
        <option value="">-- Select --</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
