import React, { useRef } from "react";

// next
import type { NextPage } from "next";

// manoco
import type { editor } from "monaco-editor";
import { Editor } from "@monaco-editor/react";

// hooks
import useProjectDetailContext from "@/hooks/use-project-detail";

// helpers
import { getLanguageThroughExtension } from "@/helpers/string.helper";

const THEMES = ["vs", "vs-dark", "hc-black"];

export const ProjectEditor: NextPage = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [chosenTheme, setChosenTheme] = React.useState(THEMES[0]);

  const { directories, currentOpenDirectory } = useProjectDetailContext();

  const currentFile = directories?.find(
    (dir) => dir.id === currentOpenDirectory
  );

  if (!currentFile) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-3">
        {THEMES.map((theme) => (
          <button
            key={theme}
            type="button"
            className={`${
              theme === chosenTheme ? "bg-blue-500" : "bg-gray-200"
            } px-2 py-1 rounded-md`}
            onClick={() => setChosenTheme(theme)}
          >
            {theme}
          </button>
        ))}
      </div>

      <Editor
        onMount={(ref) => (editorRef.current = ref)}
        theme={chosenTheme}
        path={currentFile?.path_name}
        defaultValue={currentFile?.content}
        defaultLanguage={getLanguageThroughExtension(
          currentFile?.name.split(".").pop() ?? ""
        )}
      />
    </div>
  );
};
