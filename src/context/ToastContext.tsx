import {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from "react";
import styles from "@/styles/Toast.module.css";

interface ToastType {
  type: "success" | "error" | "info";
  message: string;
}

interface ToastContextProps {
  showToast: (type: ToastType["type"], message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toast, setToast] = useState<ToastType | null>(null);

  const showToast = useCallback(
    (type: ToastType["type"] = "success", message: string) => {
      setToast({ type, message });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};
