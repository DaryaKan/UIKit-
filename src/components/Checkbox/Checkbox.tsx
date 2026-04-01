import React from "react";
import { clsx } from "clsx";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <label
        htmlFor={checkboxId}
        className={clsx(
          "inline-flex items-start gap-3 cursor-pointer group",
          props.disabled && "cursor-not-allowed opacity-40"
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={clsx(
            "mt-0.5 h-5 w-5 rounded border-white/40 bg-white/20 text-white/80 transition-colors focus:ring-2 focus:ring-white/40 focus:ring-offset-0 cursor-pointer disabled:cursor-not-allowed accent-white/70",
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col">
            {label && <span className="text-sm font-medium text-white/90 group-hover:text-white">{label}</span>}
            {description && <span className="text-sm text-white/50">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
