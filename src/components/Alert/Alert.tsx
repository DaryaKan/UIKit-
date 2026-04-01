import React from "react";
import { clsx } from "clsx";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantClasses: Record<AlertVariant, string> = {
  info: "bg-sky-400/15 border-sky-300/30 text-sky-100",
  success: "bg-emerald-400/15 border-emerald-300/30 text-emerald-100",
  warning: "bg-amber-400/15 border-amber-300/30 text-amber-100",
  error: "bg-red-400/15 border-red-300/30 text-red-100",
};

const iconPaths: Record<AlertVariant, string> = {
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
  error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
};

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}) => {
  return (
    <div
      role="alert"
      className={clsx(
        "flex items-start gap-3 rounded-2xl border backdrop-blur-xl p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
        variantClasses[variant],
        className
      )}
    >
      <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[variant]} />
      </svg>
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm opacity-80">{children}</div>
      </div>
      {dismissible && (
        <button type="button" onClick={onDismiss} className="shrink-0 rounded-lg p-1 hover:bg-white/15 transition-colors cursor-pointer">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

Alert.displayName = "Alert";
