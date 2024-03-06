import {useEffect, useState} from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 300);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
}
