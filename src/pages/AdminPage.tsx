import { useState } from "react";
import { clsx } from "clsx";
import { componentConfigs } from "../showcase/componentConfigs";
import {
  getAllRequests,
  approveRequest,
  rejectRequest,
  deleteRequest,
  type ChangeRequest,
  type RequestStatus,
} from "../store/changeRequests";

function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={clsx(
      "px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize",
      status === "pending" && "bg-[#FF9500]/10 text-[#FF9500]",
      status === "approved" && "bg-[#34C759]/10 text-[#34C759]",
      status === "rejected" && "bg-[#FF3B30]/10 text-[#FF3B30]"
    )}>
      {status}
    </span>
  );
}

function PropertyDiff({ componentName, properties }: { componentName: string; properties: Record<string, unknown> }) {
  const config = componentConfigs.find((c) => c.name === componentName);
  if (!config) return null;
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12px]">
      {config.properties.map((prop) => {
        const val = properties[prop.key];
        const defaultVal = config.defaults[prop.key];
        const changed = JSON.stringify(val) !== JSON.stringify(defaultVal);
        return (
          <div key={prop.key} className="contents">
            <span className="text-gray-400">{prop.label}</span>
            <span className={clsx("font-mono", changed ? "text-[#007AFF] font-semibold" : "text-gray-300")}>
              {String(val)}{changed && " *"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function RequestPreview({ request }: { request: ChangeRequest }) {
  const config = componentConfigs.find((c) => c.name === request.componentName);
  if (!config) return null;
  const extra = { openModal: () => {}, closeModal: () => {}, modalOpen: false };
  return (
    <div className="component-preview-bg rounded-xl p-6 flex items-center justify-center min-h-[80px]">
      {config.render(request.properties, extra)}
    </div>
  );
}

function RequestCard({ request, onAction }: { request: ChangeRequest; onAction: () => void }) {
  const [comment, setComment] = useState("");
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-b from-[#007AFF] to-[#0056CC] text-white flex items-center justify-center text-[13px] font-bold shadow-sm">
            {request.componentName[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-semibold text-gray-900">{request.componentName}</h3>
              <StatusBadge status={request.status} />
            </div>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {request.authorName} &middot; {new Date(request.createdAt).toLocaleDateString("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
        <button type="button" onClick={() => { deleteRequest(request.id); onAction(); }} className="text-gray-300 hover:text-[#FF3B30] transition-colors cursor-pointer p-1" title="Delete">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

      {/* Description */}
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-[13px] text-gray-600 leading-relaxed">{request.description}</p>
      </div>

      {/* Preview */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Preview</p>
        <RequestPreview request={request} />
      </div>

      {/* Properties */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Properties</p>
        <PropertyDiff componentName={request.componentName} properties={request.properties} />
      </div>

      {/* Review comment */}
      {request.reviewComment && (
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-[12px] text-gray-500"><span className="font-semibold text-gray-600">Review:</span> {request.reviewComment}</p>
        </div>
      )}

      {/* Actions */}
      {request.status === "pending" && (
        <div className="px-5 py-4">
          {!showActions ? (
            <button type="button" onClick={() => setShowActions(true)} className="text-[13px] text-[#007AFF] font-semibold hover:text-[#0056CC] cursor-pointer">
              Review this request
            </button>
          ) : (
            <div className="space-y-3">
              <textarea
                placeholder="Comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-[#f5f5f7] border border-gray-200 rounded-lg text-[13px] text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF]"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => { approveRequest(request.id, comment || undefined); onAction(); }} className="px-4 py-2 bg-[#34C759] text-white rounded-lg text-[13px] font-semibold hover:bg-[#2DB84D] transition-colors cursor-pointer shadow-sm">
                  Approve
                </button>
                <button type="button" onClick={() => { rejectRequest(request.id, comment || undefined); onAction(); }} className="px-4 py-2 bg-[#FF3B30] text-white rounded-lg text-[13px] font-semibold hover:bg-[#E0342B] transition-colors cursor-pointer shadow-sm">
                  Reject
                </button>
                <button type="button" onClick={() => setShowActions(false)} className="px-4 py-2 text-[13px] text-gray-500 hover:text-gray-700 cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AdminPage() {
  const [requests, setRequests] = useState(getAllRequests);
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");
  const refresh = () => setRequests(getAllRequests());
  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);
  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="flex-1 overflow-auto bg-[#f5f5f7]">
      <div className="max-w-3xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Change Requests</h1>
          <p className="text-[15px] text-gray-500 mt-1">Review and approve component changes.</p>
        </div>

        {/* Filter tabs — Apple segmented control style */}
        <div className="flex gap-0.5 mb-8 bg-gray-200/80 rounded-lg p-0.5 w-fit">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={clsx(
                "px-3.5 py-1.5 text-[12px] font-medium rounded-md transition-all cursor-pointer capitalize",
                filter === f
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {f}
              {counts[f] > 0 && <span className="ml-1 text-gray-400">{counts[f]}</span>}
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-300 text-4xl mb-3">{filter === "pending" ? "✓" : "—"}</p>
            <p className="text-gray-400 text-[14px]">{filter === "pending" ? "All caught up." : "No requests."}</p>
          </div>
        ) : (
          <div className="space-y-4">{filtered.map((r) => <RequestCard key={r.id} request={r} onAction={refresh} />)}</div>
        )}
      </div>
    </div>
  );
}
