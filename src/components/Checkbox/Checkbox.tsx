import React from "react";
import { clsx } from "clsx";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
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
          props.disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={clsx(
            "mt-0.5 h-5 w-5 rounded border-gray-300 text-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {label}
              </span>
            )}
            {description && (
              <span className="text-sm text-gray-500">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
