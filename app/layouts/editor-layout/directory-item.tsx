import { useState } from "react";

// next
import Image from "next/image";

// headless ui
import { Disclosure } from "@headlessui/react";

// icons
import {
  DocumentPlusIcon,
  FolderPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

// services
import { deleteDirectory } from "@/services";

// helpers
import { classNames, getLanguageLogo } from "@/helpers/string.helper";

// hooks
import useProjectDetailContext from "@/hooks/use-project-detail";

// components
import { CreateDirectoryInline } from "./create-directory-inline";

// types
import type { Directory } from "@/types";

export const DirectoryItem: React.FC<{ directory: Directory }> = ({
  directory,
}) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isNewFileInlineOpen, setIsNewFileInlineOpen] = useState(false);
  const [isNewFolderInlineOpen, setIsNewFolderInlineOpen] = useState(false);

  const {
    currentOpenDirectory,
    setCurrentOpenDirectory,
    directories,
    mutateDirectories,
  } = useProjectDetailContext();

  const children =
    directories?.filter((dir) => dir.parent === directory.id) || [];

  const onDelete = async () => {
    await deleteDirectory(directory.id).then(() => {
      mutateDirectories((prev) =>
        prev?.filter((dir) => dir.id !== directory.id)
      );
    });
  };

  return (
    <li className="relative">
      {directory.file_type === "file" ? (
        <button
          type="button"
          onClick={() => setCurrentOpenDirectory(directory.id)}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsContextMenuOpen(true);
          }}
          className={classNames(
            currentOpenDirectory === directory.id
              ? "bg-gray-600"
              : "hover:bg-gray-700",
            "rounded-md py-2 pl-4 text-sm leading-6 font-semibold text-gray-300 w-full flex items-center text-left truncate"
          )}
        >
          <Image
            src={getLanguageLogo(directory.name)!}
            alt={directory.name}
            width={18}
            height={18}
            className="mr-2"
          />

          {directory.name}
        </button>
      ) : (
        <Disclosure as="div">
          {({ open }) => (
            <>
              <Disclosure.Button
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsContextMenuOpen(true);
                }}
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

      {(isNewFileInlineOpen || isNewFolderInlineOpen) && (
        <CreateDirectoryInline
          directory={directory}
          isFile={isNewFileInlineOpen}
          handleClose={() => {
            setIsNewFileInlineOpen(false);
            setIsNewFolderInlineOpen(false);
            setIsContextMenuOpen(false);
          }}
        />
      )}

      {isContextMenuOpen && (
        <div className="absolute top-0 -right-0 bg-gray-400 text-gray-300 space-y-2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 py-2 px-a4 border z-50">
          {directory.file_type === "directory" && (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsContextMenuOpen(false);
                  setIsNewFileInlineOpen(true);
                }}
                className="flex items-center gap-x-2 hover:bg-gray-500 rounded-md w-full pl-2 pr-8 py-1"
              >
                <DocumentPlusIcon className="h-5 w-5" aria-hidden="true" />
                <span>New File</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsContextMenuOpen(false);
                  setIsNewFolderInlineOpen(true);
                }}
                className="flex items-center gap-x-2 hover:bg-gray-500 rounded-md w-full pl-2 pr-8 py-1"
              >
                <FolderPlusIcon className="h-5 w-5" aria-hidden="true" />
                <span>New Folder</span>
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => {
              setIsContextMenuOpen(false);
              onDelete();
            }}
            className="flex items-center gap-x-2 hover:bg-gray-500 rounded-md w-full pl-2 pr-8 py-1"
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
            <span>Delete</span>
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
    </li>
  );
};
