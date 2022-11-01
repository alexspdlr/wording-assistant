import { useEffect, useState } from 'react';

const getStoredValue = (key: string, initialValue: any) => {
  if (!key) {
    return undefined;
  }
  const storedValue = localStorage.getItem(key);
  const storedValueParsed =
    typeof storedValue === 'string' ? JSON.parse(storedValue) : undefined;

  if (storedValueParsed) {
    return storedValueParsed;
  }

  return initialValue instanceof Function ? initialValue() : initialValue;
};

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => getStoredValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
