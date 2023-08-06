import { createContext, useReducer, useCallback, useEffect } from "react";

// next
import { useRouter } from "next/router";

// swr
import useSWR, { KeyedMutator } from "swr";

// services
import { getProjectBySlug, getProjectDirectories } from "@/services";

export const projectDetailContext = createContext(
  {} as ProjectDetailStateContext & ProjectDetailFunctionContext
);

// types
import type { Directory, Project } from "@/types";

export type ProjectDetailStateContext = {
  directories?: Directory[];
  isDirectoryLoading: boolean;
  project?: Project;
  isProjectLoading: boolean;
  isFileSearchOpen: boolean;
  search: string;
  isExecuting: boolean;
  currentOpenDirectory?: string;
};

export type ProjectDetailFunctionContext = {
  setSearch: (val: string) => void;
  setIsExecuting: (val: boolean) => void;
  setFileSearchOpen: (val: boolean) => void;
  mutateProjectDetail: KeyedMutator<Project>;
  mutateDirectories: KeyedMutator<Directory[]>;
  setCurrentOpenDirectory: (val: string) => void;
};

type Reducer = (
  state: ProjectDetailStateContext,
  action: any
) => ProjectDetailStateContext;

const initialState: ProjectDetailStateContext = {
  directories: undefined,
  isDirectoryLoading: false,
  project: undefined,
  isProjectLoading: false,
  isFileSearchOpen: false,
  search: "",
  isExecuting: false,
};

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
    case "SET_CURRENT_OPEN_DIRECTORY":
      return {
        ...state,
        currentOpenDirectory: action.payload?.currentOpenDirectory || "",
      };
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
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: projectDetail,
    mutate: projectDetailMutate,
    error: projectDetailError,
  } = useSWR<Project>(
    slug ? `/api/projects/${slug}` : null,
    slug ? () => getProjectBySlug(slug.toString()) : null
  );

  const {
    data: directories,
    mutate: directoriesMutate,
    error: directoriesError,
  } = useSWR<Directory[]>(
    slug ? `/api/projects/${slug}/directories` : null,
    slug ? () => getProjectDirectories(slug.toString()) : null
  );

  const [state, dispatch] = useReducer(projectDetailReducer, initialState);

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

  const setCurrentOpenDirectory = useCallback(
    (currentOpenDirectory: string) => {
      dispatch({
        type: "SET_CURRENT_OPEN_DIRECTORY",
        payload: { currentOpenDirectory },
      });
    },
    [dispatch]
  );

  return (
    <projectDetailContext.Provider
      value={{
        ...state,
        setSearch,
        directories,
        setIsExecuting,
        setFileSearchOpen,
        project: projectDetail,
        setCurrentOpenDirectory,
        isDirectoryLoading: !directories && !directoriesError,
        isProjectLoading: !projectDetail && !projectDetailError,
        mutateProjectDetail: projectDetailMutate,
        mutateDirectories: directoriesMutate,
      }}
    >
      {children}
    </projectDetailContext.Provider>
  );
};
