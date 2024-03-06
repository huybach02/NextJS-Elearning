import {Button} from "@/components/ui/button";
import {db} from "@/lib/db";
import {formatPrice} from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import {redirect} from "next/navigation";
import React from "react";

type Props = {};

const CourseIdPage = async ({params}: {params: {courseId: string}}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {isPublished: true},
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="w-full p-5 flex flex-col gap-5">
        <Image
          src={course.imageUrl!}
          alt="image"
          className="w-full rounded-md"
          width={500}
          height={300}
        />
        <span className="flex justify-center p-5 border border-primary rounded-md text-2xl font-semibold text-red-400">
          {formatPrice(Number(course.price))}
        </span>
        <Button>
          <Link
            href={`/courses/${course.id}/chapters/${course.chapters[0].id}`}
          >
            Learn now
          </Link>
        </Button>
      </div>
      <div className="col-span-2 w-full">
        <div className="w-full p-5 md:pr-10">
          <h1 className="text-3xl font-bold text-primary">{course.title}</h1>
          <div className="flex flex-col gap-3 mt-5">
            <span className="text-xl font-semibold text-primary">
              Description:
            </span>
            <p className="text-justify">{course.description}</p>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <span className="text-xl font-semibold text-primary">
              Course content:
            </span>
            <span>
              {course.chapters.length}{" "}
              {course.chapters.length <= 1 ? "chapter" : "chapters"}
            </span>
            <div>
              {course.chapters.map((chapter) => (
                <Link
                  href={`/courses/${course.id}/chapters/${chapter.id}`}
                  key={chapter.id}
                  className="flex items-center gap-2 font-semibold p-3 bg-stone-200 mb-2 rounded-md border shadow-md hover:text-primary"
                >
                  <span>{chapter.position}.</span>
                  <p>{chapter.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
