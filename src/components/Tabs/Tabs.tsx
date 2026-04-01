import React, { useState } from "react";
import { clsx } from "clsx";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: "underline" | "pills" | "bordered";
  onChange?: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, variant = "underline", onChange, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const handleTabClick = (tabId: string) => { setActiveTab(tabId); onChange?.(tabId); };
  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={className}>
      <div
        className={clsx(
          "flex",
          variant === "underline" && "border-b border-white/20 gap-0",
          variant === "pills" && "gap-2",
          variant === "bordered" && "border border-white/20 rounded-2xl p-1 gap-1 bg-white/10 backdrop-blur-md"
        )}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.id}
            disabled={tab.disabled}
            onClick={() => handleTabClick(tab.id)}
            className={clsx(
              "px-4 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap",
              variant === "underline" && [
                "border-b-2 -mb-px",
                activeTab === tab.id ? "border-white text-white" : "border-transparent text-white/50 hover:text-white/70 hover:border-white/30",
              ],
              variant === "pills" && [
                "rounded-xl",
                activeTab === tab.id
                  ? "bg-white/30 text-white backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                  : "text-white/50 hover:bg-white/10 hover:text-white/70",
              ],
              variant === "bordered" && [
                "rounded-xl flex-1",
                activeTab === tab.id
                  ? "bg-white/25 text-white shadow-sm backdrop-blur-sm"
                  : "text-white/50 hover:text-white/70",
              ]
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 text-white/80" role="tabpanel">{activeContent}</div>
    </div>
  );
};

Tabs.displayName = "Tabs";
