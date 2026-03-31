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

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = "underline",
  onChange,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={className}>
      <div
        className={clsx(
          "flex",
          variant === "underline" && "border-b border-gray-200 gap-0",
          variant === "pills" && "gap-2",
          variant === "bordered" &&
            "border border-gray-200 rounded-lg p-1 gap-1 bg-gray-50"
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
              "px-4 py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap",
              variant === "underline" && [
                "border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              ],
              variant === "pills" && [
                "rounded-lg",
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
              ],
              variant === "bordered" && [
                "rounded-md flex-1",
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
              ]
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4" role="tabpanel">
        {activeContent}
      </div>
    </div>
  );
};

Tabs.displayName = "Tabs";
