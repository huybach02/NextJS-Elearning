import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import SidebarRoutes from "./SidebarRoutes";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="h-full border-r flex flex-col gap-5 overflow-y-auto bg-white shadow-md">
      <Link href={"/"} className="p-4">
        <Logo />
      </Link>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
