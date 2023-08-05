import { useState } from "react";

// services
import { executeCode } from "@/services";

const useCodeExecutor = (directoryId: string) => {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleCodeRun = async (code: string) => {
    let data;

    setIsExecuting(true);
    await executeCode(code, directoryId)
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
