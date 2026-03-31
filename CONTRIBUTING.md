# Contributing to UIKit

## Project Structure

```
src/
├── components/          # UI components
│   ├── Button/
│   │   ├── Button.tsx           # component code
│   │   ├── Button.stories.tsx   # Storybook stories
│   │   └── index.ts             # barrel export
│   ├── Input/
│   └── ...
├── tokens/              # design tokens (colors, typography)
│   ├── colors.ts
│   ├── typography.ts
│   └── index.ts
├── docs/                # Storybook documentation pages
│   ├── Colors.stories.tsx
│   └── Typography.stories.tsx
├── styles/
│   └── globals.css      # Tailwind import & custom CSS
├── App.tsx              # demo page
└── main.tsx             # demo entry point
```

---

## How to Edit an Existing Component

**Example:** change the Button border radius from `rounded-lg` to `rounded-full`.

### 1. Edit the component

Open `src/components/Button/Button.tsx` and find the className:

```diff
- "inline-flex items-center justify-center font-medium rounded-lg ...",
+ "inline-flex items-center justify-center font-medium rounded-full ...",
```

### 2. Check in Storybook

```bash
npm run storybook
```

Open http://localhost:6006 → Components → Button. All stories update live.

### 3. (Optional) Update stories

If your change adds new props or variants, update `Button.stories.tsx`:

```tsx
export const Rounded: Story = {
  args: {
    children: "Rounded",
    variant: "primary",
  },
};
```

### 4. Type check

```bash
npm run typecheck
```

### 5. Commit

```bash
git add -A
git commit -m "fix(Button): use rounded-full border radius"
git push
```

---

## How to Add a New Component

**Example:** create a `Divider` component.

### 1. Create the folder

```
src/components/Divider/
├── Divider.tsx
├── Divider.stories.tsx
└── index.ts
```

### 2. Write the component (`Divider.tsx`)

```tsx
import React from "react";
import { clsx } from "clsx";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  className,
}) => {
  return (
    <div
      role="separator"
      className={clsx(
        orientation === "horizontal"
          ? "w-full h-px bg-gray-200"
          : "h-full w-px bg-gray-200",
        className
      )}
    />
  );
};

Divider.displayName = "Divider";
```

### 3. Create barrel export (`index.ts`)

```ts
export { Divider } from "./Divider";
export type { DividerProps } from "./Divider";
```

### 4. Register in global index

Open `src/components/index.ts` and add:

```ts
export { Divider } from "./Divider";
export type { DividerProps } from "./Divider";
```

### 5. Write stories (`Divider.stories.tsx`)

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",    // category/name in Storybook sidebar
  component: Divider,
  tags: ["autodocs"],              // auto-generates docs page
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  decorators: [(Story) => <div style={{ height: 100 }}><Story /></div>],
};
```

### 6. Verify

```bash
npm run typecheck       # check types
npm run storybook       # view in Storybook
```

---

## How to Change Colors

### Option A: Edit Tailwind classes directly in components

Just change the class names:

```diff
- "bg-blue-600 text-white"
+ "bg-indigo-600 text-white"
```

### Option B: Edit the documented color palette

1. Open `src/tokens/colors.ts`
2. Change/add swatches in the arrays:

```ts
export const brandColors: ColorGroup = {
  name: "Brand",
  description: "Primary brand colors",
  swatches: [
    { name: "brand-500", value: "#6366f1", textColor: "white" },  // changed
    // ...
  ],
};
```

3. The Storybook "Design Tokens → Colors" page updates automatically.

### Option C: Register custom Tailwind colors

Open `src/styles/globals.css` and add custom colors via `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
}
```

Now you can use `bg-brand-500`, `text-brand-600` etc. in any component.

---

## How to Change Typography

1. Open `src/tokens/typography.ts`
2. Edit the `typographyScale` array — change sizes, weights, or add new styles
3. The Storybook "Design Tokens → Typography" page updates automatically
4. In components, use the Tailwind classes listed in `tailwindClass` field

To add a custom font:

```css
/* src/styles/globals.css */
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

---

## Story Structure

Every story file follows this pattern:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MyComponent } from "./MyComponent";

// Meta — component metadata for Storybook
const meta: Meta<typeof MyComponent> = {
  title: "Components/MyComponent",   // sidebar path
  component: MyComponent,            // for auto-generated controls
  tags: ["autodocs"],                 // auto-generates docs page
  argTypes: {                         // customize controls (optional)
    variant: {
      control: "select",
      options: ["a", "b", "c"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

// Each export = one story in the sidebar
export const Default: Story = {
  args: {                             // pass props here
    children: "Hello",
  },
};

// Render function for complex scenarios
export const Complex: Story = {
  render: () => (
    <div>
      <MyComponent variant="a">One</MyComponent>
      <MyComponent variant="b">Two</MyComponent>
    </div>
  ),
};
```

---

## Workflow Summary

| Task                        | What to edit                                  |
| --------------------------- | --------------------------------------------- |
| Change component look       | `src/components/<Name>/<Name>.tsx`             |
| Change component stories    | `src/components/<Name>/<Name>.stories.tsx`     |
| Add new component           | New folder in `src/components/` + update index |
| Change colors               | `src/tokens/colors.ts` or classes in TSX       |
| Change typography           | `src/tokens/typography.ts`                     |
| Add custom Tailwind tokens  | `src/styles/globals.css` via `@theme`          |
| Add Storybook docs page     | New file in `src/docs/*.stories.tsx`           |
