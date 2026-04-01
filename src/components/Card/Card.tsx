import React from "react";
import { clsx } from "clsx";

export interface CardProps {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  hoverable?: boolean;
  className?: string;
}

const paddingClasses = { none: "", sm: "p-3", md: "p-5", lg: "p-8" };

export const Card: React.FC<CardProps> = ({
  children,
  padding = "md",
  shadow = "sm",
  border = true,
  hoverable = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-white/25 backdrop-blur-xl",
        paddingClasses[padding],
        shadow !== "none" && "glass-inner-shadow",
        border && "border border-white/30",
        hoverable && "transition-all duration-300 hover:bg-white/35 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_8px_32px_-8px_rgba(0,0,0,0.2)] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps { children: React.ReactNode; className?: string; }
export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={clsx("border-b border-white/20 px-5 py-4 font-semibold text-white", className)}>
    {children}
  </div>
);

export interface CardBodyProps { children: React.ReactNode; className?: string; }
export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => (
  <div className={clsx("px-5 py-4", className)}>{children}</div>
);

export interface CardFooterProps { children: React.ReactNode; className?: string; }
export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={clsx("border-t border-white/20 px-5 py-4 flex items-center gap-3", className)}>
    {children}
  </div>
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardBody.displayName = "CardBody";
CardFooter.displayName = "CardFooter";
