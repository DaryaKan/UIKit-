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
    componentConfigs.forEach((cfg) => {
      initial[cfg.name] = { ...cfg.defaults };
    });
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
      setAllValues((prev) => ({
        ...prev,
        [config.name]: { ...prev[config.name], [key]: value },
      }));
    },
    [config.name]
  );

  const extra = {
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false),
    modalOpen,
  };

  const handleSubmit = () => {
    if (!description.trim() || !authorName.trim()) return;

    createRequest({
      componentName: config.name,
      properties: { ...values },
      description: description.trim(),
      authorName: authorName.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowSubmitForm(false);
      setDescription("");
      onSubmitted();
    }, 1500);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left sidebar — component list */}
      <aside className="w-52 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="px-3 pt-3 pb-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Components
          </p>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {componentConfigs.map((cfg, i) => (
            <button
              key={cfg.name}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                setModalOpen(false);
                setShowSubmitForm(false);
              }}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2.5 mb-0.5",
                activeIndex === i
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span className="text-base w-5 text-center shrink-0 opacity-60">
                {cfg.icon}
              </span>
              {cfg.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Center — preview + submit */}
      <main className="flex-1 flex flex-col items-center justify-center overflow-auto p-8">
        <div className="flex flex-col items-center gap-6 w-full max-w-lg">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {config.name}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Configure the component, then send for approval
            </p>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 min-w-[320px] min-h-[160px] flex items-center justify-center w-full">
            {config.render(values, extra)}
          </div>

          {/* Submit section */}
          {!showSubmitForm ? (
            <button
              type="button"
              onClick={() => setShowSubmitForm(true)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer text-sm"
            >
              Send for Approval
            </button>
          ) : submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center w-full">
              <p className="text-green-700 font-medium">Request sent!</p>
              <p className="text-green-600 text-sm mt-1">
                Waiting for admin approval.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 w-full space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Describe your change
              </h3>
              <input
                type="text"
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                placeholder="What did you change and why?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!description.trim() || !authorName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right panel — properties */}
      <aside className="w-64 bg-white border-l border-gray-200 shrink-0 overflow-hidden">
        <PropertyPanel
          componentName={config.name}
          properties={config.properties}
          values={values}
          onChange={handleChange}
        />
      </aside>
    </div>
  );
}
