import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
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
  CardBody,
  Modal,
  Tabs,
  Tooltip,
  Spinner,
} from "../components";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

function ControlRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-gray-400 w-20 shrink-0 text-right uppercase tracking-wider">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
      }`}
    >
      {children}
    </button>
  );
}

function ComponentSection({
  title,
  children,
  controls,
}: {
  title: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      {controls && (
        <div className="bg-gray-50/50 border-b border-gray-200 px-5 py-3 space-y-2">
          {controls}
        </div>
      )}
      <div className="p-6 flex items-center justify-center min-h-[80px]">
        {children}
      </div>
    </div>
  );
}

function PlaygroundPage() {
  const [btnVariant, setBtnVariant] = useState<Variant>("primary");
  const [btnSize, setBtnSize] = useState<Size>("md");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Button");

  const [badgeVariant, setBadgeVariant] = useState<
    "default" | "primary" | "success" | "warning" | "danger" | "info"
  >("primary");
  const [badgeRounded, setBadgeRounded] = useState(false);
  const [badgeLabel, setBadgeLabel] = useState("Badge");

  const [alertVariant, setAlertVariant] = useState<
    "info" | "success" | "warning" | "error"
  >("info");

  const [avatarSize, setAvatarSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
  const [avatarName, setAvatarName] = useState("Darya Kan");

  const [toggleChecked, setToggleChecked] = useState(false);
  const [toggleSize, setToggleSize] = useState<Size>("md");

  const [spinnerSize, setSpinnerSize] = useState<"sm" | "md" | "lg" | "xl">("md");

  const [modalOpen, setModalOpen] = useState(false);

  const [tabVariant, setTabVariant] = useState<"underline" | "pills" | "bordered">("underline");

  return (
    <div className="max-w-2xl space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Playground</h1>
        <p className="text-gray-500">
          Click the option buttons to configure each component — like properties in Figma.
        </p>
      </div>

      {/* Button */}
      <ComponentSection
        title="Button"
        controls={
          <>
            <ControlRow label="Variant">
              {(["primary", "secondary", "outline", "ghost", "danger"] as const).map((v) => (
                <OptionButton key={v} active={btnVariant === v} onClick={() => setBtnVariant(v)}>
                  {v}
                </OptionButton>
              ))}
            </ControlRow>
            <ControlRow label="Size">
              {(["sm", "md", "lg"] as const).map((s) => (
                <OptionButton key={s} active={btnSize === s} onClick={() => setBtnSize(s)}>
                  {s}
                </OptionButton>
              ))}
            </ControlRow>
            <ControlRow label="State">
              <OptionButton active={btnLoading} onClick={() => setBtnLoading(!btnLoading)}>
                loading
              </OptionButton>
              <OptionButton active={btnDisabled} onClick={() => setBtnDisabled(!btnDisabled)}>
                disabled
              </OptionButton>
            </ControlRow>
            <ControlRow label="Label">
              <input
                className="border border-gray-200 rounded-md px-2 py-1 text-xs w-32"
                value={btnLabel}
                onChange={(e) => setBtnLabel(e.target.value)}
              />
            </ControlRow>
          </>
        }
      >
        <Button variant={btnVariant} size={btnSize} isLoading={btnLoading} disabled={btnDisabled}>
          {btnLabel}
        </Button>
      </ComponentSection>

      {/* Badge */}
      <ComponentSection
        title="Badge"
        controls={
          <>
            <ControlRow label="Variant">
              {(["default", "primary", "success", "warning", "danger", "info"] as const).map((v) => (
                <OptionButton key={v} active={badgeVariant === v} onClick={() => setBadgeVariant(v)}>
                  {v}
                </OptionButton>
              ))}
            </ControlRow>
            <ControlRow label="Shape">
              <OptionButton active={!badgeRounded} onClick={() => setBadgeRounded(false)}>
                square
              </OptionButton>
              <OptionButton active={badgeRounded} onClick={() => setBadgeRounded(true)}>
                pill
              </OptionButton>
            </ControlRow>
            <ControlRow label="Label">
              <input
                className="border border-gray-200 rounded-md px-2 py-1 text-xs w-32"
                value={badgeLabel}
                onChange={(e) => setBadgeLabel(e.target.value)}
              />
            </ControlRow>
          </>
        }
      >
        <Badge variant={badgeVariant} rounded={badgeRounded}>{badgeLabel}</Badge>
      </ComponentSection>

      {/* Avatar */}
      <ComponentSection
        title="Avatar"
        controls={
          <>
            <ControlRow label="Size">
              {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                <OptionButton key={s} active={avatarSize === s} onClick={() => setAvatarSize(s)}>
                  {s}
                </OptionButton>
              ))}
            </ControlRow>
            <ControlRow label="Name">
              <input
                className="border border-gray-200 rounded-md px-2 py-1 text-xs w-32"
                value={avatarName}
                onChange={(e) => setAvatarName(e.target.value)}
              />
            </ControlRow>
          </>
        }
      >
        <Avatar name={avatarName} size={avatarSize} />
      </ComponentSection>

      {/* Alert */}
      <ComponentSection
        title="Alert"
        controls={
          <ControlRow label="Variant">
            {(["info", "success", "warning", "error"] as const).map((v) => (
              <OptionButton key={v} active={alertVariant === v} onClick={() => setAlertVariant(v)}>
                {v}
              </OptionButton>
            ))}
          </ControlRow>
        }
      >
        <div className="w-full">
          <Alert variant={alertVariant} title={alertVariant.charAt(0).toUpperCase() + alertVariant.slice(1)}>
            This is a {alertVariant} alert message.
          </Alert>
        </div>
      </ComponentSection>

      {/* Toggle */}
      <ComponentSection
        title="Toggle"
        controls={
          <ControlRow label="Size">
            {(["sm", "md", "lg"] as const).map((s) => (
              <OptionButton key={s} active={toggleSize === s} onClick={() => setToggleSize(s)}>
                {s}
              </OptionButton>
            ))}
          </ControlRow>
        }
      >
        <Toggle
          label="Notifications"
          checked={toggleChecked}
          onChange={setToggleChecked}
          size={toggleSize}
        />
      </ComponentSection>

      {/* Spinner */}
      <ComponentSection
        title="Spinner"
        controls={
          <ControlRow label="Size">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <OptionButton key={s} active={spinnerSize === s} onClick={() => setSpinnerSize(s)}>
                {s}
              </OptionButton>
            ))}
          </ControlRow>
        }
      >
        <Spinner size={spinnerSize} />
      </ComponentSection>

      {/* Tabs */}
      <ComponentSection
        title="Tabs"
        controls={
          <ControlRow label="Style">
            {(["underline", "pills", "bordered"] as const).map((v) => (
              <OptionButton key={v} active={tabVariant === v} onClick={() => setTabVariant(v)}>
                {v}
              </OptionButton>
            ))}
          </ControlRow>
        }
      >
        <div className="w-full">
          <Tabs
            variant={tabVariant}
            tabs={[
              { id: "tab1", label: "Overview", content: <p className="text-gray-600">Overview content</p> },
              { id: "tab2", label: "Features", content: <p className="text-gray-600">Features content</p> },
              { id: "tab3", label: "Docs", content: <p className="text-gray-600">Docs content</p> },
            ]}
          />
        </div>
      </ComponentSection>

      {/* Input */}
      <ComponentSection title="Input">
        <div className="w-full max-w-xs">
          <Input label="Email" placeholder="you@example.com" hint="We'll never share your email" />
        </div>
      </ComponentSection>

      {/* Textarea */}
      <ComponentSection title="Textarea">
        <div className="w-full max-w-xs">
          <Textarea label="Description" placeholder="Write something..." />
        </div>
      </ComponentSection>

      {/* Select */}
      <ComponentSection title="Select">
        <div className="w-full max-w-xs">
          <Select
            label="Country"
            placeholder="Choose..."
            options={[
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom" },
              { value: "de", label: "Germany" },
              { value: "ru", label: "Russia" },
            ]}
          />
        </div>
      </ComponentSection>

      {/* Checkbox */}
      <ComponentSection title="Checkbox">
        <div className="space-y-2">
          <Checkbox label="Accept terms" />
          <Checkbox label="Subscribe to newsletter" description="Get weekly updates" />
        </div>
      </ComponentSection>

      {/* Tooltip */}
      <ComponentSection title="Tooltip">
        <div className="flex gap-4">
          <Tooltip content="Top tooltip" position="top"><Button variant="outline" size="sm">Top</Button></Tooltip>
          <Tooltip content="Right tooltip" position="right"><Button variant="outline" size="sm">Right</Button></Tooltip>
        </div>
      </ComponentSection>

      {/* Card */}
      <ComponentSection title="Card">
        <Card hoverable>
          <div className="flex items-center gap-3">
            <Avatar name="Darya Kan" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Darya Kan</p>
              <p className="text-xs text-gray-500">Developer</p>
            </div>
            <Badge variant="success" rounded className="ml-auto">Online</Badge>
          </div>
        </Card>
      </ComponentSection>

      {/* Modal */}
      <ComponentSection title="Modal">
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Save</Button>
            </>
          }
        >
          <p className="text-gray-600">This is a modal dialog.</p>
        </Modal>
      </ComponentSection>
    </div>
  );
}

const meta: Meta = {
  title: "Playground",
  parameters: {
    layout: "padded",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const AllComponents: Story = {
  render: () => <PlaygroundPage />,
};
