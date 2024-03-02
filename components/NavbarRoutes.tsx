"use client";

import {UserButton} from "@clerk/nextjs";
import {usePathname, useRouter} from "next/navigation";
import React from "react";
import {Button} from "./ui/button";
import {LogOut} from "lucide-react";
import Link from "next/link";

type Props = {};

const NavbarRoutes = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href={"/"}>
          <Button className="mr-5 bg-slate-500 hover:bg-slate-500/90">
            <LogOut className="w-4 h-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href={"/teacher/courses"}>
          <Button className="mr-5">Teacher mode</Button>
        </Link>
      )}

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;