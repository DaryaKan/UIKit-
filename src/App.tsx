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
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  Tabs,
  Tooltip,
  Spinner,
} from "./components";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toggles, setToggles] = useState({
    notifications: true,
    darkMode: false,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              U
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">UIKit</h1>
              <p className="text-xs text-gray-500">Component Library</p>
            </div>
          </div>
          <Badge variant="primary" rounded>
            v1.0.0
          </Badge>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {/* Buttons */}
        <Section title="Button">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button isLoading>Loading...</Button>
              <Button disabled>Disabled</Button>
              <Button
                leftIcon={
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                }
              >
                With Icon
              </Button>
            </div>
          </div>
        </Section>

        {/* Inputs */}
        <Section title="Input & Textarea">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Email" placeholder="you@example.com" />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
            />
            <Input
              label="With Error"
              defaultValue="bad-input"
              error="Invalid value"
            />
            <Input
              label="With Hint"
              placeholder="johndoe"
              hint="Must be unique"
            />
          </div>
          <div className="mt-6">
            <Textarea
              label="Description"
              placeholder="Tell us about yourself..."
              hint="Max 500 characters"
            />
          </div>
        </Section>

        {/* Select */}
        <Section title="Select">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Country"
              placeholder="Choose a country"
              options={[
                { value: "us", label: "United States" },
                { value: "uk", label: "United Kingdom" },
                { value: "de", label: "Germany" },
                { value: "ru", label: "Russia" },
                { value: "jp", label: "Japan" },
              ]}
            />
            <Select
              label="Plan"
              options={[
                { value: "free", label: "Free" },
                { value: "pro", label: "Pro" },
                {
                  value: "ent",
                  label: "Enterprise (soon)",
                  disabled: true,
                },
              ]}
              hint="Upgrade anytime"
            />
          </div>
        </Section>

        {/* Checkbox & Toggle */}
        <Section title="Checkbox & Toggle">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Checkbox label="Accept terms" />
              <Checkbox
                label="Marketing emails"
                description="Receive product updates"
              />
              <Checkbox label="Disabled" disabled />
            </div>
            <div className="space-y-4">
              <Toggle
                label="Notifications"
                checked={toggles.notifications}
                onChange={(v) =>
                  setToggles((s) => ({ ...s, notifications: v }))
                }
              />
              <Toggle
                label="Dark mode"
                checked={toggles.darkMode}
                onChange={(v) => setToggles((s) => ({ ...s, darkMode: v }))}
              />
              <Toggle label="Locked" disabled checked />
            </div>
          </div>
        </Section>

        {/* Badge */}
        <Section title="Badge">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge variant="primary" rounded>
              Pill
            </Badge>
            <Badge variant="success" rounded removable>
              Removable
            </Badge>
            <Badge variant="info" size="lg">
              Large
            </Badge>
          </div>
        </Section>

        {/* Avatar */}
        <Section title="Avatar">
          <div className="flex items-center gap-4">
            <Avatar name="Alice" size="xs" />
            <Avatar name="Bob Smith" size="sm" />
            <Avatar name="Charlie Davis" size="md" />
            <Avatar name="Darya Kan" size="lg" />
            <Avatar name="Edward Fox" size="xl" />
          </div>
          <div className="flex -space-x-3 mt-4">
            <Avatar name="A" />
            <Avatar name="B" />
            <Avatar name="C" />
            <Avatar name="D" />
            <Avatar name="E" />
          </div>
        </Section>

        {/* Alert */}
        <Section title="Alert">
          <div className="space-y-4">
            <Alert variant="info" title="Information">
              A new version is available. See what&apos;s new.
            </Alert>
            <Alert variant="success" title="Success">
              Changes saved successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
              Your trial expires in 3 days.
            </Alert>
            <Alert variant="error" title="Error" dismissible>
              Something went wrong. Please try again.
            </Alert>
          </div>
        </Section>

        {/* Card */}
        <Section title="Card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="none">
              <CardHeader>Project Settings</CardHeader>
              <CardBody>
                <p className="text-gray-600">
                  Configure your project settings. Changes apply immediately.
                </p>
              </CardBody>
              <CardFooter>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>

            <Card padding="none" hoverable>
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
          </div>
        </Section>

        {/* Modal */}
        <Section title="Modal">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Create New Project"
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setModalOpen(false)}>Create</Button>
              </>
            }
          >
            <div className="space-y-4">
              <Input label="Project Name" placeholder="My Awesome Project" />
              <Textarea label="Description" placeholder="What is this project about?" />
            </div>
          </Modal>
        </Section>

        {/* Tabs */}
        <Section title="Tabs">
          <div className="space-y-8">
            <Tabs
              variant="underline"
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content: (
                    <p className="text-gray-600">
                      General project information and metrics.
                    </p>
                  ),
                },
                {
                  id: "features",
                  label: "Features",
                  content: (
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>14 components</li>
                      <li>TypeScript support</li>
                      <li>Tailwind CSS styling</li>
                    </ul>
                  ),
                },
                {
                  id: "docs",
                  label: "Docs",
                  content: (
                    <p className="text-gray-600">
                      Read the full documentation in Storybook.
                    </p>
                  ),
                },
              ]}
            />
            <Tabs
              variant="pills"
              tabs={[
                {
                  id: "all",
                  label: "All",
                  content: <p className="text-gray-600">All items</p>,
                },
                {
                  id: "active",
                  label: "Active",
                  content: <p className="text-gray-600">Active items only</p>,
                },
                {
                  id: "archived",
                  label: "Archived",
                  content: (
                    <p className="text-gray-600">Archived items only</p>
                  ),
                },
              ]}
            />
          </div>
        </Section>

        {/* Tooltip */}
        <Section title="Tooltip">
          <div className="flex items-center gap-6 py-4">
            <Tooltip content="Top tooltip" position="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" position="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Left tooltip" position="left">
              <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="Right tooltip" position="right">
              <Button variant="outline">Right</Button>
            </Tooltip>
          </div>
        </Section>

        {/* Spinner */}
        <Section title="Spinner">
          <div className="flex items-end gap-8">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" label="Loading..." />
            <Spinner size="lg" color="text-purple-600" />
          </div>
        </Section>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          UIKit Component Library &mdash; Built with React, TypeScript &
          Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
