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

function SelectControl({
  prop,
  value,
  onChange,
}: {
  prop: PropertyDef;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {prop.options?.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={clsx(
            "px-2.5 py-1 text-[11px] font-medium rounded-md border transition-all cursor-pointer",
            value === opt.value
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function BooleanControl({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={clsx(
        "relative w-9 h-5 rounded-full transition-colors cursor-pointer",
        value ? "bg-blue-600" : "bg-gray-300"
      )}
    >
      <span
        className={clsx(
          "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
          value && "translate-x-4"
        )}
      />
    </button>
  );
}

function TextControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2.5 py-1.5 text-[12px] border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
    />
  );
}

function NumberControl({
  prop,
  value,
  onChange,
}: {
  prop: PropertyDef;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      value={value}
      min={prop.min}
      max={prop.max}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-20 px-2.5 py-1.5 text-[12px] border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
    />
  );
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  componentName,
  properties,
  values,
  onChange,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/80">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Properties
        </h3>
        <p className="text-sm font-semibold text-gray-900 mt-0.5">
          {componentName}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {properties.map((prop) => (
            <div key={prop.key}>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                {prop.label}
              </label>
              {prop.type === "select" && (
                <SelectControl
                  prop={prop}
                  value={values[prop.key] as string}
                  onChange={(v) => onChange(prop.key, v)}
                />
              )}
              {prop.type === "boolean" && (
                <BooleanControl
                  value={values[prop.key] as boolean}
                  onChange={(v) => onChange(prop.key, v)}
                />
              )}
              {prop.type === "text" && (
                <TextControl
                  value={values[prop.key] as string}
                  onChange={(v) => onChange(prop.key, v)}
                />
              )}
              {prop.type === "number" && (
                <NumberControl
                  prop={prop}
                  value={values[prop.key] as number}
                  onChange={(v) => onChange(prop.key, v)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
