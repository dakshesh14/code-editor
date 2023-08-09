import { Fragment } from "react";

// headless ui
import { Transition } from "@headlessui/react";

// icons
import {
  XMarkIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

// context
import { TToastAlert } from "@/context/toast.context";

// hooks
import useToast from "@/hooks/use-toast";

export const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed bottom-0 z-10 flex w-full flex-col items-end space-y-4 px-4 py-6 sm:items-end sm:p-6"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

type Props = {
  toast: TToastAlert;
};

const Toast: React.FC<Props> = ({ toast }) => {
  const { title, hide, id, message, status } = toast;

  const { removeToast } = useToast();

  return (
    <>
      <Transition
        show={!hide}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white border bg-clip-padding shadow-lg backdrop-blur-sm backdrop-filter">
          {status === "error" && (
            <div className="absolute left-0 top-0 h-full w-1 bg-red-600"></div>
          )}
          {status === "success" && (
            <div className="absolute left-0 top-0 h-full w-1 bg-green-600"></div>
          )}
          {status === "info" && (
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-600"></div>
          )}
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {status === "error" && (
                  <ExclamationCircleIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                )}
                {status === "success" && (
                  <CheckCircleIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                )}
                {status === "info" && (
                  <InformationCircleIcon
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-700">{message}</p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex rounded-md text-gray-800 focus:outline-none"
                  onClick={() => {
                    removeToast(id);
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
