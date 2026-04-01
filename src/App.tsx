import { useState } from "react";
import { clsx } from "clsx";
import { RequestPage } from "./pages/RequestPage";
import { AdminPage } from "./pages/AdminPage";
import { ShowcasePage } from "./pages/ShowcasePage";
import { getRequestsByStatus } from "./store/changeRequests";

type Page = "showcase" | "request" | "admin";

const navItems: { id: Page; label: string }[] = [
  { id: "showcase", label: "Showcase" },
  { id: "request", label: "Request Change" },
  { id: "admin", label: "Admin" },
];

export function App() {
  const [page, setPage] = useState<Page>("showcase");
  const [pendingCount, setPendingCount] = useState(
    () => getRequestsByStatus("pending").length
  );

  const refreshPending = () =>
    setPendingCount(getRequestsByStatus("pending").length);

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f7]">
      {/* Apple-style top bar */}
      <header className="h-12 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 flex items-center px-5 shrink-0 z-10">
        <div className="flex items-center gap-2.5 mr-8">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-b from-[#007AFF] to-[#0056CC] flex items-center justify-center text-white text-xs font-bold shadow-sm">
            U
          </div>
          <span className="text-[15px] font-semibold text-gray-900">UIKit</span>
        </div>

        <nav className="flex items-center gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setPage(item.id); refreshPending(); }}
              className={clsx(
                "relative px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer",
                page === item.id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
            >
              {item.label}
              {item.id === "admin" && pendingCount > 0 && (
                <span className="ml-1.5 bg-[#FF3B30] text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] inline-flex items-center justify-center px-1">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {page === "showcase" && <ShowcasePage />}
        {page === "request" && <RequestPage onSubmitted={refreshPending} />}
        {page === "admin" && <AdminPage />}
      </div>
    </div>
  );
}
