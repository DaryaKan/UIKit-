import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Button } from "../Button";
import { Badge } from "../Badge";
import { Avatar } from "../Avatar";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
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
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
        <p className="text-gray-600">
          This is a simple card component with some content inside.
        </p>
      </div>
    ),
  },
};

export const WithSections: Story = {
  render: () => (
    <Card padding="none">
      <CardHeader>Project Settings</CardHeader>
      <CardBody>
        <p className="text-gray-600">
          Configure your project settings here. Changes will be applied immediately.
        </p>
      </CardBody>
      <CardFooter>
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Save Changes</Button>
      </CardFooter>
    </Card>
  ),
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Hover Me</h3>
        <p className="text-gray-600">
          This card has a hover effect with elevated shadow.
        </p>
      </div>
    ),
  },
};

export const UserProfile: Story = {
  render: () => (
    <Card padding="none">
      <CardBody>
        <div className="flex items-center gap-4">
          <Avatar name="Darya Kan" size="lg" />
          <div>
            <h3 className="font-semibold text-gray-900">Darya Kan</h3>
            <p className="text-sm text-gray-500">Frontend Developer</p>
          </div>
          <Badge variant="success" rounded className="ml-auto">
            Active
          </Badge>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="outline" size="sm" fullWidth>
          View Profile
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const NoShadow: Story = {
  args: {
    shadow: "none",
    children: (
      <p className="text-gray-600">A flat card without shadow.</p>
    ),
  },
};

export const LargeShadow: Story = {
  args: {
    shadow: "lg",
    children: (
      <p className="text-gray-600">A card with large shadow for emphasis.</p>
    ),
  },
};

export const NoBorder: Story = {
  args: {
    border: false,
    shadow: "md",
    children: (
      <p className="text-gray-600">Card without border, using shadow only.</p>
    ),
  },
};
