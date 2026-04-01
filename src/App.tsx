import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { RequestPage } from "./pages/RequestPage";
import { AdminPage } from "./pages/AdminPage";
import { ShowcasePage } from "./pages/ShowcasePage";
import { getRequestsByStatus } from "./store/changeRequests";

type Page = "showcase" | "request" | "admin";

export function App() {
  const [page, setPage] = useState<Page>("showcase");
  const [pendingCount, setPendingCount] = useState(
    () => getRequestsByStatus("pending").length
  );

  const refreshPending = () =>
    setPendingCount(getRequestsByStatus("pending").length);

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        brand={
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
              U
            </div>
            <span className="text-sm font-semibold text-white">UIKit</span>
          </div>
        }
        items={[
          { id: "showcase", label: "Showcase" },
          { id: "request", label: "Request Change" },
          { id: "admin", label: "Admin", badge: pendingCount || undefined },
        ]}
        activeItem={page}
        onItemClick={(id) => {
          setPage(id as Page);
          refreshPending();
        }}
        className="shrink-0 z-10"
      />

      <div className="flex flex-1 overflow-hidden">
        {page === "showcase" && <ShowcasePage />}
        {page === "request" && <RequestPage onSubmitted={refreshPending} />}
        {page === "admin" && <AdminPage />}
      </div>
    </div>
  );
}
