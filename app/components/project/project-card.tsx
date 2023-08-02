import Link from "next/link";

import type { Project } from "@/types";

type Props = {
  data: Project;
};

export const ProjectCard: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 border-l-4 border-gray-900 p-3 py-4 bg-indigo-50/50">
      <h2 className="text-lg font-semibold text-gray-900">{data.name}</h2>
      <p className="text-sm font-light">{data.description}</p>
      <Link href={`/projects/${data.slug}`}>
        <button
          type="button"
          className="text-sm font-semibold text-gray-900 italic hover:underline mt-5"
        >
          Open Project <span aria-hidden="true">→</span>
        </button>
      </Link>
    </div>
  );
};

export const ProjectCardSkeleton: React.FC = () => (
  <div className="h-32 col-span-12 md:col-span-6 lg:col-span-4 p-3 py-4 bg-gray-100 animate-pulse" />
);
