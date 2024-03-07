"use client";

import {IconBadge} from "@/components/IconBadge";
import {cn} from "@/lib/utils";
import {CheckCircle, Lock, PlayCircle} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import React from "react";

type Props = {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
};

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-slate-100 mb-2 hover:bg-slate-200/80 text-primary flex items-center",
        isActive && "bg-slate-300/70 hover:bg-slate-300/70",
        isCompleted && "bg-green-100/70 hover:bg-green-300/40",
        isLocked && "text-red-400",
        isActive && isCompleted && "bg-green-300/80"
      )}
    >
      <div className="flex items-center gap-2 p-4">
        <div className={cn("text-primary")}>
          {isLocked ? (
            <Lock className="text-red-400" />
          ) : isCompleted ? (
            <CheckCircle className="text-teal-500" />
          ) : (
            <PlayCircle className="" />
          )}
        </div>
        <p className="font-semibold line-clamp-2">{label}</p>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-r-4 border-sky-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-teal-700"
        )}
      ></div>
    </button>
  );
};

export default CourseSidebarItem;
