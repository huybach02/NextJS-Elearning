"use client";

import {LucideIcon} from "lucide-react";
import React from "react";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const SidebarItem = ({icon: Icon, label, href}: Props) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive =
    (pathName === "/" && href === "/") ||
    pathName === href ||
    pathName?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-2 text-lg font-bold transition-all hover:bg-slate-100 text-slate-500",
        isActive && "bg-slate-300 hover:bg-slate-300 text-main"
      )}
    >
      <div className="flex items-center gap-2 p-5">
        <Icon />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      ></div>
    </button>
  );
};

export default SidebarItem;
