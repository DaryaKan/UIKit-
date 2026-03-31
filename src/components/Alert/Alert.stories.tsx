import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
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

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    children: "A new software update is available. See what's new in version 2.0.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your changes have been saved successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Your trial period expires in 3 days. Please upgrade your plan.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "There was a problem processing your request. Please try again.",
  },
};

export const Dismissible: Story = {
  args: {
    variant: "info",
    title: "Notification",
    children: "Click the X button to dismiss this alert.",
    dismissible: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: "success",
    children: "Profile updated successfully!",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="info" title="Info">
        This is an informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please be cautious proceeding.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong.
      </Alert>
    </div>
  ),
};
