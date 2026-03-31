import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Input } from "../Input";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Modal heading",
      table: { category: "Content" },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Modal width",
      table: { category: "Appearance" },
    },
    closeOnOverlay: {
      control: "boolean",
      description: "Close when clicking the backdrop",
      table: { category: "Behavior" },
    },
    isOpen: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p className="text-gray-600">Modal content goes here. Use the controls panel to change title, size, and behavior.</p>
        </Modal>
      </>
    );
  },
  args: {
    title: "Modal Title",
    size: "md",
    closeOnOverlay: true,
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Create User</Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Create New User"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Create</Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <Input label="Full Name" placeholder="John Doe" />
            <Input label="Email" type="email" placeholder="john@example.com" />
          </div>
        </Modal>
      </>
    );
  },
};

export const DangerConfirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete Account</Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Delete Account?"
          size="sm"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
            </>
          }
        >
          <p className="text-gray-600">This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};
