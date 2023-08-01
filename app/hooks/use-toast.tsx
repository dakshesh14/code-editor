import { useContext } from "react";

// context
import { ToastContext } from "@/context/toast.context";

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export default useToast;
