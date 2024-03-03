"use client";

import React, {useState} from "react";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {File, ImageIcon, Loader2, PlusCircle, SquarePen, X} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Attachment, Course} from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";

type Props = {
  initialData: Course & {attachments: Attachment[]};
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1, {
    message: "This field cannot be empty",
  }),
});

const AttachmentForm = ({initialData, courseId}: Props) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Attachment updated");
      router.refresh();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 p-4 rounded-md">
      <div className="font-semibold flex items-center justify-between">
        Attachment Of Course
        <Button
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing && <span>Cancel</span>}
          {!isEditing && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="p-3 bg-slate-200 rounded-md italic text-sm text-red-400 mt-5">
              No attachment here
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-3 bg-slate-200 rounded-md text-sm mt-5"
                >
                  <File className="w-5 h-5 mr-2" />
                  <span title={item.name} className="line-clamp-1">
                    {item.name}
                  </span>
                  {deletingId === item.id && (
                    <div>
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  )}
                  {deletingId !== item.id && (
                    <button onClick={() => onDelete(item.id)}>
                      <X className="w-5 h-5 text-red-500 ml-auto" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div className="mt-5">
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({url: url});
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add everything students need to complete this course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
