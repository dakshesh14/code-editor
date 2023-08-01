import { useForm, Controller } from "react-hook-form";

// services
import { createProject } from "@/services";

// constants
import { PROJECT_TYPES } from "@/constant";

// components
import { Select, Input } from "@/ui";

// types
import type { ProjectForm } from "@/types";

type Props = {
  showCancel?: boolean;
  onCancel?: () => void;
  onSuccess: () => void;
};

const defaultValues = {
  name: "",
  project_type: null,
  description: "",
};

export const CreateProjectForm: React.FC<Props> = (props) => {
  const { onSuccess, onCancel, showCancel = true } = props;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProjectForm>({ defaultValues });

  const handleClose = () => {
    reset(defaultValues);
    if (onCancel) onCancel();
  };

  const onSubmit = async (data: ProjectForm) => {
    try {
      await createProject(data);
      onSuccess();
    } catch (error: any) {
      const nonFieldErrors = error?.response?.data?.non_field_errors;

      if (nonFieldErrors)
        setError("non_field_errors", {
          type: "manual",
          message: nonFieldErrors,
        });

      Object.keys(error?.response?.data).forEach((key) => {
        setError(key as keyof ProjectForm, {
          type: "manual",
          message: error?.response?.data[key],
        });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
      <Input
        label="Project Name"
        name="name"
        register={register}
        error={errors.name}
        validations={{
          required: "Project name is required",
        }}
      />

      <Input
        label="Project Description"
        error={errors.description}
        name="description"
        register={register}
        validations={{
          required: "Project description is required",
        }}
      />

      <Controller
        control={control}
        name="project_type"
        rules={{ required: "Project type is required" }}
        render={({ field: { value, onChange } }) => (
          <Select
            label="Project Type"
            selected={
              PROJECT_TYPES.find((type) => type.value === value)?.name || null
            }
            setSelected={onChange}
            options={PROJECT_TYPES.map((type) => ({
              display: type.name,
              value: type.value,
              id: type.value,
            }))}
          />
        )}
      />
      {errors.project_type && (
        <p className="mt-2 text-sm text-red-600" id="project_type-error">
          {errors.project_type.message}
        </p>
      )}

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
        >
          {isSubmitting ? "Creating Project..." : "Create Project"}
        </button>
        {showCancel && (
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            onClick={handleClose}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
