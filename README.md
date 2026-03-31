# UIKit

A modern React UI component library with Storybook documentation.

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4** for styling
- **Vite** as build tool
- **Storybook 10** for component documentation

## Components

| Component    | Description                              |
| ------------ | ---------------------------------------- |
| `Button`     | Primary action buttons with variants     |
| `Input`      | Text input with labels, hints, errors    |
| `Textarea`   | Multi-line text input                    |
| `Checkbox`   | Checkbox with label and description      |
| `Select`     | Dropdown select with options             |
| `Toggle`     | On/off switch control                    |
| `Badge`      | Status labels and tags                   |
| `Avatar`     | User avatar with image/initials fallback |
| `Alert`      | Contextual notification messages         |
| `Card`       | Content container with sections          |
| `Modal`      | Dialog overlay with backdrop             |
| `Tabs`       | Tabbed navigation (3 variants)           |
| `Tooltip`    | Hover tooltip (4 positions)              |
| `Spinner`    | Loading indicator                        |

## Getting Started

```bash
npm install
```

### Run Storybook

```bash
npm run storybook
```

Storybook will start at [http://localhost:6006](http://localhost:6006).

### Type Check

```bash
npm run typecheck
```

## Usage

```tsx
import { Button, Input, Card, Badge } from './src/components';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Submit</Button>
      <Badge variant="success">Active</Badge>
    </Card>
  );
}
```
