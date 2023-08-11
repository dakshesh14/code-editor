// react hook form
import { useForm } from "react-hook-form";

// tw
import { twMerge } from "tailwind-merge";

// icons
import {
  DocumentIcon,
  FolderIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// services
import { createDirectory } from "@/services";

// hooks
import useProjectDetailContext from "@/hooks/use-project-detail";

// types
import type { Directory, DirectoryForm } from "@/types";

const defaultValues: Partial<DirectoryForm> = {
  name: "",
};

type Props = {
  directory?: Directory | null;
  isFile?: boolean;
  handleClose: () => void;
  className?: string;
};

export const CreateDirectoryInline: React.FC<Props> = (props) => {
  const { directory, isFile, handleClose, className } = props;

  const { register, handleSubmit } = useForm<DirectoryForm>({ defaultValues });

  const { mutateDirectories, project } = useProjectDetailContext();

  const onSubmit = async (data: DirectoryForm) => {
    await createDirectory(project?.slug!, {
      ...data,
      parent: directory?.id || null,
      project: project?.id!,
    }).then((res) => {
      mutateDirectories((prev) => [...(prev || []), res]);
      handleClose();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={twMerge(
        "px-2 ml-4 flex items-center gap-0.5",
        className ?? ""
      )}
    >
      {isFile ? (
        <DocumentIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
      ) : (
        <FolderIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
      )}

      <input
        type="text"
        {...register("name")}
        className="bg-gray-800 text-gray-300 rounded-md px-2 py-1 w-full"
      />

      <button
        type="button"
        onClick={handleClose}
        className="text-gray-300 hover:text-gray-400"
      >
        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  );
};
