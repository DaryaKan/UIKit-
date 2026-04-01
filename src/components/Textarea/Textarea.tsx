import React from "react";
import { clsx } from "clsx";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-white/90 drop-shadow-sm">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            "w-full rounded-xl bg-white/20 backdrop-blur-xl border px-4 py-2.5 text-base text-white placeholder-white/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 resize-y min-h-[80px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
            error ? "border-red-300/60 focus:ring-red-300/40" : "border-white/30 focus:border-white/50",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-200 drop-shadow-sm">{error}</p>}
        {hint && !error && <p className="text-sm text-white/50">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
