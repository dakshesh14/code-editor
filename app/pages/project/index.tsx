import type { NextPage } from "next";

// components
import { ProjectList } from "@/components/project";

const Project: NextPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end p-2">
        <button
          type="button"
          className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
          Create Project
        </button>
      </div>

      <ProjectList />
    </div>
  );
};

export default Project;
