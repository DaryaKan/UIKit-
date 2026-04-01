import React from "react";
import { clsx } from "clsx";

export interface TabBarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface TabBarProps {
  items: TabBarItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  className?: string;
}

export const TabBar: React.FC<TabBarProps> = ({
  items,
  activeItem,
  onItemClick,
  className,
}) => {
  return (
    <nav
      className={clsx(
        "w-[390px] flex items-center justify-around px-2 py-2 bg-white/15 backdrop-blur-2xl border-t border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_-4px_24px_-4px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {items.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick?.(item.id)}
            className={clsx(
              "relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200 cursor-pointer min-w-[64px]",
              isActive
                ? "bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                : "hover:bg-white/10"
            )}
          >
            <span
              className={clsx(
                "text-xl transition-colors",
                isActive ? "text-white" : "text-white/50"
              )}
            >
              {item.icon}
            </span>
            <span
              className={clsx(
                "text-[10px] font-medium transition-colors",
                isActive ? "text-white" : "text-white/50"
              )}
            >
              {item.label}
            </span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute -top-0.5 right-2 bg-red-400/60 backdrop-blur-sm text-white text-[9px] font-bold rounded-full h-3.5 min-w-[14px] flex items-center justify-center px-1">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

TabBar.displayName = "TabBar";
