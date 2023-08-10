import { use, useRef, useState } from "react";

// services
import { updateDirectory } from "@/services";

// hooks
import useToast from "@/hooks/use-toast";
import useCtrlKeydown from "@/hooks/use-ctrl-keydown";
import useCodeExecutor from "@/hooks/use-code-executor";
import useProjectDetailContext from "@/hooks/use-project-detail";

// helpers
import { getLanguageThroughExtension } from "@/helpers/string.helper";

export const THEMES = ["vs", "vs-dark"];

const useEditor = () => {
  const editorRef = useRef<any | null>(null);

  const [chosenTheme, setChosenTheme] = useState(THEMES[0]);
  const [executionResult, setExecutionResult] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  const { addToast } = useToast();

  const { directories, currentOpenDirectory, project, mutateDirectories } =
    useProjectDetailContext();

  const currentFile = directories?.find(
    (dir) => dir.id === currentOpenDirectory
  );

  const { handleCodeRun, isExecuting } = useCodeExecutor(
    project?.slug!,
    currentFile?.id!
  );

  const runCode = async () => {
    if (project?.project_type === "react") {
      window.open(`/output/${project?.slug}/`, "_blank");
      return;
    }

    if (isExecuting) {
      addToast({
        title: "Already Executing",
        message: "Please wait while we execute your code",
        status: "info",
        hide: false,
      });
      return;
    }

    addToast({
      title: "Executing Code",
      message: "Please wait while we execute your code",
      status: "info",
      hide: false,
    });

    const res = await handleCodeRun();

    setExecutionResult(res || null);
  };

  const handleSave = async () => {
    const saveBtn = document.getElementById("save-button");

    if (saveBtn) saveBtn.innerText = "Saving...";

    await updateDirectory(currentFile?.id!, {
      content: editorRef.current?.getValue() || "",
      name: currentFile?.name!,
      parent: currentFile?.parent!,
      project: currentFile?.project!,
    }).then((res) => {
      setIsChanged(false);

      if (saveBtn) saveBtn.innerText = "Saved";

      mutateDirectories((dirs) => {
        if (!dirs) return;
        const index = dirs.findIndex((dir) => dir.id === currentFile?.id!);
        dirs[index] = res;
        return [...dirs];
      });
    });
  };

  useCtrlKeydown("s", handleSave);
  useCtrlKeydown("q", runCode);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const toggleTheme = () => {
    setChosenTheme((prev) => {
      return prev === THEMES[0] ? THEMES[1] : THEMES[0];
    });
  };

  const onChange = (value?: string) => {
    if (!currentFile) return;

    const isChange =
      JSON.stringify(currentFile?.content) !== JSON.stringify(value);

    setIsChanged(isChange);
  };

  return {
    handleEditorMount,
    editorTheme: chosenTheme,
    toggleTheme,
    value: currentFile?.content || "",
    language: getLanguageThroughExtension(
      currentFile?.name.split(".").pop() ?? ""
    ).split(";")[0],
    isChanged,
    handleSave,
    isExecuting,
    executionResult,
    onChange,
    runCode,
    clearExecutionResult: () => setExecutionResult(null),
  };
};

export default useEditor;
