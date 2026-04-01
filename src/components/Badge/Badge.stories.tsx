import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "primary",
    size: "md",
    rounded: false,
    removable: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Badge label text",
      table: { category: "Content" },
    },
    variant: {
      control: "inline-radio",
      options: ["default", "primary", "success", "warning", "danger", "info"],
      description: "Color variant",
      table: { category: "Appearance" },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Badge size",
      table: { category: "Appearance" },
    },
    rounded: {
      control: "boolean",
      description: "Pill shape (fully rounded)",
      table: { category: "Appearance" },
    },
    removable: {
      control: "boolean",
      description: "Show remove (×) button",
      table: { category: "Behavior" },
    },
    onRemove: { action: "removed", table: { category: "Events" } },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const PillTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {["React", "TypeScript", "Tailwind", "Vite", "Storybook"].map((tag) => (
        <Badge key={tag} variant="primary" rounded removable>
          {tag}
        </Badge>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </div>
  ),
};
