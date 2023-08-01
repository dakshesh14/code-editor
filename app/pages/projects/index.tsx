// next
import type { NextPage } from "next";

// layouts
import ProjectLayout from "@/layouts/project-layout";

// components
import { ProjectList } from "@/components/project";

const Project: NextPage = () => {
  return (
    <ProjectLayout>
      <ProjectList />
    </ProjectLayout>
  );
};

export default Project;
