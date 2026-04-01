import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Button } from "../Button";
import { Badge } from "../Badge";
import { Avatar } from "../Avatar";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    padding: "md",
    shadow: "sm",
    border: true,
    hoverable: false,
  },
  argTypes: {
    padding: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg"],
      description: "Inner padding",
      table: { category: "Appearance" },
    },
    shadow: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg"],
      description: "Shadow depth",
      table: { category: "Appearance" },
    },
    border: {
      control: "boolean",
      description: "Show border",
      table: { category: "Appearance" },
    },
    hoverable: {
      control: "boolean",
      description: "Elevate shadow on hover",
      table: { category: "Behavior" },
    },
    children: { table: { disable: true } },
  },
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

export const Playground: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
        <p className="text-gray-600">Adjust the controls on the right to customize this card.</p>
      </div>
    ),
  },
};

export const WithSections: Story = {
  render: () => (
    <Card padding="none">
      <CardHeader>Project Settings</CardHeader>
      <CardBody>
        <p className="text-gray-600">Configure your project settings.</p>
      </CardBody>
      <CardFooter>
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
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
          <Badge variant="success" rounded className="ml-auto">Active</Badge>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="outline" size="sm" fullWidth>View Profile</Button>
      </CardFooter>
    </Card>
  ),
};
