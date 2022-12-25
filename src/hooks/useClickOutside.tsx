import { useEffect, useRef } from "react";

const useClickOutside = (callback: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return ref;
};

export default useClickOutside;
