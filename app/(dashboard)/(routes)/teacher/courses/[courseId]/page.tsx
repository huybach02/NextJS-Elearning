import {IconBadge} from "@/components/IconBadge";
import {db} from "@/lib/db";
import {cn} from "@/lib/utils";
import {auth} from "@clerk/nextjs";
import {Bolt, DollarSign, FolderCog, ListChecks} from "lucide-react";
import {redirect} from "next/navigation";
import React from "react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachmentForm from "./_components/AttachmentForm";
import ChapterForm from "./_components/ChapterForm";

const CourseIdPage = async ({
  params: {courseId},
}: {
  params: {courseId: string};
}) => {
  const {userId} = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Course Setting</h1>
          <span
            className={cn(
              "p-3 bg-teal-300 rounded-md text-green-700 shadow-md mt-5",
              completedFields < totalFields && "bg-red-300 text-red-700"
            )}
          >
            Completed Fields: ({completionText})
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div>
          <div className="flex items-center gap-2">
            <IconBadge icon={Bolt} />
            <h2 className="text-xl font-semibold">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <ImageForm initialData={course} courseId={course.id} />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl font-semibold">Course chapters</h2>
            </div>
            <ChapterForm initialData={course} courseId={course.id} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <IconBadge icon={DollarSign} />
              <h2 className="text-xl font-semibold">Sell your course</h2>
            </div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <IconBadge icon={FolderCog} />
              <h2 className="text-xl font-semibold">Resources & Attachments</h2>
            </div>
            <AttachmentForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
