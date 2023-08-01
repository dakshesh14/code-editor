import type { Project } from "@/types";

type Props = {
  data: Project;
};

export const ProjectCard: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 border-l-4 border-indigo-600 p-2 py-4 space-y-2 bg-indigo-50/50">
      <h2 className="text-lg font-semibold text-gray-900">{data.name}</h2>
      <p>{data.description}</p>
      <button
        type="button"
        className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Edit Project <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};
