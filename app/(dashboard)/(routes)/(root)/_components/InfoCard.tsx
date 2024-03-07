import {IconBadge} from "@/components/IconBadge";
import {Category, Chapter, Course} from "@prisma/client";
import {LucideIcon} from "lucide-react";
import React from "react";

type Props = {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: "default" | "success";
};

const InfoCard = ({icon, label, numberOfItems, variant}: Props) => {
  return (
    <div className="flex items-center gap-5">
      <IconBadge icon={icon} variant={variant} />
      <div>
        <p className="font-semibold text-2xl text-primary">{label}</p>
        <p>
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
