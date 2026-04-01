import React from "react";
import type { PropertyDef } from "./PropertyPanel";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Select,
  Toggle,
  Badge,
  Avatar,
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  Tabs,
  Tooltip,
  Spinner,
  Navbar,
  TabBar,
} from "../components";

export interface ComponentConfig {
  name: string;
  icon: string;
  properties: PropertyDef[];
  defaults: Record<string, unknown>;
  render: (
    props: Record<string, unknown>,
    extra: { openModal: () => void; closeModal: () => void; modalOpen: boolean }
  ) => React.ReactNode;
}

export const componentConfigs: ComponentConfig[] = [
  {
    name: "Button",
    icon: "▢",
    properties: [
      {
        key: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "primary", label: "Primary" },
          { value: "secondary", label: "Secondary" },
          { value: "outline", label: "Outline" },
          { value: "ghost", label: "Ghost" },
          { value: "danger", label: "Danger" },
        ],
      },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
        ],
      },
      { key: "label", label: "Label", type: "text" },
      { key: "isLoading", label: "Loading", type: "boolean" },
      { key: "disabled", label: "Disabled", type: "boolean" },
      { key: "fullWidth", label: "Full Width", type: "boolean" },
    ],
    defaults: {
      variant: "primary",
      size: "md",
      label: "Button",
      isLoading: false,
      disabled: false,
      fullWidth: false,
    },
    render: (p) => (
      <Button
        variant={p.variant as any}
        size={p.size as any}
        isLoading={p.isLoading as boolean}
        disabled={p.disabled as boolean}
        fullWidth={p.fullWidth as boolean}
      >
        {p.label as string}
      </Button>
    ),
  },
  {
    name: "Input",
    icon: "⌨",
    properties: [
      { key: "label", label: "Label", type: "text" },
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "hint", label: "Hint", type: "text" },
      { key: "error", label: "Error", type: "text" },
      {
        key: "inputSize",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
        ],
      },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: [
          { value: "text", label: "Text" },
          { value: "email", label: "Email" },
          { value: "password", label: "Password" },
          { value: "number", label: "Number" },
        ],
      },
      { key: "disabled", label: "Disabled", type: "boolean" },
    ],
    defaults: {
      label: "Email",
      placeholder: "you@example.com",
      hint: "",
      error: "",
      inputSize: "md",
      type: "text",
      disabled: false,
    },
    render: (p) => (
      <div className="w-72">
        <Input
          label={p.label as string}
          placeholder={p.placeholder as string}
          hint={(p.hint as string) || undefined}
          error={(p.error as string) || undefined}
          inputSize={p.inputSize as any}
          type={p.type as string}
          disabled={p.disabled as boolean}
        />
      </div>
    ),
  },
  {
    name: "Textarea",
    icon: "¶",
    properties: [
      { key: "label", label: "Label", type: "text" },
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "hint", label: "Hint", type: "text" },
      { key: "error", label: "Error", type: "text" },
      { key: "disabled", label: "Disabled", type: "boolean" },
    ],
    defaults: {
      label: "Description",
      placeholder: "Write something...",
      hint: "",
      error: "",
      disabled: false,
    },
    render: (p) => (
      <div className="w-80">
        <Textarea
          label={p.label as string}
          placeholder={p.placeholder as string}
          hint={(p.hint as string) || undefined}
          error={(p.error as string) || undefined}
          disabled={p.disabled as boolean}
        />
      </div>
    ),
  },
  {
    name: "Checkbox",
    icon: "☑",
    properties: [
      { key: "label", label: "Label", type: "text" },
      { key: "description", label: "Description", type: "text" },
      { key: "disabled", label: "Disabled", type: "boolean" },
      { key: "defaultChecked", label: "Checked", type: "boolean" },
    ],
    defaults: {
      label: "Accept terms",
      description: "",
      disabled: false,
      defaultChecked: false,
    },
    render: (p) => (
      <Checkbox
        label={p.label as string}
        description={(p.description as string) || undefined}
        disabled={p.disabled as boolean}
        defaultChecked={p.defaultChecked as boolean}
        key={String(p.defaultChecked)}
      />
    ),
  },
  {
    name: "Select",
    icon: "▾",
    properties: [
      { key: "label", label: "Label", type: "text" },
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "hint", label: "Hint", type: "text" },
      { key: "error", label: "Error", type: "text" },
      {
        key: "selectSize",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
        ],
      },
      { key: "disabled", label: "Disabled", type: "boolean" },
    ],
    defaults: {
      label: "Country",
      placeholder: "Choose...",
      hint: "",
      error: "",
      selectSize: "md",
      disabled: false,
    },
    render: (p) => (
      <div className="w-72">
        <Select
          label={p.label as string}
          placeholder={p.placeholder as string}
          hint={(p.hint as string) || undefined}
          error={(p.error as string) || undefined}
          selectSize={p.selectSize as any}
          disabled={p.disabled as boolean}
          options={[
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "de", label: "Germany" },
            { value: "ru", label: "Russia" },
          ]}
        />
      </div>
    ),
  },
  {
    name: "Toggle",
    icon: "◉",
    properties: [
      { key: "label", label: "Label", type: "text" },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
        ],
      },
      { key: "checked", label: "On", type: "boolean" },
      { key: "disabled", label: "Disabled", type: "boolean" },
    ],
    defaults: {
      label: "Notifications",
      size: "md",
      checked: false,
      disabled: false,
    },
    render: (p, _extra) => (
      <Toggle
        label={p.label as string}
        size={p.size as any}
        checked={p.checked as boolean}
        disabled={p.disabled as boolean}
      />
    ),
  },
  {
    name: "Badge",
    icon: "●",
    properties: [
      {
        key: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "primary", label: "Primary" },
          { value: "success", label: "Success" },
          { value: "warning", label: "Warning" },
          { value: "danger", label: "Danger" },
          { value: "info", label: "Info" },
        ],
      },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
        ],
      },
      { key: "label", label: "Text", type: "text" },
      { key: "rounded", label: "Pill", type: "boolean" },
      { key: "removable", label: "Removable", type: "boolean" },
    ],
    defaults: {
      variant: "primary",
      size: "md",
      label: "Badge",
      rounded: false,
      removable: false,
    },
    render: (p) => (
      <Badge
        variant={p.variant as any}
        size={p.size as any}
        rounded={p.rounded as boolean}
        removable={p.removable as boolean}
      >
        {p.label as string}
      </Badge>
    ),
  },
  {
    name: "Avatar",
    icon: "◕",
    properties: [
      { key: "name", label: "Name", type: "text" },
      { key: "src", label: "Image URL", type: "text" },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "xs", label: "XS" },
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
          { value: "xl", label: "XL" },
        ],
      },
    ],
    defaults: { name: "Darya Kan", src: "", size: "md" },
    render: (p) => (
      <Avatar
        name={p.name as string}
        src={(p.src as string) || undefined}
        size={p.size as any}
      />
    ),
  },
  {
    name: "Alert",
    icon: "⚠",
    properties: [
      {
        key: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "info", label: "Info" },
          { value: "success", label: "Success" },
          { value: "warning", label: "Warning" },
          { value: "error", label: "Error" },
        ],
      },
      { key: "title", label: "Title", type: "text" },
      { key: "message", label: "Message", type: "text" },
      { key: "dismissible", label: "Dismissible", type: "boolean" },
    ],
    defaults: {
      variant: "info",
      title: "Information",
      message: "A new update is available.",
      dismissible: false,
    },
    render: (p) => (
      <div className="w-96">
        <Alert
          variant={p.variant as any}
          title={p.title as string}
          dismissible={p.dismissible as boolean}
        >
          {p.message as string}
        </Alert>
      </div>
    ),
  },
  {
    name: "Card",
    icon: "□",
    properties: [
      {
        key: "padding",
        label: "Padding",
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
        ],
      },
      {
        key: "shadow",
        label: "Shadow",
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
        ],
      },
      { key: "border", label: "Border", type: "boolean" },
      { key: "hoverable", label: "Hoverable", type: "boolean" },
    ],
    defaults: { padding: "none", shadow: "sm", border: true, hoverable: false },
    render: (p) => (
      <div className="w-80">
        <Card
          padding={p.padding as any}
          shadow={p.shadow as any}
          border={p.border as boolean}
          hoverable={p.hoverable as boolean}
        >
          <CardHeader>Card Title</CardHeader>
          <CardBody>
            <p className="text-gray-600 text-sm">
              Card content goes here. Try changing the properties.
            </p>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="ghost">Cancel</Button>
            <Button size="sm">Save</Button>
          </CardFooter>
        </Card>
      </div>
    ),
  },
  {
    name: "Modal",
    icon: "◰",
    properties: [
      { key: "title", label: "Title", type: "text" },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
          { value: "xl", label: "XL" },
        ],
      },
      { key: "closeOnOverlay", label: "Close on Overlay", type: "boolean" },
    ],
    defaults: { title: "Modal Title", size: "md", closeOnOverlay: true },
    render: (p, { openModal, closeModal, modalOpen }) => (
      <>
        <Button onClick={openModal}>Open Modal</Button>
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={p.title as string}
          size={p.size as any}
          closeOnOverlay={p.closeOnOverlay as boolean}
          footer={
            <>
              <Button variant="ghost" onClick={closeModal}>Cancel</Button>
              <Button onClick={closeModal}>Confirm</Button>
            </>
          }
        >
          <p className="text-gray-600">Modal content. Change title and size from the properties panel.</p>
        </Modal>
      </>
    ),
  },
  {
    name: "Tabs",
    icon: "⊞",
    properties: [
      {
        key: "variant",
        label: "Style",
        type: "select",
        options: [
          { value: "underline", label: "Underline" },
          { value: "pills", label: "Pills" },
          { value: "bordered", label: "Bordered" },
        ],
      },
    ],
    defaults: { variant: "underline" },
    render: (p) => (
      <div className="w-96">
        <Tabs
          variant={p.variant as any}
          tabs={[
            { id: "t1", label: "Overview", content: <p className="text-gray-600 text-sm">Overview content</p> },
            { id: "t2", label: "Features", content: <p className="text-gray-600 text-sm">Features content</p> },
            { id: "t3", label: "Docs", content: <p className="text-gray-600 text-sm">Documentation</p> },
          ]}
        />
      </div>
    ),
  },
  {
    name: "Tooltip",
    icon: "💬",
    properties: [
      { key: "content", label: "Text", type: "text" },
      {
        key: "position",
        label: "Position",
        type: "select",
        options: [
          { value: "top", label: "Top" },
          { value: "bottom", label: "Bottom" },
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
        ],
      },
    ],
    defaults: { content: "Tooltip text", position: "top" },
    render: (p) => (
      <Tooltip content={p.content as string} position={p.position as any}>
        <Button variant="outline">Hover me</Button>
      </Tooltip>
    ),
  },
  {
    name: "Spinner",
    icon: "◌",
    properties: [
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "S" },
          { value: "md", label: "M" },
          { value: "lg", label: "L" },
          { value: "xl", label: "XL" },
        ],
      },
      {
        key: "color",
        label: "Color",
        type: "select",
        options: [
          { value: "text-blue-600", label: "Blue" },
          { value: "text-gray-600", label: "Gray" },
          { value: "text-green-600", label: "Green" },
          { value: "text-red-600", label: "Red" },
          { value: "text-purple-600", label: "Purple" },
        ],
      },
      { key: "label", label: "Label", type: "text" },
    ],
    defaults: { size: "md", color: "text-white", label: "" },
    render: (p) => (
      <Spinner
        size={p.size as any}
        color={p.color as string}
        label={(p.label as string) || undefined}
      />
    ),
  },
  {
    name: "Navbar",
    icon: "▬",
    properties: [
      { key: "brandText", label: "Brand", type: "text" },
      { key: "itemCount", label: "Items", type: "select", options: [
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
      ]},
      { key: "showBadge", label: "Show Badge", type: "boolean" },
    ],
    defaults: { brandText: "UIKit", itemCount: "3", showBadge: true },
    render: (p) => {
      const count = parseInt(p.itemCount as string);
      const labels = ["Home", "Components", "Docs", "Admin"];
      return (
        <div className="w-full">
          <Navbar
            brand={
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-white/30 flex items-center justify-center text-white text-[10px] font-bold border border-white/30">U</div>
                <span className="text-sm font-semibold text-white">{p.brandText as string}</span>
              </div>
            }
            items={labels.slice(0, count).map((l, i) => ({
              id: l.toLowerCase(),
              label: l,
              badge: p.showBadge && i === count - 1 ? 3 : undefined,
            }))}
            activeItem="home"
          />
        </div>
      );
    },
  },
  {
    name: "TabBar",
    icon: "⊟",
    properties: [
      { key: "itemCount", label: "Items", type: "select", options: [
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
      ]},
      { key: "showBadge", label: "Show Badge", type: "boolean" },
    ],
    defaults: { itemCount: "4", showBadge: true },
    render: (p) => {
      const icons = [
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>,
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      ];
      const labels = ["Home", "Search", "Alerts", "Profile", "Settings"];
      const count = parseInt(p.itemCount as string);
      return (
        <div className="w-80">
          <TabBar
            items={labels.slice(0, count).map((l, i) => ({
              id: l.toLowerCase(),
              label: l,
              icon: icons[i],
              badge: p.showBadge && l === "Alerts" ? 5 : undefined,
            }))}
            activeItem="home"
          />
        </div>
      );
    },
  },
];
