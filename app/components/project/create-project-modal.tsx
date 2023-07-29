import { Fragment } from "react";

// react hook form
import { useForm, Controller } from "react-hook-form";

// headless ui
import { Dialog, Transition } from "@headlessui/react";

// constants
import { PROJECT_TYPES } from "@/constant";

// components
import { Select, Input } from "@/ui";

// types
import type { ProjectForm } from "@/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onSuccess: () => void;
};

const defaultValues = {
  name: "",
  project_type: null,
  description: "",
};

export const CreateProjectModal: React.FC<Props> = (props) => {
  const { isOpen, onClose, onSubmit, onSuccess } = props;

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectForm>({ defaultValues });

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="mt-3 sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Create Project
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Create a new project and start collobrating.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-10">
                  <Controller
                    control={control}
                    name="project_type"
                    rules={{ required: "Project type is required" }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label="Project Type"
                        selected={
                          PROJECT_TYPES.find((type) => type.value === value)
                            ?.name || null
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

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={handleClose}
                    >
                      Create Project
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
