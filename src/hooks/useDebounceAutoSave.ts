import { useEffect, useRef } from "react";

export const useDebounceAutoSave = (data: any, key: string, delay = 2000) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(data));
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, key, delay]);
};
