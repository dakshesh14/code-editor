import { ProjectCard } from "@/components/project";

export const ProjectList: React.FC = () => {
  return (
    <div className="mt-5 md:mt-10 lg:mt-20">
      <div className="grid grid-cols-12 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProjectCard key={index} />
        ))}
      </div>
    </div>
  );
};
