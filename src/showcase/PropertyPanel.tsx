import React from "react";
import { clsx } from "clsx";

export interface PropertyDef {
  key: string;
  label: string;
  type: "select" | "boolean" | "text" | "number" | "color";
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
}

interface PropertyPanelProps {
  componentName: string;
  properties: PropertyDef[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

function SelectControl({ prop, value, onChange }: { prop: PropertyDef; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1">
      {prop.options?.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={clsx(
            "px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all cursor-pointer",
            value === opt.value
              ? "bg-white/30 text-white border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
              : "bg-transparent text-white/50 border-white/15 hover:border-white/30 hover:text-white/70"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function BooleanControl({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={clsx(
        "relative w-9 h-5 rounded-full transition-all cursor-pointer",
        value ? "bg-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" : "bg-white/15"
      )}
    >
      <span className={clsx("absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-transform", value && "translate-x-4")} />
    </button>
  );
}

function TextControl({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2.5 py-1.5 text-[12px] border border-white/15 rounded-lg bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 text-white placeholder-white/30"
    />
  );
}

function NumberControl({ prop, value, onChange }: { prop: PropertyDef; value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      value={value}
      min={prop.min}
      max={prop.max}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-20 px-2.5 py-1.5 text-[12px] border border-white/15 rounded-lg bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-white/30 text-white"
    />
  );
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ componentName, properties, values, onChange }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-white/15">
        <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-wider">Properties</h3>
        <p className="text-sm font-semibold text-white mt-0.5">{componentName}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {properties.map((prop) => (
            <div key={prop.key}>
              <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">{prop.label}</label>
              {prop.type === "select" && <SelectControl prop={prop} value={values[prop.key] as string} onChange={(v) => onChange(prop.key, v)} />}
              {prop.type === "boolean" && <BooleanControl value={values[prop.key] as boolean} onChange={(v) => onChange(prop.key, v)} />}
              {prop.type === "text" && <TextControl value={values[prop.key] as string} onChange={(v) => onChange(prop.key, v)} />}
              {prop.type === "number" && <NumberControl prop={prop} value={values[prop.key] as number} onChange={(v) => onChange(prop.key, v)} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
