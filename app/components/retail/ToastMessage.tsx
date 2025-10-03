// Toast message component

import React from "react";

interface ToastMessageProps {
  message: string;
  type: "info" | "error";
}

export function ToastMessage({ message, type }: ToastMessageProps) {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      className="card p-4 text-sm animate-in fade-in slide-in-from-top-2 duration-300"
      style={{
        borderColor: isError
          ? "rgba(239, 68, 68, 0.5)"
          : "rgba(139, 92, 246, 0.5)",
        background: isError
          ? "linear-gradient(135deg, rgba(127, 29, 29, 0.4), rgba(153, 27, 27, 0.6))"
          : "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
        boxShadow: isError
          ? "0 4px 6px -1px rgba(239, 68, 68, 0.2)"
          : "0 4px 6px -1px rgba(139, 92, 246, 0.2)",
      }}
    >
      <div className="flex items-center gap-3">
        {isError ? (
          <svg
            className="w-5 h-5 text-red-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-purple-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <div
          className={`flex-1 font-medium ${
            isError ? "text-red-200" : "text-purple-200"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
