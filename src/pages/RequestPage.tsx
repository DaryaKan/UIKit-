import { useState, useCallback } from "react";
import { clsx } from "clsx";
import { PropertyPanel } from "../showcase/PropertyPanel";
import { componentConfigs } from "../showcase/componentConfigs";
import { createRequest } from "../store/changeRequests";

interface RequestPageProps {
  onSubmitted: () => void;
}

export function RequestPage({ onSubmitted }: RequestPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allValues, setAllValues] = useState<Record<string, Record<string, unknown>>>(() => {
    const initial: Record<string, Record<string, unknown>> = {};
    componentConfigs.forEach((cfg) => { initial[cfg.name] = { ...cfg.defaults }; });
    return initial;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const config = componentConfigs[activeIndex];
  const values = allValues[config.name];

  const handleChange = useCallback(
    (key: string, value: unknown) => {
      setAllValues((prev) => ({ ...prev, [config.name]: { ...prev[config.name], [key]: value } }));
    },
    [config.name]
  );

  const extra = { openModal: () => setModalOpen(true), closeModal: () => setModalOpen(false), modalOpen };

  const handleSubmit = () => {
    if (!description.trim() || !authorName.trim()) return;
    createRequest({ componentName: config.name, properties: { ...values }, description: description.trim(), authorName: authorName.trim() });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowSubmitForm(false); setDescription(""); onSubmitted(); }, 1500);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left sidebar */}
      <aside className="w-56 bg-white/60 backdrop-blur-xl border-r border-gray-200/60 flex flex-col shrink-0">
        <div className="px-4 pt-4 pb-2">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Components</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {componentConfigs.map((cfg, i) => (
            <button
              key={cfg.name}
              type="button"
              onClick={() => { setActiveIndex(i); setModalOpen(false); setShowSubmitForm(false); }}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-150 cursor-pointer flex items-center gap-2.5 mb-0.5",
                activeIndex === i
                  ? "bg-[#007AFF] text-white font-medium shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {cfg.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Center — preview */}
      <main className="flex-1 flex flex-col items-center justify-center overflow-auto p-10 bg-[#f5f5f7]">
        <div className="flex flex-col items-center gap-6 w-full max-w-lg">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">{config.name}</h2>
            <p className="text-[13px] text-gray-400 mt-1">Adjust properties, then submit for review.</p>
          </div>

          {/* Gradient preview area */}
          <div className="component-preview-bg rounded-2xl p-10 min-w-[340px] min-h-[180px] flex items-center justify-center w-full shadow-lg">
            {config.render(values, extra)}
          </div>

          {/* Submit */}
          {!showSubmitForm ? (
            <button
              type="button"
              onClick={() => setShowSubmitForm(true)}
              className="px-5 py-2.5 bg-[#007AFF] text-white rounded-xl text-[13px] font-semibold hover:bg-[#0066DD] active:bg-[#0056CC] transition-colors cursor-pointer shadow-sm"
            >
              Send for Approval
            </button>
          ) : submitted ? (
            <div className="bg-[#34C759]/10 border border-[#34C759]/20 rounded-2xl p-5 text-center w-full">
              <p className="text-[#2D9F46] font-semibold text-[15px]">Request submitted</p>
              <p className="text-[#34C759]/70 text-[13px] mt-1">Awaiting admin review.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 w-full space-y-3 shadow-sm">
              <h3 className="text-[13px] font-semibold text-gray-900">Describe your change</h3>
              <input
                type="text"
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-[#f5f5f7] border border-gray-200 rounded-lg text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF]"
              />
              <textarea
                placeholder="What did you change and why?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-[#f5f5f7] border border-gray-200 rounded-lg text-[13px] text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF]"
              />
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowSubmitForm(false)} className="px-4 py-2 text-[13px] text-gray-500 hover:text-gray-700 cursor-pointer">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!description.trim() || !authorName.trim()}
                  className="px-4 py-2 bg-[#007AFF] text-white rounded-lg text-[13px] font-semibold hover:bg-[#0066DD] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right panel — properties */}
      <aside className="w-64 bg-white/60 backdrop-blur-xl border-l border-gray-200/60 shrink-0 overflow-hidden">
        <PropertyPanel componentName={config.name} properties={config.properties} values={values} onChange={handleChange} />
      </aside>
    </div>
  );
}
