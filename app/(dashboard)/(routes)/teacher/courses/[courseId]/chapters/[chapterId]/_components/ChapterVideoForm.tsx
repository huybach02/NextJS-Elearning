"use client";

import React, {useState} from "react";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {ImageIcon, PlusCircle, SquarePen, Video} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Chapter, Course, MuxData} from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";
import MuxPlayer from "@mux/mux-player-react";

type Props = {
  initialData: Chapter & {muxData: MuxData | null};
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "This field cannot be empty",
  }),
});

const ChapterVideoForm = ({initialData, courseId, chapterId}: Props) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Video updated");
      router.refresh();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 p-4 rounded-md">
      <div className="font-semibold flex items-center justify-between">
        Video Of Chapter
        <Button
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing && <span>Cancel</span>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <SquarePen className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-5">
            <Video className="h-10 w-10 text-primary" />
          </div>
        ) : (
          <div className="relative aspect-video mt-5">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div className="mt-5">
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({videoUrl: url});
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            *** Upload this video for this chapter
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-4">
          *** Video can take a few minutes to process. Please refresh page if
          video not appear
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
