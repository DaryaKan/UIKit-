import { componentConfigs } from "../showcase/componentConfigs";
import { getApprovedByComponent } from "../store/changeRequests";

export function ShowcasePage() {
  const extra = { openModal: () => {}, closeModal: () => {}, modalOpen: false };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-10">
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Components</h1>
          <p className="text-[15px] text-gray-500 mt-1">Your design system at a glance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {componentConfigs.map((config) => {
            const approved = getApprovedByComponent(config.name);
            const props = approved ? approved.properties : config.defaults;

            return (
              <div
                key={config.name}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-gray-900">{config.name}</h3>
                  {approved && (
                    <span className="text-[10px] font-medium text-[#34C759] bg-[#34C759]/10 px-2 py-0.5 rounded-full">
                      Customized
                    </span>
                  )}
                </div>
                {/* Gradient preview area for glass components */}
                <div className="component-preview-bg p-8 flex items-center justify-center min-h-[120px]">
                  {config.render(props, extra)}
                </div>
                {approved && (
                  <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
                    <p className="text-[11px] text-gray-400">
                      {approved.authorName}: <span className="text-gray-500">{approved.description}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
