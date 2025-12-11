import { useState, useEffect } from 'react';

interface IUseDebounceProps<T> {
  value: T;
  delay?: number;
}
const useDebounce = <T>(props: IUseDebounceProps<T>) => {
  const { delay, value } = props;

  const [debouncedValue, setDebouncedValue] = useState(value);

  const currDelay = delay ?? 0;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, currDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, currDelay]);

  return debouncedValue;
};

export { useDebounce };
