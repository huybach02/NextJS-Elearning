"use client";

import React, {useState} from "react";
import MuxPlayer from "@mux/mux-player-react";
import {Loader2, Lock} from "lucide-react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {useConfettiStore} from "@/hooks/useConfettiStore";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  notComplete: boolean;
};

const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  notComplete,
}: Props) => {
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();
  const confetti = useConfettiStore();

  const [isLoading, setIsLoading] = useState(false);

  const onEnd = async () => {
    try {
      setIsLoading(true);

      if (notComplete) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {isCompleted: true}
        );
      }

      if (!nextChapterId) {
        confetti.onOpen();
        router.refresh();
      }

      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Chapter completed");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-300">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-300 flex-col gap-3 text-red-500">
          <Lock className="w-8 h-8" />
          This chapter is locked. Let buy this course to unlock this chapter.
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
