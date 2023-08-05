// next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// headless ui
import { Disclosure } from "@headlessui/react";

// icons
import { FolderIcon, HomeIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

// helpers
import { classNames, getLanguageLogo } from "@/helpers/string.helper";

// hooks
import useProjectDetailContext from "@/hooks/use-project-detail";

// types
import type { Directory } from "@/types";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
];

const DirectoryItem: React.FC<{ directory: Directory }> = ({ directory }) => {
  const { currentOpenDirectory, setCurrentOpenDirectory, directories } =
    useProjectDetailContext();

  const children =
    directories?.filter((dir) => dir.parent === directory.id) || [];

  const languageLogo = getLanguageLogo(directory.name);

  return (
    <li>
      {children.length <= 0 ? (
        <button
          type="button"
          onClick={() => setCurrentOpenDirectory(directory.id)}
          className={classNames(
            currentOpenDirectory === directory.id
              ? "bg-gray-600"
              : "hover:bg-gray-700",
            "rounded-md py-2 pl-4 text-sm leading-6 font-semibold text-gray-300 w-full flex items-center text-left truncate"
          )}
        >
          {languageLogo && (
            <Image
              src={languageLogo}
              alt={directory.name}
              width={18}
              height={18}
              className="mr-2"
            />
          )}
          {directory.name}
        </button>
      ) : (
        <Disclosure as="div">
          {({ open }) => (
            <>
              <Disclosure.Button
                className={classNames(
                  currentOpenDirectory === directory.id
                    ? "bg-gray-600"
                    : "hover:bg-gray-700",
                  "rounded-md py-2 pl-3 text-sm leading-6 font-semibold text-gray-300 w-full flex items-center text-left truncate"
                )}
              >
                <ChevronRightIcon
                  className={classNames(
                    open ? "rotate-90 text-gray-500" : "text-gray-400",
                    "h-5 w-5 shrink-0"
                  )}
                  aria-hidden="true"
                />
                {directory.name}
              </Disclosure.Button>
              <Disclosure.Panel as="ul" className="mt-1 px-2">
                {children.map((subDirectory) => (
                  <DirectoryItem
                    key={subDirectory.id}
                    directory={subDirectory}
                  />
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </li>
  );
};

export const Sidebar: React.FC = () => {
  const router = useRouter();

  const { project, directories } = useProjectDetailContext();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 py-4">
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        router.pathname === item.href
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                {project?.name || "Loading..."}
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {directories
                  ? directories
                      .filter((directory) => directory.parent === null)
                      .map((directory) => (
                        <DirectoryItem
                          key={directory.id}
                          directory={directory}
                        />
                      ))
                  : "loading..."}
              </ul>
            </li>
            <li className="mt-auto">
              <Link
                target="_blank"
                href="https://github.com/dakshesh14/code-editor"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                Star on GitHub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
