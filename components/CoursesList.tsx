import {CourseWithProgressWithCategory} from "@/actions/get-courses";
import React from "react";
import CourseCard from "./CourseCard";

type Props = {
  items: CourseWithProgressWithCategory[];
};

const CoursesList = ({items}: Props) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress!}
            category={item.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-muted-foreground mt-28">
          No Course Found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
