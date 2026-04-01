import { useState } from "react";
import { clsx } from "clsx";
import { RequestPage } from "./pages/RequestPage";
import { AdminPage } from "./pages/AdminPage";
import { ShowcasePage } from "./pages/ShowcasePage";
import { getRequestsByStatus } from "./store/changeRequests";

type Page = "showcase" | "request" | "admin";

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "showcase", label: "Showcase", icon: "◫" },
  { id: "request", label: "Request Change", icon: "✎" },
  { id: "admin", label: "Admin", icon: "⚙" },
];

export function App() {
  const [page, setPage] = useState<Page>("showcase");
  const [pendingCount, setPendingCount] = useState(
    () => getRequestsByStatus("pending").length
  );

  const refreshPending = () =>
    setPendingCount(getRequestsByStatus("pending").length);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top bar */}
      <header className="h-12 bg-white border-b border-gray-200 flex items-center px-4 shrink-0 z-10">
        <div className="flex items-center gap-2.5 mr-8">
          <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
          <span className="text-sm font-semibold text-gray-900">UIKit</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setPage(item.id);
                refreshPending();
              }}
              className={clsx(
                "px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer flex items-center gap-1.5",
                page === item.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <span className="opacity-60">{item.icon}</span>
              {item.label}
              {item.id === "admin" && pendingCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center px-1">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Page content */}
      <div className="flex flex-1 overflow-hidden">
        {page === "showcase" && <ShowcasePage />}
        {page === "request" && (
          <RequestPage onSubmitted={refreshPending} />
        )}
        {page === "admin" && <AdminPage />}
      </div>
    </div>
  );
}
