import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    label: "Notifications",
    checked: false,
    disabled: false,
    size: "md",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Text label next to the toggle",
      table: { category: "Content" },
    },
    checked: {
      control: "boolean",
      description: "Toggle on/off state",
      table: { category: "State" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the toggle",
      table: { category: "State" },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Toggle size",
      table: { category: "Appearance" },
    },
    onChange: { action: "toggled", table: { category: "Events" } },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Playground: Story = {};

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
