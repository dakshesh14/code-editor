import { useState } from "react";

// services
import { executeCode } from "@/services";

const useCodeExecutor = (projectSlug: string, directoryId: string) => {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleCodeRun = async () => {
    let data;

    setIsExecuting(true);
    await executeCode(projectSlug, directoryId)
      .then((res) => {
        data = res.logs;
      })
      .finally(() => {
        setIsExecuting(false);
      });

    return data;
  };

  return { isExecuting, handleCodeRun } as const;
};

export default useCodeExecutor;
