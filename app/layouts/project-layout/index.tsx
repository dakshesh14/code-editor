import { useState } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/router";

// swr
import { mutate } from "swr";

// icons
import { Bars3Icon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

// layouts
import { Sidebar } from "./sidebar";

// hooks
import useToast from "@/hooks/use-toast";
import useProjectContext from "@/hooks/use-project-context";

// components
import { CreateProjectModal } from "@/components/project";

type Props = {
  children: React.ReactNode;
};

const ProjectLayout: React.FC<Props> = (props) => {
  const { children } = props;

  const router = useRouter();
  const { addToast } = useToast();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { search, setSearch } = useProjectContext();

  return (
    <>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="lg:pl-72">
          <div className="sticky top-0 z-5 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block w-full h-full pl-8 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-1a00 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />
                <div>
                  <Link as={`/projects/new`} href="#">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      New Project
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>

      <CreateProjectModal
        isOpen={
          router.asPath === "/projects/new" &&
          router.pathname !== "/projects/new"
            ? true
            : false
        }
        onClose={() => router.push("/projects")}
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
    </>
  );
};

export default ProjectLayout;
