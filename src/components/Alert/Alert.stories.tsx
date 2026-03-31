import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    variant: "info",
    title: "Information",
    children: "A new software update is available.",
    dismissible: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["info", "success", "warning", "error"],
      description: "Alert type / color",
      table: { category: "Appearance" },
    },
    title: {
      control: "text",
      description: "Bold heading text",
      table: { category: "Content" },
    },
    children: {
      control: "text",
      description: "Alert body text",
      table: { category: "Content" },
    },
    dismissible: {
      control: "boolean",
      description: "Show dismiss (×) button",
      table: { category: "Behavior" },
    },
    onDismiss: { action: "dismissed", table: { category: "Events" } },
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
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="info" title="Info">This is informational.</Alert>
      <Alert variant="success" title="Success">Operation completed.</Alert>
      <Alert variant="warning" title="Warning">Be careful here.</Alert>
      <Alert variant="error" title="Error">Something went wrong.</Alert>
    </div>
  ),
};
