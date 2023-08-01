import { createContext, useCallback, useReducer } from "react";

import { v4 as uuid } from "uuid";

import { ToastContainer } from "@/ui";

export const ToastContext = createContext({} as TToastContext);

// types
export type TToastAlert = {
  id: string;
  status: "success" | "error" | "info";
  title: string;
  hide: boolean;
  message?: string;
};

type TToastContext = {
  toasts: TToastAlert[];
  removeToast: (id: string) => void;
  addToast: (toast: Omit<TToastAlert, "id">) => void;
};

type TToastState = TToastAlert[];

type TToastAction =
  | { type: "ADD"; payload: TToastAlert }
  | { type: "REMOVE"; payload: string };

// reducer
const toastReducer = (state: TToastState, action: TToastAction) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return [
        ...state.map((toast) => {
          if (toast.id === action.payload) {
            toast.hide = true;
          }
          return toast;
        }),
      ];
    default:
      return state;
  }
};

// provider
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const removeToast = useCallback((id: string) => {
    dispatch({
      type: "REMOVE",
      payload: id,
    });
  }, []);

  const addToast = useCallback(
    ({ status, title, message }: Omit<TToastAlert, "id" | "hide">) => {
      const id = uuid();
      dispatch({
        type: "ADD",
        payload: {
          id,
          status,
          title,
          message,
          hide: false,
        },
      });

      setTimeout(() => {
        removeToast(id);
      }, 5000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
      }}
    >
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};
