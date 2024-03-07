"use client";

import {Button} from "@/components/ui/button";
import {useConfettiStore} from "@/hooks/useConfettiStore";
import {cn} from "@/lib/utils";
import axios from "axios";
import {CheckCircle, X} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import toast from "react-hot-toast";

type Props = {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
};

const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: Props) => {
  const router = useRouter();
  const confetti = useConfettiStore();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {isCompleted: !isCompleted}
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
        router.refresh();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Updated Progress");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        className={cn(
          "flex items-center gap-2 bg-green-600 hover:bg-green-600/90",
          isCompleted && "bg-red-500 hover:bg-red-400"
        )}
        onClick={onClick}
      >
        {isCompleted ? <X /> : <CheckCircle />}
        {isCompleted ? "Not Completed" : "Mark As Complete"}
      </Button>
    </div>
  );
};

export default CourseProgressButton;
