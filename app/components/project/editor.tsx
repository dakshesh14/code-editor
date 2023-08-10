import React from "react";

// next
import type { NextPage } from "next";

// manoco
import { Editor } from "@monaco-editor/react";

// icons
import {
  PlayIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

// hooks
import useEditor, { THEMES } from "@/hooks/use-editor";
import useProjectDetailContext from "@/hooks/use-project-detail";

export const ProjectEditor: NextPage = () => {
  const { directories, currentOpenDirectory } = useProjectDetailContext();

  const {
    editorTheme,
    executionResult,
    runCode,
    handleEditorMount,
    handleSave,
    isChanged,
    isExecuting,
    language,
    onChange,
    toggleTheme,
    value,
    clearExecutionResult,
  } = useEditor();

  const currentFile = directories?.find(
    (dir) => dir.id === currentOpenDirectory
  );

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
        <div className="space-x-2 flex items-center">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center px-3 py-2 shadow-sm text-sm leading-4 font-medium text-white"
          >
            <span id="save-button" className="text-gray-400">
              {isChanged ? "Unsaved Changes" : "Saved"}
            </span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {editorTheme === THEMES[0] ? (
              <MoonIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <SunIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            disabled={isExecuting}
            onClick={() => {
              runCode();
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <PlayIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Editor
        onMount={handleEditorMount}
        theme={editorTheme}
        path={currentFile?.path_name}
        value={value}
        language={language}
        onChange={onChange}
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
            <button type="button" onClick={clearExecutionResult}>
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
