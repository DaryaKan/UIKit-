import React from "react";
import { clsx } from "clsx";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-white/25 text-white/80 border-white/30",
  primary: "bg-white/30 text-white border-white/40",
  success: "bg-emerald-400/25 text-emerald-100 border-emerald-300/30",
  warning: "bg-amber-400/25 text-amber-100 border-amber-300/30",
  danger: "bg-red-400/25 text-red-100 border-red-300/30",
  info: "bg-sky-400/25 text-sky-100 border-sky-300/30",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-base",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  rounded = false,
  removable = false,
  onRemove,
  className,
}) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 font-medium backdrop-blur-md border shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        rounded ? "rounded-full" : "rounded-lg",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 inline-flex items-center justify-center rounded-full hover:bg-white/20 transition-colors h-4 w-4 cursor-pointer"
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

Badge.displayName = "Badge";
