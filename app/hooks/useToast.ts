// Custom hook for toast notifications

import { useState, useCallback } from "react";

export function useToast() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "error">("info");

  const showToast = useCallback(
    (text: string, kind: "info" | "error" = "info") => {
      setMessage(text);
      setType(kind);
      if (kind !== "error") {
        setTimeout(() => setMessage(""), 2200);
      }
    },
    []
  );

  const clearToast = useCallback(() => {
    setMessage("");
  }, []);

  return { message, type, showToast, clearToast };
}
