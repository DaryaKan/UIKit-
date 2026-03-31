import type { Meta, StoryObj } from "@storybook/react-vite";
import { allColorGroups } from "../tokens";

function ColorPalette() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Colors</h1>
        <p className="text-gray-600">
          Color palette of the UIKit design system. Every color is available as
          a Tailwind CSS class. Edit{" "}
          <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">
            src/tokens/colors.ts
          </code>{" "}
          to change the palette.
        </p>
      </div>

      {allColorGroups.map((group) => (
        <div key={group.name}>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {group.name}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{group.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {group.swatches.map((swatch) => (
              <div key={swatch.name} className="space-y-1.5">
                <div
                  className="h-16 rounded-lg border border-gray-200 shadow-sm"
                  style={{ backgroundColor: swatch.value }}
                />
                <div>
                  <p className="text-xs font-medium text-gray-700">
                    {swatch.name}
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    {swatch.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          How to use
        </h2>
        <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-gray-100 space-y-1">
          <p>
            <span className="text-gray-500">{"// "}</span>Background
          </p>
          <p>
            {"<div className=\""}
            <span className="text-green-400">bg-blue-600</span>
            {"\" />"}
          </p>
          <p className="mt-2">
            <span className="text-gray-500">{"// "}</span>Text
          </p>
          <p>
            {"<p className=\""}
            <span className="text-green-400">text-gray-700</span>
            {"\" />"}
          </p>
          <p className="mt-2">
            <span className="text-gray-500">{"// "}</span>Border
          </p>
          <p>
            {"<div className=\""}
            <span className="text-green-400">border border-red-500</span>
            {"\" />"}
          </p>
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Colors",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const Palette: Story = {
  render: () => <ColorPalette />,
};
