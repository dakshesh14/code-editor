// next
import type { NextPage } from "next";

// layouts
import ProjectLayout from "@/layouts/project-layout";

// providers
import { ProjectProvider } from "@/context/project.context";

// components
import { ProjectList } from "@/components/project";

const Project: NextPage = () => {
  return (
    <ProjectProvider>
      <ProjectLayout>
        <ProjectList />
      </ProjectLayout>
    </ProjectProvider>
  );
};

export default Project;
