import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";

const sampleTabs = [
  {
    id: "overview",
    label: "Overview",
    content: <p className="text-gray-600">General information about the project.</p>,
  },
  {
    id: "features",
    label: "Features",
    content: (
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>Responsive design</li>
        <li>Dark mode support</li>
        <li>TypeScript</li>
      </ul>
    ),
  },
  {
    id: "docs",
    label: "Docs",
    content: <p className="text-gray-600">Read the full documentation.</p>,
  },
];

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    tabs: sampleTabs,
    variant: "underline",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["underline", "pills", "bordered"],
      description: "Tab bar visual style",
      table: { category: "Appearance" },
    },
    tabs: { table: { disable: true } },
    defaultTab: { table: { disable: true } },
    onChange: { action: "tab changed", table: { category: "Events" } },
  },
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

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Underline</p>
        <Tabs tabs={sampleTabs} variant="underline" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pills</p>
        <Tabs tabs={sampleTabs} variant="pills" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bordered</p>
        <Tabs tabs={sampleTabs} variant="bordered" />
      </div>
    </div>
  ),
};
