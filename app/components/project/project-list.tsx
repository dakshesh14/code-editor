import Link from "next/link";

// swr
import useSWR from "swr";

// services
import { getProjects } from "@/services";

// hooks
import useProjectContext from "@/hooks/use-project-context";

// components
import { ProjectCard, ProjectCardSkeleton } from "@/components/project";

export const ProjectList: React.FC = () => {
  const { data: projects, error } = useSWR("/projects", getProjects);

  const isLoading = !projects && !error;

  const { search } = useProjectContext();

  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredProjects && filteredProjects.length === 0) {
    return (
      <div className="col-span-12">
        <p className="text-xl text-gray-900">
          {search && search !== "" ? (
            <>
              No projects found for{" "}
              <span className="font-semibold">{search}</span>
            </>
          ) : (
            "No projects found"
          )}
        </p>

        {search === "" && (
          <p className="font-light mb-5">
            You can create a new project by clicking the button below.
          </p>
        )}

        <Link
          as="/projects/new"
          href="#"
          className="text-sm font-semibold text-gray-900 italic hover:underline"
        >
          Create Project <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))
        : filteredProjects &&
          filteredProjects.length > 0 &&
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} data={project} />
          ))}
    </div>
  );
};
