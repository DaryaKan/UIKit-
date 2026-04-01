import React, { useEffect, useCallback } from "react";
import { clsx } from "clsx";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlay?: boolean;
  footer?: React.ReactNode;
}

const sizeClasses = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-xl" };

export const Modal: React.FC<ModalProps> = ({
  isOpen, onClose, title, children, size = "md", closeOnOverlay = true, footer,
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md" onClick={closeOnOverlay ? onClose : undefined} />
      <div
        className={clsx(
          "relative z-10 w-full rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/40 glass-glow",
          sizeClasses[size]
        )}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="flex items-center justify-between border-b border-white/20 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-1.5 text-white/50 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="px-6 py-4 text-white/80">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-white/20 px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = "Modal";
