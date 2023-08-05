import React, { useRef, useState } from "react";

// next
import type { NextPage } from "next";

// manoco
import type { editor } from "monaco-editor";
import { Editor } from "@monaco-editor/react";

// icons
import {
  PlayIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

// services
import { updateDirectory } from "@/services";

// hooks
import useCtrlKeydown from "@/hooks/use-ctrl-keydown";
import useCodeExecutor from "@/hooks/use-code-executor";
import useProjectDetailContext from "@/hooks/use-project-detail";

// helpers
import { getLanguageThroughExtension } from "@/helpers/string.helper";

const THEMES = ["vs", "vs-dark"];

export const ProjectEditor: NextPage = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [chosenTheme, setChosenTheme] = useState(THEMES[0]);
  const [executionResult, setExecutionResult] = useState<string | null>(null);

  const { directories, currentOpenDirectory, project } =
    useProjectDetailContext();

  const currentFile = directories?.find(
    (dir) => dir.id === currentOpenDirectory
  );

  const { handleCodeRun, isExecuting } = useCodeExecutor(
    project?.slug!,
    currentFile?.id!
  );
  useCtrlKeydown("q", () => {
    handleCodeRun(editorRef.current?.getValue() || "").then((res) => {
      setExecutionResult(res || null);
    });
  });
  useCtrlKeydown("s", () => {
    updateDirectory(currentFile?.id!, {
      content: editorRef.current?.getValue() || "",
      name: currentFile?.name!,
      parent: currentFile?.parent!,
      project: currentFile?.project!,
    });
  });

  if (!currentFile)
    return (
      <div className="h-full w-full flex flex-col justify-center px-10 md:px-32">
        <h3 className="text-gray-800 font-semibold text-2xl">
          Select a file to edit
        </h3>

        <div className="border-b border-gray-200 my-2" />

        <p className="py-5">
          <kbd className="bg-gray-200 text-gray-800 rounded-md py-1 px-2">
            cmd + p
          </kbd>
          <span className="text-gray-800"> to open explorer/settings</span>
        </p>

        <p>
          <kbd className="bg-gray-200 text-gray-800 rounded-md py-1 px-2">
            cmd + q
          </kbd>
          <span className="text-gray-800"> to execute code</span>
        </p>
      </div>
    );

  return (
    <div className="relative flex flex-col h-full">
      <div className="bg-gray-900 border-b border-gray-800 p-2 flex items-center justify-between">
        <div>
          <p className="text-gray-200 font-semibold text-lg">
            {currentFile?.name}{" "}
          </p>
        </div>
        <div className="space-x-2">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {chosenTheme === THEMES[0] ? (
              <MoonIcon
                className="h-5 w-5"
                aria-hidden="true"
                onClick={() => setChosenTheme(THEMES[1])}
              />
            ) : (
              <SunIcon
                className="h-5 w-5"
                aria-hidden="true"
                onClick={() => setChosenTheme(THEMES[0])}
              />
            )}
          </button>

          <button
            type="button"
            disabled={isExecuting}
            onClick={() =>
              handleCodeRun(editorRef.current?.getValue() ?? "").then((res) =>
                setExecutionResult(res || null)
              )
            }
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <PlayIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Editor
        onMount={(ref) => (editorRef.current = ref)}
        theme={chosenTheme}
        path={currentFile?.path_name}
        value={currentFile?.content || ""}
        language={getLanguageThroughExtension(
          currentFile?.name.split(".").pop() ?? ""
        )}
        options={{
          mouseWheelZoom: true,
          minimap: {
            enabled: false,
          },
        }}
      />

      {executionResult && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 flex flex-col w-full h-[30vh]">
          <div className="w-full flex justify-between">
            <p className="text-gray-200 font-semibold text-lg">Output</p>
            <button type="button" onClick={() => setExecutionResult(null)}>
              <XMarkIcon className="h-5 w-5 text-gray-200" aria-hidden="true" />
            </button>
          </div>

          <div className="w-full h-full overflow-y-auto hide-scrollbar mt-2">
            <pre className="text-gray-200">{executionResult}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
