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

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

const shadowClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

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
        "rounded-xl bg-white",
        paddingClasses[padding],
        shadowClasses[shadow],
        border && "border border-gray-200",
        hoverable &&
          "transition-shadow duration-200 hover:shadow-lg cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      "border-b border-gray-200 px-5 py-4 font-semibold text-gray-900",
      className
    )}
  >
    {children}
  </div>
);

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => (
  <div className={clsx("px-5 py-4", className)}>{children}</div>
);

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      "border-t border-gray-200 px-5 py-4 flex items-center gap-3",
      className
    )}
  >
    {children}
  </div>
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardBody.displayName = "CardBody";
CardFooter.displayName = "CardFooter";
