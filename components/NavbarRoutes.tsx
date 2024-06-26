"use client";

import {UserButton, useAuth} from "@clerk/nextjs";
import {usePathname, useRouter} from "next/navigation";
import React from "react";
import {Button} from "./ui/button";
import {LogOut} from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import {isTeacher} from "@/lib/teacher";

type Props = {};

const NavbarRoutes = (props: Props) => {
  const {userId} = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href={"/"}>
            <Button className="mr-5 bg-slate-500 hover:bg-slate-500/90">
              <LogOut className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href={"/teacher/courses"}>
            <Button className="mr-5">Teacher mode</Button>
          </Link>
        ) : null}

        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
