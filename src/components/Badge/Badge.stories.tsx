import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Primary: Story = {
  args: {
    children: "New",
    variant: "primary",
  },
};

export const Success: Story = {
  args: {
    children: "Active",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Pending",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Error",
    variant: "danger",
  },
};

export const Info: Story = {
  args: {
    children: "Beta",
    variant: "info",
  },
};

export const Rounded: Story = {
  args: {
    children: "Pill",
    variant: "primary",
    rounded: true,
  },
};

export const Removable: Story = {
  args: {
    children: "React",
    variant: "primary",
    removable: true,
    rounded: true,
  },
};

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

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </div>
  ),
};

export const TagCloud: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {["React", "TypeScript", "Tailwind", "Vite", "Storybook", "Node.js"].map(
        (tag) => (
          <Badge key={tag} variant="primary" rounded removable>
            {tag}
          </Badge>
        )
      )}
    </div>
  ),
};
