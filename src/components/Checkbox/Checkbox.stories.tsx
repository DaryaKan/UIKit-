import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive emails about new products and features",
  },
};

export const Checked: Story = {
  args: {
    label: "Remember me",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Unavailable option",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Required agreement",
    disabled: true,
    defaultChecked: true,
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Frontend" description="React, Vue, Angular" />
      <Checkbox label="Backend" description="Node.js, Python, Go" />
      <Checkbox label="DevOps" description="Docker, Kubernetes, CI/CD" />
      <Checkbox label="Design" description="Figma, Sketch, Adobe XD" />
    </div>
  ),
};
