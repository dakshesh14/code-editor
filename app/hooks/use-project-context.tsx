import { useContext } from "react";

import { projectContext } from "@/context/project.context";

const useProjectContext = () => {
  const context = useContext(projectContext);

  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }

  return context;
};

export default useProjectContext;
