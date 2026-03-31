/**
 * Design tokens: Typography Scale
 *
 * Single source of truth for font sizes, weights, and line heights.
 * These map 1:1 to Tailwind utility classes.
 *
 * To add a new text style:
 * 1. Add it to the `typographyScale` array below
 * 2. The Storybook docs page will render it automatically
 * 3. Use the corresponding Tailwind classes in components
 */

export interface TypeStyle {
  name: string;
  tailwindClass: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  description: string;
}

export const typographyScale: TypeStyle[] = [
  {
    name: "Display",
    tailwindClass: "text-5xl font-bold",
    fontSize: "3rem (48px)",
    lineHeight: "1",
    fontWeight: "700 (bold)",
    description: "Hero sections, landing pages",
  },
  {
    name: "Heading 1",
    tailwindClass: "text-4xl font-bold",
    fontSize: "2.25rem (36px)",
    lineHeight: "2.5rem",
    fontWeight: "700 (bold)",
    description: "Page titles",
  },
  {
    name: "Heading 2",
    tailwindClass: "text-3xl font-semibold",
    fontSize: "1.875rem (30px)",
    lineHeight: "2.25rem",
    fontWeight: "600 (semibold)",
    description: "Section headings",
  },
  {
    name: "Heading 3",
    tailwindClass: "text-2xl font-semibold",
    fontSize: "1.5rem (24px)",
    lineHeight: "2rem",
    fontWeight: "600 (semibold)",
    description: "Subsections, card titles",
  },
  {
    name: "Heading 4",
    tailwindClass: "text-xl font-medium",
    fontSize: "1.25rem (20px)",
    lineHeight: "1.75rem",
    fontWeight: "500 (medium)",
    description: "Small headings, dialog titles",
  },
  {
    name: "Body Large",
    tailwindClass: "text-lg font-normal",
    fontSize: "1.125rem (18px)",
    lineHeight: "1.75rem",
    fontWeight: "400 (normal)",
    description: "Introductory paragraphs, lead text",
  },
  {
    name: "Body",
    tailwindClass: "text-base font-normal",
    fontSize: "1rem (16px)",
    lineHeight: "1.5rem",
    fontWeight: "400 (normal)",
    description: "Default body text",
  },
  {
    name: "Body Small",
    tailwindClass: "text-sm font-normal",
    fontSize: "0.875rem (14px)",
    lineHeight: "1.25rem",
    fontWeight: "400 (normal)",
    description: "Secondary text, descriptions",
  },
  {
    name: "Caption",
    tailwindClass: "text-xs font-normal",
    fontSize: "0.75rem (12px)",
    lineHeight: "1rem",
    fontWeight: "400 (normal)",
    description: "Labels, timestamps, fine print",
  },
  {
    name: "Overline",
    tailwindClass: "text-xs font-semibold uppercase tracking-wider",
    fontSize: "0.75rem (12px)",
    lineHeight: "1rem",
    fontWeight: "600 (semibold)",
    description: "Category labels, section markers",
  },
];

export const fontFamilies = {
  sans: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
};
