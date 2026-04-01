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
      <aside className="w-52 bg-white/10 backdrop-blur-xl border-r border-white/15 flex flex-col shrink-0">
        <div className="px-3 pt-3 pb-2">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Components</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {componentConfigs.map((cfg, i) => (
            <button
              key={cfg.name}
              type="button"
              onClick={() => { setActiveIndex(i); setModalOpen(false); setShowSubmitForm(false); }}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 cursor-pointer flex items-center gap-2.5 mb-0.5",
                activeIndex === i
                  ? "bg-white/20 text-white font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                  : "text-white/60 hover:bg-white/10 hover:text-white/80"
              )}
            >
              <span className="text-base w-5 text-center shrink-0 opacity-60">{cfg.icon}</span>
              {cfg.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Center */}
      <main className="flex-1 flex flex-col items-center justify-center overflow-auto p-8">
        <div className="flex flex-col items-center gap-6 w-full max-w-lg">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white drop-shadow-md">{config.name}</h2>
            <p className="text-xs text-white/50 mt-0.5">Configure the component, then send for approval</p>
          </div>

          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/20 p-10 min-w-[320px] min-h-[160px] flex items-center justify-center w-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_32px_-8px_rgba(0,0,0,0.15)]">
            {config.render(values, extra)}
          </div>

          {!showSubmitForm ? (
            <button
              type="button"
              onClick={() => setShowSubmitForm(true)}
              className="px-6 py-2.5 bg-white/25 backdrop-blur-xl text-white rounded-2xl font-medium border border-white/30 hover:bg-white/35 transition-all cursor-pointer text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
            >
              Send for Approval
            </button>
          ) : submitted ? (
            <div className="bg-emerald-400/15 backdrop-blur-xl border border-emerald-300/30 rounded-2xl p-4 text-center w-full">
              <p className="text-emerald-100 font-medium">Request sent!</p>
              <p className="text-emerald-200/60 text-sm mt-1">Waiting for admin approval.</p>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 w-full space-y-4">
              <h3 className="text-sm font-semibold text-white/80">Describe your change</h3>
              <input
                type="text"
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <textarea
                placeholder="What did you change and why?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowSubmitForm(false)} className="px-4 py-2 text-sm text-white/50 hover:text-white cursor-pointer">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!description.trim() || !authorName.trim()}
                  className="px-4 py-2 bg-white/25 backdrop-blur-sm text-white rounded-xl text-sm font-medium border border-white/30 hover:bg-white/35 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right panel */}
      <aside className="w-64 bg-white/10 backdrop-blur-xl border-l border-white/15 shrink-0 overflow-hidden">
        <PropertyPanel componentName={config.name} properties={config.properties} values={values} onChange={handleChange} />
      </aside>
    </div>
  );
}
