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
      "px-2 py-0.5 text-[11px] font-semibold rounded-full backdrop-blur-sm border",
      status === "pending" && "bg-amber-400/20 text-amber-200 border-amber-300/20",
      status === "approved" && "bg-emerald-400/20 text-emerald-200 border-emerald-300/20",
      status === "rejected" && "bg-red-400/20 text-red-200 border-red-300/20"
    )}>
      {status}
    </span>
  );
}

function PropertyDiff({ componentName, properties }: { componentName: string; properties: Record<string, unknown> }) {
  const config = componentConfigs.find((c) => c.name === componentName);
  if (!config) return null;
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
      {config.properties.map((prop) => {
        const val = properties[prop.key];
        const defaultVal = config.defaults[prop.key];
        const changed = JSON.stringify(val) !== JSON.stringify(defaultVal);
        return (
          <div key={prop.key} className="contents">
            <span className="text-white/40 font-medium">{prop.label}</span>
            <span className={clsx("font-mono", changed ? "text-sky-200 font-semibold" : "text-white/30")}>
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
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 flex items-center justify-center min-h-[80px]">
      {config.render(request.properties, extra)}
    </div>
  );
}

function RequestCard({ request, onAction }: { request: ChangeRequest; onAction: () => void }) {
  const [comment, setComment] = useState("");
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white/12 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-white/15 text-white flex items-center justify-center text-sm font-bold border border-white/20">
            {request.componentName[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">{request.componentName}</h3>
              <StatusBadge status={request.status} />
            </div>
            <p className="text-xs text-white/40 mt-0.5">
              by {request.authorName} &middot; {new Date(request.createdAt).toLocaleDateString("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
        <button type="button" onClick={() => { deleteRequest(request.id); onAction(); }} className="text-white/20 hover:text-red-300 transition-colors cursor-pointer p-1" title="Delete">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

      <div className="px-5 py-3 border-b border-white/10">
        <p className="text-sm text-white/70">{request.description}</p>
      </div>

      <div className="px-5 py-4 border-b border-white/10">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-3">Preview</p>
        <RequestPreview request={request} />
      </div>

      <div className="px-5 py-4 border-b border-white/10">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-3">Properties</p>
        <PropertyDiff componentName={request.componentName} properties={request.properties} />
      </div>

      {request.reviewComment && (
        <div className="px-5 py-3 border-b border-white/10 bg-white/5">
          <p className="text-xs text-white/40"><span className="font-semibold text-white/50">Review:</span> {request.reviewComment}</p>
        </div>
      )}

      {request.status === "pending" && (
        <div className="px-5 py-4">
          {!showActions ? (
            <button type="button" onClick={() => setShowActions(true)} className="text-sm text-sky-200 font-medium hover:text-sky-100 cursor-pointer">
              Review this request
            </button>
          ) : (
            <div className="space-y-3">
              <textarea
                placeholder="Comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => { approveRequest(request.id, comment || undefined); onAction(); }} className="px-4 py-2 bg-emerald-400/25 text-emerald-100 rounded-xl text-sm font-medium border border-emerald-300/30 hover:bg-emerald-400/35 transition-all cursor-pointer">
                  Approve
                </button>
                <button type="button" onClick={() => { rejectRequest(request.id, comment || undefined); onAction(); }} className="px-4 py-2 bg-red-400/25 text-red-100 rounded-xl text-sm font-medium border border-red-300/30 hover:bg-red-400/35 transition-all cursor-pointer">
                  Reject
                </button>
                <button type="button" onClick={() => setShowActions(false)} className="px-4 py-2 text-sm text-white/40 hover:text-white/60 cursor-pointer">
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
    <div className="flex-1 overflow-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">Change Requests</h1>
          <p className="text-sm text-white/50 mt-1">Review and approve component change requests</p>
        </div>

        <div className="flex gap-1 mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-1 w-fit border border-white/15">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={clsx(
                "px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer capitalize",
                filter === f
                  ? "bg-white/25 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                  : "text-white/40 hover:text-white/60"
              )}
            >
              {f}<span className="ml-1.5 text-white/30">{counts[f]}</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3 opacity-30">{filter === "pending" ? "✨" : "📭"}</div>
            <p className="text-white/40 text-sm">{filter === "pending" ? "No pending requests" : "No requests yet"}</p>
          </div>
        ) : (
          <div className="space-y-4">{filtered.map((r) => <RequestCard key={r.id} request={r} onAction={refresh} />)}</div>
        )}
      </div>
    </div>
  );
}
