import React from "react";

// next
import dynamic from "next/dynamic";
import type { NextPage } from "next";

// provider
import { ProjectDetailProvider } from "@/context/projectDetail.context";

// layout
import EditorLayout from "@/layouts/editor-layout";

// components
const ProjectEditor = dynamic(
  () => import("@/components/project").then((mod) => mod.ProjectEditor),
  {
    ssr: false,
  }
);

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
