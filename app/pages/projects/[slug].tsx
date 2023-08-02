import React from "react";

// next
import type { NextPage } from "next";

// next
import { useRouter } from "next/router";

// manoco
import { Editor } from "@monaco-editor/react";

// layout
import EditorLayout from "@/layouts/editor-layout";

const THEMES = ["vs", "vs-dark", "hc-black"];

const ProjectEdit: NextPage = () => {
  const [chosenTheme, setChosenTheme] = React.useState(THEMES[0]);

  const router = useRouter();
  const { slug } = router.query;

  return (
    <EditorLayout>
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
          defaultLanguage="python"
          theme={chosenTheme}
          defaultValue="// some comment"
        />
      </div>
    </EditorLayout>
  );
};

export default ProjectEdit;
