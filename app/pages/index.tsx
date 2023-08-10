import Link from "next/link";

// components
import { Header } from "@/components/landing";

const Landing = () => {
  return (
    <div className="bg-slate-900">
      <Header />

      <div className="relative isolate pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Write & execute code in your browser
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                A project powered by Django, Next.js, Tailwind, docker and more.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/projects/new"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Create Project
                </Link>
                <Link
                  target="_blank"
                  href="https://www.dakshesh.me"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  About me <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="flex relative-md mt-16 sm:mt-24 w-full h-[40rem] bg-red-50 justify-center items-center p-5">
              <p>Please assume this is a photo of the final product :P</p>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
