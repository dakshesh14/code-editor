import { useState } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/router";

// icons
import { FolderIcon, HomeIcon } from "@heroicons/react/24/outline";
// icons
import { FolderPlusIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";

// helpers
import { classNames } from "@/helpers/string.helper";

// hooks
import useProjectDetailContext from "@/hooks/use-project-detail";

// components
import { DirectoryItem } from "@/layouts/editor-layout/directory-item";
import { CreateDirectoryInline } from "@/layouts/editor-layout/create-directory-inline";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
];

export const Sidebar: React.FC = () => {
  const router = useRouter();

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuClickPosition, setContextMenuClickPosition] = useState({
    x: 0,
    y: 0,
  });
  const [inlineOpenFor, setInlineOpenFor] = useState<"file" | "folder" | null>(
    null
  );

  const { project, directories } = useProjectDetailContext();

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenuClickPosition({ x: e.clientX, y: e.clientY });
        setIsContextMenuOpen(true);
      }}
      className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      {isContextMenuOpen && (
        <div
          style={{
            top: contextMenuClickPosition.y,
            left: contextMenuClickPosition.x,
          }}
          className="fixed bg-gray-800 text-gray-300 space-y-2 rounded-md py-2 border z-50"
        >
          <button
            type="button"
            onClick={() => {
              setInlineOpenFor("file");
              setIsContextMenuOpen(false);
            }}
            className="flex items-center gap-x-2 hover:bg-gray-500 rounded-md w-full pl-2 pr-8 py-1"
          >
            <DocumentPlusIcon className="h-5 w-5" aria-hidden="true" />
            <span>New File</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setInlineOpenFor("folder");
              setIsContextMenuOpen(false);
            }}
            className="flex items-center gap-x-2 hover:bg-gray-500 rounded-md w-full pl-2 pr-8 py-1"
          >
            <FolderPlusIcon className="h-5 w-5" aria-hidden="true" />
            <span>New Folder</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsContextMenuOpen(false);
            }}
            className="flex items-center gap-x-2 hover:bg-gray-500 rounded-md w-full pl-2 pr-8 py-1"
          >
            <span>Close</span>
          </button>
        </div>
      )}

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
                <li>
                  {Boolean(inlineOpenFor) && (
                    <CreateDirectoryInline
                      isFile={inlineOpenFor === "file"}
                      className="ml-0 mb-2"
                      handleClose={() => {
                        setIsContextMenuOpen(false);
                        setInlineOpenFor(null);
                      }}
                    />
                  )}
                </li>
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
