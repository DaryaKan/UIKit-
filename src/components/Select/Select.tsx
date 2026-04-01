import React from "react";
import { clsx } from "clsx";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  selectSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-4 py-3.5 text-lg",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, selectSize = "md", className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-white/90 drop-shadow-sm">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              "w-full appearance-none rounded-xl bg-white/20 backdrop-blur-xl border pr-10 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
              error ? "border-red-300/60 focus:ring-red-300/40" : "border-white/30 focus:border-white/50",
              sizeClasses[selectSize],
              "disabled:opacity-40 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled} className="text-gray-900 bg-white">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-4 w-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="text-sm text-red-200 drop-shadow-sm">{error}</p>}
        {hint && !error && <p className="text-sm text-white/50">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
