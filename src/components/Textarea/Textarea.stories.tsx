import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
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

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Write your description here...",
  },
};

export const WithHint: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    hint: "Maximum 500 characters",
  },
};

export const WithError: Story = {
  args: {
    label: "Comment",
    defaultValue: "Hi",
    error: "Comment must be at least 10 characters",
  },
};

export const Disabled: Story = {
  args: {
    label: "Notes",
    defaultValue: "This field is read-only",
    disabled: true,
  },
};
