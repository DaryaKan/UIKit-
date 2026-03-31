/**
 * Design tokens: Color Palette
 *
 * This is the single source of truth for all colors in the UIKit.
 * When you need to add or change a color, edit this file —
 * Storybook docs and components will pick it up automatically.
 *
 * Tailwind CSS v4 uses CSS-native colors, so these tokens are
 * primarily for documentation and JS-level access. In components,
 * continue using Tailwind classes (e.g. `bg-brand-500`, `text-neutral-700`).
 *
 * To register custom colors in Tailwind, add them in globals.css
 * via @theme — see src/styles/globals.css for an example.
 */

export interface ColorSwatch {
  name: string;
  value: string;
  textColor?: "white" | "black";
}

export interface ColorGroup {
  name: string;
  description: string;
  swatches: ColorSwatch[];
}

export const brandColors: ColorGroup = {
  name: "Brand",
  description: "Primary brand colors used for buttons, links, and accents.",
  swatches: [
    { name: "brand-50", value: "#eff6ff", textColor: "black" },
    { name: "brand-100", value: "#dbeafe", textColor: "black" },
    { name: "brand-200", value: "#bfdbfe", textColor: "black" },
    { name: "brand-300", value: "#93c5fd", textColor: "black" },
    { name: "brand-400", value: "#60a5fa", textColor: "black" },
    { name: "brand-500", value: "#3b82f6", textColor: "white" },
    { name: "brand-600", value: "#2563eb", textColor: "white" },
    { name: "brand-700", value: "#1d4ed8", textColor: "white" },
    { name: "brand-800", value: "#1e40af", textColor: "white" },
    { name: "brand-900", value: "#1e3a8a", textColor: "white" },
  ],
};

export const neutralColors: ColorGroup = {
  name: "Neutral",
  description: "Grays for text, backgrounds, borders, and subtle UI.",
  swatches: [
    { name: "neutral-50", value: "#f9fafb", textColor: "black" },
    { name: "neutral-100", value: "#f3f4f6", textColor: "black" },
    { name: "neutral-200", value: "#e5e7eb", textColor: "black" },
    { name: "neutral-300", value: "#d1d5db", textColor: "black" },
    { name: "neutral-400", value: "#9ca3af", textColor: "black" },
    { name: "neutral-500", value: "#6b7280", textColor: "white" },
    { name: "neutral-600", value: "#4b5563", textColor: "white" },
    { name: "neutral-700", value: "#374151", textColor: "white" },
    { name: "neutral-800", value: "#1f2937", textColor: "white" },
    { name: "neutral-900", value: "#111827", textColor: "white" },
  ],
};

export const semanticColors: ColorGroup = {
  name: "Semantic",
  description: "Colors with meaning — success, warning, error, info.",
  swatches: [
    { name: "success-50", value: "#f0fdf4", textColor: "black" },
    { name: "success-500", value: "#22c55e", textColor: "white" },
    { name: "success-700", value: "#15803d", textColor: "white" },
    { name: "warning-50", value: "#fffbeb", textColor: "black" },
    { name: "warning-500", value: "#f59e0b", textColor: "black" },
    { name: "warning-700", value: "#b45309", textColor: "white" },
    { name: "error-50", value: "#fef2f2", textColor: "black" },
    { name: "error-500", value: "#ef4444", textColor: "white" },
    { name: "error-700", value: "#b91c1c", textColor: "white" },
    { name: "info-50", value: "#f0f9ff", textColor: "black" },
    { name: "info-500", value: "#0ea5e9", textColor: "white" },
    { name: "info-700", value: "#0369a1", textColor: "white" },
  ],
};

export const allColorGroups: ColorGroup[] = [
  brandColors,
  neutralColors,
  semanticColors,
];
