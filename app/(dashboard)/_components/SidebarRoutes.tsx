"use client";

import {Search, LayoutDashboard, List, BarChart3} from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";
import {usePathname} from "next/navigation";

type Props = {};

const guestRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Search,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart3,
    label: "Analysts",
    href: "/teacher/analysts",
  },
];

const SidebarRoutes = (props: Props) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full gap-5">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
