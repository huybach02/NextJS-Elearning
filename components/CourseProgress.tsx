import React from "react";
import {Progress} from "./ui/progress";
import {cn} from "@/lib/utils";

type Props = {
  variant?: "default" | "success";
  value: number;
  size?: "default" | "sm";
};

const colorByVariant = {
  default: "text-sky-700",
  success: "text-green-700",
};
const sizeByVariant = {
  default: "text-md",
  sm: "text-sm",
};

const CourseProgress = ({value, variant, size}: Props) => {
  return (
    <div>
      <Progress value={value} variant={variant} className="h-2" />
      <p
        className={cn(
          "text-sm flex justify-end mt-3",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Completed
      </p>
    </div>
  );
};

export default CourseProgress;
