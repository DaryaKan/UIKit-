import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleTabs = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <p className="text-gray-600">
        This is the overview section with general information about the project.
      </p>
    ),
  },
  {
    id: "features",
    label: "Features",
    content: (
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>Responsive design</li>
        <li>Dark mode support</li>
        <li>Accessibility built-in</li>
        <li>TypeScript support</li>
      </ul>
    ),
  },
  {
    id: "docs",
    label: "Documentation",
    content: (
      <p className="text-gray-600">
        Check out our documentation for detailed API reference and usage examples.
      </p>
    ),
  },
];

export const Underline: Story = {
  args: {
    tabs: sampleTabs,
    variant: "underline",
  },
};

export const Pills: Story = {
  args: {
    tabs: sampleTabs,
    variant: "pills",
  },
};

export const Bordered: Story = {
  args: {
    tabs: sampleTabs,
    variant: "bordered",
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      ...sampleTabs,
      {
        id: "settings",
        label: "Settings",
        content: <p>Settings content</p>,
        disabled: true,
      },
    ],
    variant: "underline",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
          Underline
        </h3>
        <Tabs tabs={sampleTabs} variant="underline" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
          Pills
        </h3>
        <Tabs tabs={sampleTabs} variant="pills" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
          Bordered
        </h3>
        <Tabs tabs={sampleTabs} variant="bordered" />
      </div>
    </div>
  ),
};
