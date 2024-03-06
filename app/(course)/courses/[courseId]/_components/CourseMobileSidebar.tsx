import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import React from "react";
import CourseSidebar from "./CourseSidebar";
import {Chapter, Course, UserProgress} from "@prisma/client";

type Props = {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

const CourseMobileSidebar = ({course, progressCount}: Props) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden flex items-center">
          <Menu />
        </SheetTrigger>
        <SheetContent className="p-0">
          <CourseSidebar course={course} progressCount={progressCount} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CourseMobileSidebar;
