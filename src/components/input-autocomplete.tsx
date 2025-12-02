import { useState, ChangeEvent, InputHTMLAttributes, useEffect } from "react";
import styles from "../styles/InputAutocomplete.module.css";

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface AutocompleteInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onSelect" | "onChange"> {
  label?: string;
  value?: string; // <-- controlled value from parent
  options: AutocompleteOption[];
  onSelect?: (option: AutocompleteOption) => void;
  onValueChange?: (value: string) => void;
}

export const InputAutocomplete = ({
  label,
  value = "", // <-- use parent value
  options,
  onSelect,
  onValueChange,
  ...props
}: AutocompleteInputProps) => {
  const [filtered, setFiltered] = useState<AutocompleteOption[]>([]);
  const [showList, setShowList] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    onValueChange?.(newValue);

    if (newValue.trim() === "") {
      setFiltered([]);
      setShowList(false);
      return;
    }

    const result = options.filter((o) =>
      o.label.toLowerCase().includes(newValue.toLowerCase())
    );

    setFiltered(result);
    setShowList(result.length > 0);
  };

  const handleSelect = (option: AutocompleteOption) => {
    onValueChange?.(option.value); // parent stores value
    onSelect?.(option);

    setShowList(false);
  };

  useEffect(() => {
    if (!value) {
      setFiltered([]);
      setShowList(false);
    }
  }, [value]);

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        {...props}
        value={value} // <-- controlled by parent
        onChange={handleChange}
        onFocus={() => filtered.length > 0 && setShowList(true)}
        className={styles.input}
      />

      {showList && value && (
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
