import React from "react";
import { clsx } from "clsx";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: InputSize;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

const sizeClasses: Record<InputSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-4 py-3.5 text-lg",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, inputSize = "md", leftAddon, rightAddon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-white/90 drop-shadow-sm">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && <div className="absolute left-3 text-white/50">{leftAddon}</div>}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              "w-full rounded-xl bg-white/20 backdrop-blur-xl border text-white placeholder-white/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
              error
                ? "border-red-300/60 focus:ring-red-300/40"
                : "border-white/30 focus:border-white/50",
              sizeClasses[inputSize],
              leftAddon && "pl-10",
              rightAddon && "pr-10",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          {rightAddon && <div className="absolute right-3 text-white/50">{rightAddon}</div>}
        </div>
        {error && <p className="text-sm text-red-200 drop-shadow-sm">{error}</p>}
        {hint && !error && <p className="text-sm text-white/50">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
