"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import {Button} from "@/components/ui/button";
import {useConfettiStore} from "@/hooks/useConfettiStore";
import axios from "axios";
import {CheckCircle, Lock, Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import toast from "react-hot-toast";

type Props = {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

const CourseActions = ({disabled, courseId, isPublished}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher/courses`);
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
        await axios.put(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.put(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        confetti.onOpen();
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

export default CourseActions;
