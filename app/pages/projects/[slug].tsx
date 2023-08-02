import React from "react";

// next
import type { NextPage } from "next";

// provider
import { ProjectDetailProvider } from "@/context/projectDetail.context";

// layout
import EditorLayout from "@/layouts/editor-layout";

// components
import { ProjectEditor } from "@/components/project";

const ProjectEdit: NextPage = () => {
  return (
    <ProjectDetailProvider>
      <EditorLayout>
        <ProjectEditor />
      </EditorLayout>
    </ProjectDetailProvider>
  );
};

export default ProjectEdit;
