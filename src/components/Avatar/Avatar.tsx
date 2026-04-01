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

function getInitials(name: string): string {
  return name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
}

function getGradient(name: string): string {
  const gradients = [
    "from-blue-400/60 to-purple-500/60",
    "from-emerald-400/60 to-cyan-500/60",
    "from-rose-400/60 to-pink-500/60",
    "from-amber-400/60 to-orange-500/60",
    "from-violet-400/60 to-indigo-500/60",
    "from-teal-400/60 to-emerald-500/60",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return gradients[Math.abs(hash) % gradients.length];
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, name, size = "md", className }) => {
  const [imgError, setImgError] = React.useState(false);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={alt || name || "Avatar"}
        onError={() => setImgError(true)}
        className={clsx(
          "inline-block rounded-full object-cover ring-2 ring-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)]",
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
          "inline-flex items-center justify-center rounded-full font-medium text-white ring-2 ring-white/30 bg-gradient-to-br backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_12px_rgba(255,255,255,0.1)]",
          sizeClasses[size],
          getGradient(name),
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
        "inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30",
        sizeClasses[size],
        className
      )}
    >
      <svg className="h-1/2 w-1/2 text-white/50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
};

Avatar.displayName = "Avatar";
