import React from "react";
import { clsx } from "clsx";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
  xl: "h-16 w-16 text-xl",
};

const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = "md",
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={alt || name || "Avatar"}
        onError={() => setImgError(true)}
        className={clsx(
          "inline-block rounded-full object-cover ring-2 ring-white",
          sizeClasses[size],
          className
        )}
      />
    );
  }

  if (name) {
    return (
      <span
        className={clsx(
          "inline-flex items-center justify-center rounded-full font-medium text-white ring-2 ring-white",
          sizeClasses[size],
          getColorFromName(name),
          className
        )}
      >
        {getInitials(name)}
      </span>
    );
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full bg-gray-300 ring-2 ring-white",
        sizeClasses[size],
        className
      )}
    >
      <svg className="h-1/2 w-1/2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
};

Avatar.displayName = "Avatar";
