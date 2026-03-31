import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    content: "Tooltip text",
    position: "top",
    delay: 200,
  },
  argTypes: {
    content: {
      control: "text",
      description: "Tooltip text shown on hover",
      table: { category: "Content" },
    },
    position: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
      description: "Tooltip position relative to the trigger",
      table: { category: "Appearance" },
    },
    delay: {
      control: { type: "range", min: 0, max: 1000, step: 50 },
      description: "Delay before showing (ms)",
      table: { category: "Behavior" },
    },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  args: {
    children: <Button variant="outline">Hover me</Button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-12">
      <Tooltip content="Top" position="top"><Button variant="outline">Top</Button></Tooltip>
      <Tooltip content="Bottom" position="bottom"><Button variant="outline">Bottom</Button></Tooltip>
      <Tooltip content="Left" position="left"><Button variant="outline">Left</Button></Tooltip>
      <Tooltip content="Right" position="right"><Button variant="outline">Right</Button></Tooltip>
    </div>
  ),
};
