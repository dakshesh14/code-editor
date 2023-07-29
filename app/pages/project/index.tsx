import type { NextPage } from "next";

// react
import { useState } from "react";

// components
import { ProjectList, CreateProjectModal } from "@/components/project";

const Project: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end p-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
        >
          Create Project
        </button>
      </div>

      <ProjectList />

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Project;
