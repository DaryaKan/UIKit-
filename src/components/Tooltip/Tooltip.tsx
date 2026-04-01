import React, { useState, useRef } from "react";
import { clsx } from "clsx";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = "top", delay = 200 }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => { timeoutRef.current = setTimeout(() => setVisible(true), delay); };
  const hide = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setVisible(false); };

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div
          className={clsx(
            "absolute z-50 whitespace-nowrap rounded-xl bg-white/25 backdrop-blur-2xl border border-white/30 px-3 py-1.5 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_16px_-4px_rgba(0,0,0,0.2)] pointer-events-none",
            positionClasses[position]
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = "Tooltip";
