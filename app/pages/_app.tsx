import "@/styles/globals.css";
import type { AppProps } from "next/app";

// hooks
import useSetFingerprint from "@/hooks/use-set-fingerprint";

// context
import { ToastProvider } from "@/context/toast.context";

export default function App({ Component, pageProps }: AppProps) {
  useSetFingerprint();

  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}
