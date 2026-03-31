import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    content: "This is a tooltip",
    position: "top",
    children: <Button>Hover me</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Bottom tooltip",
    position: "bottom",
    children: <Button variant="outline">Bottom</Button>,
  },
};

export const Left: Story = {
  args: {
    content: "Left tooltip",
    position: "left",
    children: <Button variant="secondary">Left</Button>,
  },
};

export const Right: Story = {
  args: {
    content: "Right tooltip",
    position: "right",
    children: <Button variant="ghost">Right</Button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-12">
      <Tooltip content="Top tooltip" position="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip content="Edit this item">
      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
    </Tooltip>
  ),
};
