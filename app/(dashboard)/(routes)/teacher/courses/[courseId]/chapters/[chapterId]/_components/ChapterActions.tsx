"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {CheckCircle, Lock, Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import toast from "react-hot-toast";

type Props = {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
};

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("Chapter unpublished");
      } else {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("Chapter published");
      }

      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        size={"lg"}
        className="flex items-center gap-2 bg-sky-500 shadow-lg text-md"
      >
        <span>{isPublished ? <Lock /> : <CheckCircle />}</span>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button
          variant={"destructive"}
          className="shadow-lg"
          disabled={isLoading}
        >
          <Trash2 />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
