import {IconBadge} from "@/components/IconBadge";
import {db} from "@/lib/db";
import {cn} from "@/lib/utils";
import {auth} from "@clerk/nextjs";
import {Bolt, ChevronsLeft} from "lucide-react";
import Link from "next/link";
import {redirect} from "next/navigation";
import React from "react";
import ChapterTitleForm from "./_components/ChapterTitleForm";

const ChapterIdPage = async ({
  params,
}: {
  params: {courseId: string; chapterId: string};
}) => {
  const {userId} = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${params.courseId}`}
            className="flex items-center gap-2 text-sm hover:text-primary mb-5"
          >
            <ChevronsLeft className="h-4 w-4" />
            Back to course setting
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold">Chapter Setting</h1>
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
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <IconBadge icon={Bolt} />
            <h2 className="text-xl font-semibold">Customize your chapter</h2>
          </div>
          <ChapterTitleForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
