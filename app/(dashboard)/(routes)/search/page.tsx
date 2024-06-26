import {db} from "@/lib/db";
import React from "react";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import {getCourses} from "@/actions/get-courses";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import CoursesList from "@/components/CoursesList";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {title: string; categoryId: string};
}) => {
  const {userId} = auth();

  if (!userId) {
    redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-5">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
