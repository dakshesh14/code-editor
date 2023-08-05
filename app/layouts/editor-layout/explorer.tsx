import { Fragment, useState } from "react";

// headless ui
import { Combobox, Dialog, Transition } from "@headlessui/react";

// icons
import { DocumentIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

// hooks
import useCtrlKeydown from "@/hooks/use-ctrl-keydown";
import useProjectDetailContext from "@/hooks/use-project-detail";

// helpers
import { classNames } from "@/helpers/string.helper";

export const Explorer = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const { directories, setCurrentOpenDirectory } = useProjectDetailContext();

  useCtrlKeydown("p", () => {
    setOpen((prev) => !prev);
  });

  const filteredDirectories = (
    (query === ""
      ? directories
      : directories?.filter((dir) =>
          dir.name.toLowerCase().includes(query.toLowerCase())
        )) || []
  ).filter((dir) => dir.file_type === "file");

  const onClose = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-20 overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-all">
              <Combobox
                onChange={(val: string) => {
                  onClose();
                  setCurrentOpenDirectory(val);
                }}
              >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    autoComplete="off"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === "" || filteredDirectories.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-20 overflow-y-auto"
                  >
                    <li className="p-2">
                      {query === "" && (
                        <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-200">
                          Directories
                        </h2>
                      )}
                      <ul className="text-sm text-gray-400">
                        {filteredDirectories.map((directory) => (
                          <Combobox.Option
                            key={directory.id}
                            value={directory.id}
                            className={({ active }) =>
                              classNames(
                                "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                active && "bg-gray-800 text-white"
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                <DocumentIcon
                                  className={classNames(
                                    "h-6 w-6 flex-none",
                                    active ? "text-white" : "text-gray-500"
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="ml-3 flex-auto truncate">
                                  {directory.path_name}
                                </span>
                                {active && (
                                  <span className="ml-3 flex-none text-gray-400">
                                    Jump to...
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </ul>
                    </li>
                  </Combobox.Options>
                )}

                {query !== "" && filteredDirectories.length === 0 && (
                  <div className="px-6 py-14 text-center sm:px-14">
                    <DocumentIcon
                      className="mx-auto h-6 w-6 text-gray-500"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-200">
                      We couldn{"'"}t find any directory with that term. Please
                      try again.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
