"use client";

import React, {useState} from "react";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {ImageIcon, PlusCircle, SquarePen} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Course} from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";

type Props = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(2, {
    message: "This field cannot be empty",
  }),
});

const ImageForm = ({initialData, courseId}: Props) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/courses/${courseId}`, values);
      toast.success("Thumbnail updated");
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
        Thumbnail Of Course
        <Button
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing && <span>Cancel</span>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <SquarePen className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-5">
            <ImageIcon className="h-10 w-10 text-primary" />
          </div>
        ) : (
          <div className="relative aspect-video mt-5">
            <Image
              src={initialData.imageUrl}
              alt="upload"
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      {isEditing && (
        <div className="mt-5">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({imageUrl: url});
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            *** 16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
