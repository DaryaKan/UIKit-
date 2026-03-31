import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: "Notifications",
  },
};

export const Checked: Story = {
  args: {
    label: "Dark mode",
    checked: true,
  },
};

export const Small: Story = {
  args: {
    label: "Compact",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    label: "Feature flag",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    label: "Locked setting",
    disabled: true,
    checked: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [values, setValues] = useState({
      notifications: true,
      darkMode: false,
      analytics: true,
    });

    return (
      <div className="flex flex-col gap-4">
        <Toggle
          label="Push notifications"
          checked={values.notifications}
          onChange={(v) => setValues((s) => ({ ...s, notifications: v }))}
        />
        <Toggle
          label="Dark mode"
          checked={values.darkMode}
          onChange={(v) => setValues((s) => ({ ...s, darkMode: v }))}
        />
        <Toggle
          label="Analytics"
          checked={values.analytics}
          onChange={(v) => setValues((s) => ({ ...s, analytics: v }))}
        />
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle label="Small" size="sm" checked />
      <Toggle label="Medium" size="md" checked />
      <Toggle label="Large" size="lg" checked />
    </div>
  ),
};
