# UIKit

A modern React UI component library with Storybook documentation and a live demo page.

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

### Run Storybook (interactive component explorer)

```bash
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006).

### Run Demo App

```bash
npm run dev
```

Opens a demo page showcasing all components with live examples.

### Build for Production

```bash
npm run build              # Build demo app → dist/
npm run build-storybook    # Build Storybook → storybook-static/
```

## Deployment

The project includes a **GitHub Actions** workflow (`.github/workflows/deploy.yml`) that automatically deploys Storybook to **GitHub Pages** on every push to `main`.

### Enable GitHub Pages

1. Go to your repo **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the workflow will build and deploy automatically
4. Your Storybook will be available at `https://<username>.github.io/<repo>/`

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
