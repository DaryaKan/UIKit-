import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    name: "Darya Kan",
    size: "md",
    src: "",
  },
  argTypes: {
    name: {
      control: "text",
      description: "User name (used for initials and color)",
      table: { category: "Content" },
    },
    src: {
      control: "text",
      description: "Image URL (leave empty for initials)",
      table: { category: "Content" },
    },
    size: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Avatar size",
      table: { category: "Appearance" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=32",
    name: "John Doe",
    size: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-3">
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Charlie" />
      <Avatar name="Diana" />
      <Avatar name="Edward" />
    </div>
  ),
};
