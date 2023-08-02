import { useContext } from "react";

import { projectDetailContext } from "@/context/projectDetail.context";

const useProjectDetailContext = () => {
  const context = useContext(projectDetailContext);

  if (!context) {
    throw new Error(
      "useProjectDetailContext must be used within a ProjectDetailProvider"
    );
  }

  return context;
};

export default useProjectDetailContext;
