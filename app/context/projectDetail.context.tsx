import { createContext, useReducer, useCallback } from "react";

export const projectDetailContext = createContext(
  {} as ProjectDetailStateContext & ProjectDetailFunctionContext
);

// types

import type { Directory } from "@/types";

export type ProjectDetailStateContext = {
  directories: Directory[];
  isFileSearchOpen: boolean;
  search: string;
  isExecuting: boolean;
};

export type ProjectDetailFunctionContext = {
  setSearch: (val: string) => void;
  setIsExecuting: (val: boolean) => void;
  setFileSearchOpen: (val: boolean) => void;
};

type Reducer = (
  state: ProjectDetailStateContext,
  action: any
) => ProjectDetailStateContext;

// reducer
export const projectDetailReducer: Reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload?.search || "",
      };
    case "SET_IS_EXECUTING":
      return {
        ...state,
        isExecuting: action.payload?.isExecuting || false,
      };
    case "SET_IS_FILE_SEARCH_OPEN":
      return {
        ...state,
        isFileSearchOpen: action.payload?.isFileSearchOpen || false,
      };
    case "SET_DIRECTORIES":
      return { ...state, directories: action.payload?.directories || [] };
    default:
      return state;
  }
};

// provider
export const ProjectDetailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(projectDetailReducer, {
    directories: [],
    isFileSearchOpen: false,
    search: "",
    isExecuting: false,
  });

  const setSearch = useCallback(
    (search: string) => {
      dispatch({
        type: "SET_SEARCH",
        payload: { search },
      });
    },
    [dispatch]
  );

  const setIsExecuting = useCallback(
    (isExecuting: boolean) => {
      dispatch({
        type: "SET_IS_EXECUTING",
        payload: { isExecuting },
      });
    },
    [dispatch]
  );

  const setFileSearchOpen = useCallback(
    (isFileSearchOpen: boolean) => {
      dispatch({
        type: "SET_IS_FILE_SEARCH_OPEN",
        payload: { isFileSearchOpen },
      });
    },
    [dispatch]
  );

  return (
    <projectDetailContext.Provider
      value={{
        ...state,
        setSearch,
        setIsExecuting,
        setFileSearchOpen,
      }}
    >
      {children}
    </projectDetailContext.Provider>
  );
};
