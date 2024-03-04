import {Button} from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {DataTable} from "./_components/data-table";
import {columns} from "./_components/columns";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";

type Props = {};

const Courses = async (props: Props) => {
  const {userId} = auth();

  if (!userId) {
    redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 flex flex-col gap-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default Courses;
