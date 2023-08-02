import { createContext, useReducer } from "react";

export const projectContext = createContext(
  {} as ProjectContext & {
    setSearch: (search: string) => void;
  }
);

// types
export type ProjectContext = {
  search: string;
};

// reducer
const projectReducer = (state: ProjectContext, action: any) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

// provider
export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(projectReducer, {
    search: "",
  });

  const setSearch = (search: string) => {
    dispatch({
      type: "SET_SEARCH",
      payload: search,
    });
  };

  return (
    <projectContext.Provider value={{ ...state, setSearch }}>
      {children}
    </projectContext.Provider>
  );
};
