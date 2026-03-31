import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=32",
    name: "John Doe",
  },
};

export const WithInitials: Story = {
  args: {
    name: "Darya Kan",
  },
};

export const Fallback: Story = {
  args: {},
};

export const BrokenImage: Story = {
  args: {
    src: "https://invalid-url.com/avatar.jpg",
    name: "Jane Smith",
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
      <Avatar name="Alice Brown" size="md" />
      <Avatar name="Bob Smith" size="md" />
      <Avatar name="Charlie Davis" size="md" />
      <Avatar name="Diana Evans" size="md" />
      <Avatar name="Edward Fox" size="md" />
    </div>
  ),
};

export const DifferentColors: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Charlie" />
      <Avatar name="Diana" />
      <Avatar name="Edward" />
      <Avatar name="Fiona" />
      <Avatar name="George" />
      <Avatar name="Helen" />
    </div>
  ),
};
