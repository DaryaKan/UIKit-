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
    <span
      className={clsx(
        "px-2 py-0.5 text-[11px] font-semibold rounded-full",
        status === "pending" && "bg-amber-100 text-amber-700",
        status === "approved" && "bg-green-100 text-green-700",
        status === "rejected" && "bg-red-100 text-red-700"
      )}
    >
      {status}
    </span>
  );
}

function PropertyDiff({
  componentName,
  properties,
}: {
  componentName: string;
  properties: Record<string, unknown>;
}) {
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
            <span className="text-gray-500 font-medium">{prop.label}</span>
            <span
              className={clsx(
                "font-mono",
                changed ? "text-blue-700 font-semibold" : "text-gray-400"
              )}
            >
              {String(val)}
              {changed && " *"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function RequestPreview({ request }: { request: ChangeRequest }) {
  const config = componentConfigs.find(
    (c) => c.name === request.componentName
  );
  if (!config) return null;

  const extra = {
    openModal: () => {},
    closeModal: () => {},
    modalOpen: false,
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-100 p-6 flex items-center justify-center min-h-[80px]">
      {config.render(request.properties, extra)}
    </div>
  );
}

function RequestCard({
  request,
  onAction,
}: {
  request: ChangeRequest;
  onAction: () => void;
}) {
  const [comment, setComment] = useState("");
  const [showActions, setShowActions] = useState(false);

  const handleApprove = () => {
    approveRequest(request.id, comment || undefined);
    onAction();
  };

  const handleReject = () => {
    rejectRequest(request.id, comment || undefined);
    onAction();
  };

  const handleDelete = () => {
    deleteRequest(request.id);
    onAction();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
            {request.componentName[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900">
                {request.componentName}
              </h3>
              <StatusBadge status={request.status} />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              by {request.authorName} &middot;{" "}
              {new Date(request.createdAt).toLocaleDateString("en", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer p-1"
          title="Delete request"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Description */}
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-sm text-gray-700">{request.description}</p>
      </div>

      {/* Preview */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
          Preview
        </p>
        <RequestPreview request={request} />
      </div>

      {/* Properties diff */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
          Properties
        </p>
        <PropertyDiff
          componentName={request.componentName}
          properties={request.properties}
        />
      </div>

      {/* Review comment if reviewed */}
      {request.reviewComment && (
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            <span className="font-semibold">Review comment:</span>{" "}
            {request.reviewComment}
          </p>
        </div>
      )}

      {/* Actions for pending */}
      {request.status === "pending" && (
        <div className="px-5 py-4">
          {!showActions ? (
            <button
              type="button"
              onClick={() => setShowActions(true)}
              className="text-sm text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
            >
              Review this request
            </button>
          ) : (
            <div className="space-y-3">
              <textarea
                placeholder="Comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => setShowActions(false)}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                >
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

  const filtered =
    filter === "all" ? requests : requests.filter((r) => r.status === filter);

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
          <h1 className="text-2xl font-bold text-gray-900">Change Requests</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and approve component change requests
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={clsx(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer capitalize",
                filter === f
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {f}
              <span className="ml-1.5 text-gray-400">{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Request list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3 opacity-30">
              {filter === "pending" ? "🎉" : "📭"}
            </div>
            <p className="text-gray-400 text-sm">
              {filter === "pending"
                ? "No pending requests — all caught up!"
                : "No requests yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => (
              <RequestCard key={r.id} request={r} onAction={refresh} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
