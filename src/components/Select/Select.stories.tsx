import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "ru", label: "Russia" },
  { value: "jp", label: "Japan" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Country",
    placeholder: "Select a country",
    options: countries,
    selectSize: "md",
    disabled: false,
    error: "",
    hint: "",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label shown above the select",
      table: { category: "Content" },
    },
    placeholder: {
      control: "text",
      description: "Placeholder option text",
      table: { category: "Content" },
    },
    hint: {
      control: "text",
      description: "Helper text below",
      table: { category: "Content" },
    },
    error: {
      control: "text",
      description: "Error message",
      table: { category: "Validation" },
    },
    selectSize: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Select size",
      table: { category: "Appearance" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the select",
      table: { category: "State" },
    },
    options: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const WithError: Story = {
  args: {
    error: "Country is required",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Select label="Small" selectSize="sm" options={countries} placeholder="Pick one" />
      <Select label="Medium" selectSize="md" options={countries} placeholder="Pick one" />
      <Select label="Large" selectSize="lg" options={countries} placeholder="Pick one" />
    </div>
  ),
};
