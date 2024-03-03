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
import {Loader2, PlusCircle} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";
import {Chapter, Course} from "@prisma/client";
import ChapterList from "./ChapterList";

type Props = {
  initialData: Course & {chapters: Chapter[]};
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1, {
    message: "This field cannot be empty",
  }),
});

const ChapterForm = ({initialData, courseId}: Props) => {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const {isSubmitting, isValid} = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter updated");
      router.refresh();
      toggleCreating();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function onReorder(updateData: {id: string; position: number}[]) {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  const toggleCreating = () => {
    setIsCreating(!isCreating);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 p-4 rounded-md">
      {isUpdating && (
        <div className="absolute inset-0 bg-slate-300/90 rounded-md flex flex-col gap-2 items-center justify-center text-primary">
          <Loader2 className="w-10 h-10 animate-spin " />
          Updating...
        </div>
      )}
      <div className="font-semibold flex items-center justify-between">
        Chapters Of Course
        <Button
          variant={isCreating ? "destructive" : "default"}
          onClick={toggleCreating}
        >
          {isCreating ? (
            <span>Cancel</span>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
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
                      placeholder="Enter name of chapter"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    You can change this chapter name every time.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <p
          className={cn(
            "mt-5",
            !initialData.chapters.length &&
              "p-3 bg-slate-200 rounded-md italic text-sm text-red-400"
          )}
        >
          {!initialData.chapters.length && "No chapter here"}
          <ChapterList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </p>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-5">
          *** Drag and drop to reorder the chapters list
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
