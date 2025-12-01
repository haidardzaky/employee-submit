import React, { useState, ChangeEvent, InputHTMLAttributes } from "react";
import styles from "../styles/InputAutocomplete.module.css";

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface AutocompleteInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onSelect"> {
  label?: string;
  options: AutocompleteOption[];
  onSelect?: (value: AutocompleteOption) => void;
}

export const InputAutocomplete = ({
  label,
  options,
  onSelect,
  ...props
}: AutocompleteInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [filtered, setFiltered] = useState<AutocompleteOption[]>([]);
  const [showList, setShowList] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);

    const result = options.filter((o) =>
      o.label.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(result);
    setShowList(result.length > 0);
  }

  const handleSelect = (option: AutocompleteOption) => {
    setInputValue(option.label);
    setShowList(false);
    onSelect?.(option);
  };

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        {...props}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => filtered.length > 0 && setShowList(true)}
        className={styles.input}
      />

      {showList && inputValue && (
        <div className={styles.dropdown}>
          {filtered.map((option) => (
            <div
              key={option.value}
              className={styles.item}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
