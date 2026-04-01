import React from "react";
import { clsx } from "clsx";

export interface NavbarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

export interface NavbarProps {
  brand?: React.ReactNode;
  items?: NavbarItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  rightContent?: React.ReactNode;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  items = [],
  activeItem,
  onItemClick,
  rightContent,
  className,
}) => {
  return (
    <nav
      className={clsx(
        "h-14 flex items-center px-5 gap-6 bg-white/20 backdrop-blur-2xl border-b border-white/20 shadow-[inset_0_-1px_0_rgba(255,255,255,0.1),0_4px_24px_-4px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {brand && <div className="shrink-0 mr-2">{brand}</div>}

      <div className="flex items-center gap-1 flex-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick?.(item.id)}
            className={clsx(
              "relative px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2",
              activeItem === item.id
                ? "bg-white/25 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                : "text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            {item.icon && <span className="opacity-70">{item.icon}</span>}
            {item.label}
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-0.5 bg-red-400/60 backdrop-blur-sm text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center px-1">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {rightContent && <div className="shrink-0">{rightContent}</div>}
    </nav>
  );
};

Navbar.displayName = "Navbar";
