import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, ms: number) => {
  const [data, setData] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(value);
    }, ms);

    return () => clearTimeout(timeout);
  }, [value, ms]);

  return data;
};

export default useDebounce;
