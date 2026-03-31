import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Accept terms and conditions",
    description: "",
    disabled: false,
    defaultChecked: false,
  },
  argTypes: {
    label: {
      control: "text",
      description: "Main label text",
      table: { category: "Content" },
    },
    description: {
      control: "text",
      description: "Secondary description text",
      table: { category: "Content" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the checkbox",
      table: { category: "State" },
    },
    defaultChecked: {
      control: "boolean",
      description: "Initially checked",
      table: { category: "State" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive emails about new products and features",
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Frontend" description="React, Vue, Angular" />
      <Checkbox label="Backend" description="Node.js, Python, Go" />
      <Checkbox label="DevOps" description="Docker, Kubernetes, CI/CD" />
      <Checkbox label="Design" description="Figma, Sketch" disabled />
    </div>
  ),
};
