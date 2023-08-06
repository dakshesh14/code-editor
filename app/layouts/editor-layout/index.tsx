// layouts
import { Sidebar } from "./sidebar";
import { Explorer } from "./explorer";

type Props = {
  children: React.ReactNode;
};

const EditorLayout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      <Sidebar />
      <Explorer />

      <div className="lg:pl-72 h-screen">
        <main className="h-full">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </>
  );
};

export default EditorLayout;
