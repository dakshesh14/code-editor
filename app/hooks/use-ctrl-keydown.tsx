import { useCallback, useEffect } from "react";

const useCtrlKeydown = (key: string, callback: () => void) => {
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === key) {
        e.preventDefault();
        callback();
      }
    },
    [callback, key]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);
};

export default useCtrlKeydown;
