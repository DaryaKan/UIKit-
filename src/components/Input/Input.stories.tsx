import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Email",
    placeholder: "you@example.com",
    inputSize: "md",
    disabled: false,
    error: "",
    hint: "",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label shown above the input",
      table: { category: "Content" },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
      table: { category: "Content" },
    },
    hint: {
      control: "text",
      description: "Helper text below the input",
      table: { category: "Content" },
    },
    error: {
      control: "text",
      description: "Error message (replaces hint when set)",
      table: { category: "Validation" },
    },
    inputSize: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Input size",
      table: { category: "Appearance" },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "HTML input type",
      table: { category: "Appearance" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
      table: { category: "State" },
    },
    leftAddon: { table: { disable: true } },
    rightAddon: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const WithError: Story = {
  args: {
    defaultValue: "invalid",
    error: "Please enter a valid email",
  },
};

export const WithHint: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    hint: "Must be at least 3 characters",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Small" inputSize="sm" placeholder="Small input" />
      <Input label="Medium" inputSize="md" placeholder="Medium input" />
      <Input label="Large" inputSize="lg" placeholder="Large input" />
    </div>
  ),
};
