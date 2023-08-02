import { useState } from "react";

// icons
import { Bars3Icon } from "@heroicons/react/24/outline";

// layouts
import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const EditorLayout: React.FC<Props> = (props) => {
  const { children } = props;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="lg:pl-72 h-screen">
        <div className="sticky lg:hidden top-0 z-5 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="h-full">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </>
  );
};

export default EditorLayout;
