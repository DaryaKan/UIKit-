import React from "react";
import { clsx } from "clsx";

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { track: "w-8 h-4", thumb: "h-3 w-3", translate: "translate-x-4" },
  md: { track: "w-11 h-6", thumb: "h-5 w-5", translate: "translate-x-5" },
  lg: { track: "w-14 h-7", thumb: "h-6 w-6", translate: "translate-x-7" },
};

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
}) => {
  const config = sizeConfig[size];

  return (
    <label
      className={clsx(
        "inline-flex items-center gap-3",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
    >
      <button
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={clsx(
          "relative inline-flex shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          config.track,
          checked ? "bg-blue-600" : "bg-gray-200",
          !disabled && "cursor-pointer"
        )}
      >
        <span
          className={clsx(
            "pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
            config.thumb,
            checked ? config.translate : "translate-x-0"
          )}
        />
      </button>
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
    </label>
  );
};

Toggle.displayName = "Toggle";
