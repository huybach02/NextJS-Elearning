import React from "react";
import {LucideIcon} from "lucide-react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const backgroundVariants = cva("rounded-md flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-slate-200",
      success: "bg-teal-200",
    },
    iconVariant: {
      default: "bg-cyan-700",
      success: "bg-teal-700",
    },
    size: {
      default: "p-2",
      sm: "p-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-cyan-600",
      success: "text-teal-600",
    },
    size: {
      default: "h-6 w-6",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({icon: Icon, variant, size}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({variant, size}))}>
      <Icon className={cn(iconVariants({variant, size}))} />
    </div>
  );
};
