import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
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

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "ru", label: "Russia" },
];

export const Default: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select a country",
  },
};

export const WithError: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select a country",
    error: "Country is required",
  },
};

export const WithHint: Story = {
  args: {
    label: "Timezone",
    options: [
      { value: "utc", label: "UTC" },
      { value: "est", label: "Eastern Time (EST)" },
      { value: "pst", label: "Pacific Time (PST)" },
      { value: "msk", label: "Moscow Time (MSK)" },
    ],
    hint: "Used for scheduling notifications",
  },
};

export const Disabled: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    disabled: true,
    defaultValue: "us",
  },
};

export const Small: Story = {
  args: {
    label: "Size",
    options: [
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" },
    ],
    selectSize: "sm",
  },
};

export const Large: Story = {
  args: {
    label: "Category",
    options: [
      { value: "tech", label: "Technology" },
      { value: "design", label: "Design" },
      { value: "business", label: "Business" },
    ],
    selectSize: "lg",
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "Plan",
    options: [
      { value: "free", label: "Free" },
      { value: "pro", label: "Pro" },
      { value: "enterprise", label: "Enterprise (Coming Soon)", disabled: true },
    ],
  },
};
