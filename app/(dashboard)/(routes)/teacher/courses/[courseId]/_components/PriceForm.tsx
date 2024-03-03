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
import {cn} from "@/lib/utils";
import {Course} from "@prisma/client";
import {formatPrice} from "@/lib/format";

type Props = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  price: z.coerce.number(),
});

const PriceForm = ({initialData, courseId}: Props) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || undefined,
    },
  });

  const {isSubmitting, isValid} = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/courses/${courseId}`, values);
      toast.success("Price updated");
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
        Price Of Course ($)
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
        <p
          className={cn(
            "mt-5",
            !initialData.price &&
              "p-3 bg-slate-200 rounded-md italic text-sm text-red-400"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No price here"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Enter your price"
                      {...field}
                      step={"0.01"}
                    />
                  </FormControl>
                  <FormDescription>
                    You can change this price every time.
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

export default PriceForm;
