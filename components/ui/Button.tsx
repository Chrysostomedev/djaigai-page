"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, forwardRef } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════
   Button — Composant bouton Djaigai
   Variantes : primary, secondary, outline, ghost
   Tailles   : sm, md, lg
   Supporte onClick et href (Next.js Link)
   ═══════════════════════════════════════════════════════ */

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20 hover:shadow-green-500/40",
  secondary:
    "bg-navy-500 text-white hover:bg-navy-600 shadow-lg shadow-navy-500/20 hover:shadow-navy-500/40",
  outline:
    "bg-transparent border-2 border-navy-500 text-navy-500 hover:bg-navy-500 hover:text-white",
  ghost:
    "bg-transparent text-navy-600 hover:bg-navy-50 hover:text-navy-800",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-base rounded-xl gap-2",
  lg: "px-8 py-4 text-lg rounded-2xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    children,
    icon,
    iconPosition = "left",
    loading = false,
    fullWidth = false,
    className = "",
    disabled,
    href,
    ...props
  },
  ref
) {
  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  const baseClasses = `
    inline-flex items-center justify-center font-semibold
    transition-all duration-300 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled || loading}
      className={baseClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
});
