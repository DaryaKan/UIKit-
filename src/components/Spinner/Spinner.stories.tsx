import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    size: "md",
    color: "text-blue-600",
    label: "",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Spinner size",
      table: { category: "Appearance" },
    },
    color: {
      control: "select",
      options: [
        "text-blue-600",
        "text-gray-600",
        "text-green-600",
        "text-red-600",
        "text-purple-600",
        "text-amber-600",
      ],
      description: "Spinner color (Tailwind text color class)",
      table: { category: "Appearance" },
    },
    label: {
      control: "text",
      description: "Text shown below the spinner",
      table: { category: "Content" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {};

export const WithLabel: Story = {
  args: {
    size: "lg",
    label: "Loading data...",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};
