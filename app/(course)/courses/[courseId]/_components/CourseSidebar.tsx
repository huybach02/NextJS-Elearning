import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {Chapter, Course, UserProgress} from "@prisma/client";
import {redirect} from "next/navigation";
import React from "react";
import CourseSidebarItem from "./CourseSidebarItem";
import CourseProgress from "@/components/CourseProgress";

type Props = {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

const CourseSidebar = async ({course, progressCount}: Props) => {
  const {userId} = auth();

  if (!userId) {
    redirect("/");
  }

  const purchased = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-md">
      <div className="p-5 py-8 flex flex-col border-b">
        <h1 className="font-semibold text-lg text-primary text-center">
          {course.title}
        </h1>
        {purchased && (
          <div className="mt-7">
            <CourseProgress
              value={progressCount}
              size="sm"
              variant={progressCount === 100 ? "success" : "default"}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchased}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
