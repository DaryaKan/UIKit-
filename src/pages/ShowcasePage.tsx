import { componentConfigs } from "../showcase/componentConfigs";
import { getApprovedByComponent } from "../store/changeRequests";

export function ShowcasePage() {
  const extra = {
    openModal: () => {},
    closeModal: () => {},
    modalOpen: false,
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Component Showcase
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Live components with approved configurations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {componentConfigs.map((config) => {
            const approved = getApprovedByComponent(config.name);
            const props = approved
              ? approved.properties
              : config.defaults;

            return (
              <div
                key={config.name}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base opacity-50">{config.icon}</span>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {config.name}
                    </h3>
                  </div>
                  {approved && (
                    <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      customized
                    </span>
                  )}
                </div>
                <div className="p-6 flex items-center justify-center min-h-[100px] bg-gray-50/50">
                  {config.render(props, extra)}
                </div>
                {approved && (
                  <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                    <p className="text-[11px] text-gray-400">
                      Changed by {approved.authorName}:{" "}
                      <span className="text-gray-500">
                        {approved.description}
                      </span>
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
