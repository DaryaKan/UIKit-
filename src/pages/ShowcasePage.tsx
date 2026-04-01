import { componentConfigs } from "../showcase/componentConfigs";
import { getApprovedByComponent } from "../store/changeRequests";

export function ShowcasePage() {
  const extra = { openModal: () => {}, closeModal: () => {}, modalOpen: false };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">Component Showcase</h1>
          <p className="text-sm text-white/60 mt-1">Live components with approved configurations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {componentConfigs.map((config) => {
            const approved = getApprovedByComponent(config.name);
            const props = approved ? approved.properties : config.defaults;

            return (
              <div
                key={config.name}
                className="rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
              >
                <div className="px-4 py-3 border-b border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base opacity-50">{config.icon}</span>
                    <h3 className="text-sm font-semibold text-white">{config.name}</h3>
                  </div>
                  {approved && (
                    <span className="text-[10px] font-medium text-emerald-200 bg-emerald-400/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-emerald-300/20">
                      customized
                    </span>
                  )}
                </div>
                <div className="p-6 flex items-center justify-center min-h-[100px]">
                  {config.render(props, extra)}
                </div>
                {approved && (
                  <div className="px-4 py-2 border-t border-white/10">
                    <p className="text-[11px] text-white/40">
                      Changed by {approved.authorName}: <span className="text-white/50">{approved.description}</span>
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
