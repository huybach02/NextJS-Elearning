import {getChapter} from "@/actions/get-chapter";
import {Banner} from "@/components/Banner";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import React from "react";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import {Separator} from "@/components/ui/separator";
import Preview from "@/components/Preview";
import {File} from "lucide-react";
import CourseProgressButton from "./_components/CourseProgressButton";

type Props = {};

const ChapterIdPage = async ({
  params,
}: {
  params: {courseId: string; chapterId: string};
}) => {
  const {userId} = auth();

  if (!userId) {
    redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const notComplete = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          label="You already completed this chapter"
          variant={"success"}
        />
      )}
      {isLocked && (
        <Banner
          label="You need to buy this course to watch this chapter"
          variant={"warning"}
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapter.id}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            notComplete={notComplete}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-10">
          <h2 className="text-2xl font-semibold mb-2 text-primary">
            {chapter.title}
          </h2>
          {purchase ? (
            <div>
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            </div>
          ) : (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price}
            />
          )}
        </div>
        <Separator />
        <div className="my-3">
          <Preview value={chapter.description!} />
        </div>
        {!!attachments.length && (
          <>
            <Separator />
            <div className="">
              {attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  key={attachment.id}
                  target="_blank"
                  className="flex items-center p-3 w-full bg-slate-200 border hover:underline"
                >
                  <File />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;
