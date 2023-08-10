// next
import { useRouter } from "next/router";

// swr
import useSWR from "swr";

// services
import { getBrowserIFrameCode } from "@/services";

export const BrowserOutputIFrame: React.FC = () => {
  const router = useRouter();
  const { projectSlug } = router.query;

  const { data } = useSWR(
    projectSlug ? `/api/browser-iframe/${projectSlug}` : null,
    projectSlug ? () => getBrowserIFrameCode(projectSlug.toString()) : null
  );

  if (!data)
    return (
      <div className="w-full h-screen flex items-center justify-center text-2xl font-bold text-gray-500">
        Setting up your project...
      </div>
    );

  return (
    <>
      <iframe
        srcDoc={data?.code}
        title="Testing"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        className="w-full h-screen overflow-auto border-none"
      />
    </>
  );
};
