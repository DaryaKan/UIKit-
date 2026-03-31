import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    label: "Description",
    placeholder: "Write something...",
    disabled: false,
    error: "",
    hint: "",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label shown above the textarea",
      table: { category: "Content" },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
      table: { category: "Content" },
    },
    hint: {
      control: "text",
      description: "Helper text below",
      table: { category: "Content" },
    },
    error: {
      control: "text",
      description: "Error message",
      table: { category: "Validation" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the textarea",
      table: { category: "State" },
    },
    rows: {
      control: { type: "number", min: 1, max: 20 },
      description: "Number of visible rows",
      table: { category: "Appearance" },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {};

export const WithError: Story = {
  args: {
    defaultValue: "Hi",
    error: "Must be at least 10 characters",
  },
};

export const WithHint: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    hint: "Max 500 characters",
  },
};
