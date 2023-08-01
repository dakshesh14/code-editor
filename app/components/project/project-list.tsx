// swr
import useSWR from "swr";

// services
import { getProjects } from "@/services";

import { ProjectCard } from "@/components/project";

export const ProjectList: React.FC = () => {
  const { data: projects, error } = useSWR("/projects", getProjects);

  if (error) return <div>failed to load</div>;

  if (!projects) return <div>loading...</div>;

  return (
    <div className="mt-5 md:mt-10 lg:mt-20">
      <div className="grid grid-cols-12 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))}
      </div>
    </div>
  );
};
