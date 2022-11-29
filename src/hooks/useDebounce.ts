import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, timeOut: number) {
  const [retValue, setRetValue] = useState<T>();
  useEffect(() => {
    const timeOutFunction = setTimeout(() => setRetValue((s) => value), timeOut);

    return () => {
      clearTimeout(timeOutFunction);
    };
  }, [value, timeOut]);
  return { retValue };
}

export default useDebounce;
