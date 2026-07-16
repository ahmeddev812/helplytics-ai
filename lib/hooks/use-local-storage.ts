"use client";

import { useState, useCallback } from "react";

function readValue<T>(key: string, initialValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    return readValue(key, initialValue);
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      const prev = readValue(key, initialValue);
      const valueToStore = value instanceof Function ? value(prev) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    },
    [key, initialValue]
  );

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  const isHydrated = true;

  return [storedValue, setValue, removeValue, isHydrated] as const;
}
