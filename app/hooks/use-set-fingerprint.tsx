import { useEffect } from "react";

import Cookies from "js-cookie";

import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function useSetFingerprint() {
  useEffect(() => {
    const setFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      Cookies.set("finger_print", result.visitorId, { expires: 365 });
    };

    setFingerprint();
  }, []);
}
