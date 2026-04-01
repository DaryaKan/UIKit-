import type { Meta, StoryObj } from "@storybook/react-vite";
import { typographyScale, fontFamilies } from "../tokens";

function TypographyShowcase() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Typography</h1>
        <p className="text-gray-600">
          Type scale and font styles. Each row shows the live rendered style,
          its Tailwind classes, and intended use. Edit{" "}
          <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">
            src/tokens/typography.ts
          </code>{" "}
          to change the scale.
        </p>
      </div>

      {/* Font Families */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Font Families
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500 mb-1">
              Sans (default)
            </p>
            <p className="text-2xl font-sans">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="text-xs text-gray-400 mt-2 font-mono break-all">
              {fontFamilies.sans}
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500 mb-1">Mono</p>
            <p className="text-2xl font-mono">
              const x = 42;
            </p>
            <p className="text-xs text-gray-400 mt-2 font-mono break-all">
              {fontFamilies.mono}
            </p>
          </div>
        </div>
      </div>

      {/* Type Scale */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Type Scale
        </h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
          {typographyScale.map((style) => (
            <div key={style.name} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                <div className="sm:w-32 shrink-0">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {style.name}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={style.tailwindClass + " text-gray-900 truncate"}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:ml-38 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                <span>
                  <span className="font-medium text-gray-600">Class:</span>{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    {style.tailwindClass}
                  </code>
                </span>
                <span>
                  <span className="font-medium text-gray-600">Size:</span>{" "}
                  {style.fontSize}
                </span>
                <span>
                  <span className="font-medium text-gray-600">Weight:</span>{" "}
                  {style.fontWeight}
                </span>
                <span className="text-gray-400">{style.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage */}
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          How to use
        </h2>
        <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-gray-100 space-y-1">
          <p>
            <span className="text-gray-500">{"// "}</span>Heading
          </p>
          <p>
            {"<h1 className=\""}
            <span className="text-green-400">text-4xl font-bold</span>
            {"\" />"}
          </p>
          <p className="mt-2">
            <span className="text-gray-500">{"// "}</span>Body text
          </p>
          <p>
            {"<p className=\""}
            <span className="text-green-400">text-base font-normal</span>
            {"\" />"}
          </p>
          <p className="mt-2">
            <span className="text-gray-500">{"// "}</span>Caption
          </p>
          <p>
            {"<span className=\""}
            <span className="text-green-400">text-xs text-gray-500</span>
            {"\" />"}
          </p>
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Typography",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const TypeScale: Story = {
  render: () => <TypographyShowcase />,
};
