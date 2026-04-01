import { useState, useCallback } from "react";
import { clsx } from "clsx";
import { PropertyPanel } from "./showcase/PropertyPanel";
import { componentConfigs } from "./showcase/componentConfigs";

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allValues, setAllValues] = useState<Record<string, Record<string, unknown>>>(() => {
    const initial: Record<string, Record<string, unknown>> = {};
    componentConfigs.forEach((cfg) => {
      initial[cfg.name] = { ...cfg.defaults };
    });
    return initial;
  });
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top bar */}
      <header className="h-12 bg-white border-b border-gray-200 flex items-center px-4 shrink-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
          <span className="text-sm font-semibold text-gray-900">UIKit</span>
          <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-1.5 py-0.5 rounded">
            v1.0
          </span>
        </div>
      </header>

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

        {/* Center — preview */}
        <main className="flex-1 flex items-center justify-center overflow-auto p-8">
          <div className="flex flex-col items-center gap-6">
            {/* Component name */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {config.name}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Change properties on the right panel
              </p>
            </div>

            {/* Preview area */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 min-w-[320px] min-h-[160px] flex items-center justify-center">
              {config.render(values, extra)}
            </div>
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
    </div>
  );
}
