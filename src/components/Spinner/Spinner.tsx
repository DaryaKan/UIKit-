import React from "react";
import { clsx } from "clsx";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-blue-600",
  className,
  label,
}) => {
  return (
    <div className={clsx("inline-flex flex-col items-center gap-2", className)} role="status">
      <svg
        className={clsx("animate-spin", sizeClasses[size], color)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
  );
};

Spinner.displayName = "Spinner";
