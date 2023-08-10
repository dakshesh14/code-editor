// next
import type { NextPage } from "next";
import dynamic from "next/dynamic";

// components
const BrowserOutputIFrame = dynamic(
  () => import("@/components/project").then((mod) => mod.BrowserOutputIFrame),
  {
    ssr: false,
  }
);

const BrowserOutput: NextPage = () => {
  return <BrowserOutputIFrame />;
};

export default BrowserOutput;
