// next
import type { NextPage } from "next";
import { useRouter } from "next/router";

// swr
import { mutate } from "swr";

// layouts
import ProjectLayout from "@/layouts/project-layout";

// providers
import { ProjectProvider } from "@/context/project.context";

// hooks
import useToast from "@/hooks/use-toast";

// components
import { CreateProjectForm } from "@/components/project";

const NewProject: NextPage = () => {
  const router = useRouter();

  const { addToast } = useToast();

  return (
    <ProjectProvider>
      <ProjectLayout>
        <h2 className="text-2xl font-bold text-gray-900">
          Create a new project
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a new project to writing code and collaborate with others.
        </p>

        <CreateProjectForm
          showCancel={false}
          onSuccess={() => {
            router.push("/projects");
            addToast({
              title: "Project created",
              message: "Your project has been created successfully.",
              status: "success",
              hide: false,
            });
            mutate("/projects");
          }}
        />
      </ProjectLayout>
    </ProjectProvider>
  );
};

export default NewProject;
