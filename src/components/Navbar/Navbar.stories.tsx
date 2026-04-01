import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar } from "./Navbar";
import { Avatar } from "../Avatar";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Playground: Story = {
  args: {
    brand: (
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-white/30 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold border border-white/30">
          U
        </div>
        <span className="text-sm font-semibold text-white">UIKit</span>
      </div>
    ),
    items: [
      { id: "home", label: "Home" },
      { id: "components", label: "Components" },
      { id: "docs", label: "Docs" },
      { id: "admin", label: "Admin", badge: 3 },
    ],
    activeItem: "home",
    rightContent: <Avatar name="Darya Kan" size="sm" />,
  },
};

export const Minimal: Story = {
  args: {
    brand: <span className="text-sm font-bold text-white">App</span>,
    items: [
      { id: "tab1", label: "Dashboard" },
      { id: "tab2", label: "Settings" },
    ],
    activeItem: "tab1",
  },
};
