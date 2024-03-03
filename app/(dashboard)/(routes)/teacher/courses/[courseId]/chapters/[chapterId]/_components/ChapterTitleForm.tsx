"use client";

import React, {useState} from "react";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SquarePen} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Course} from "@prisma/client";

type Props = {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "This field cannot be empty",
  }),
});

const ChapterTitleForm = ({initialData, courseId, chapterId}: Props) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
    },
  });

  const {isSubmitting, isValid} = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Title updated");
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
        Title Of Chapter
        <Button
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <span>Cancel</span>
          ) : (
            <>
              <SquarePen className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="p-3 bg-slate-200 rounded-md mt-5">{initialData.title}</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your title"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    You can change this title every time.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterTitleForm;
