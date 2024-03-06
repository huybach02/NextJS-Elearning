import Image from "next/image";
import Link from "next/link";
import React from "react";
import {IconBadge} from "./IconBadge";
import {BookOpenText, LibraryBig} from "lucide-react";
import {formatPrice} from "@/lib/format";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number;
  category: string;
};

const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: Props) => {
  return (
    <div>
      <Link href={`/courses/${id}`}>
        <div className="group shadow-md hover:shadow-xl transition-all overflow-hidden border rounded-md p-3 h-full">
          <div className="relative w-full aspect-video rounded-none">
            <Image
              src={imageUrl}
              alt="image"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="h-full flex flex-col gap-2">
            <div className="text-lg font-semibold group-hover:text-primary text-sky-500 transition-all line-clamp-2 mt-3 h-[60px]">
              {title}
            </div>
            <p className="px-4 py-1 rounded-full text-xs bg-slate-200 w-fit">
              {category}
            </p>
            <div className="my-2 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-3 text-primary">
                <IconBadge icon={BookOpenText} size={"sm"} />
                <span>
                  {chaptersLength}{" "}
                  {chaptersLength === 1 ? "Chapter" : "Chapters"}
                </span>
              </div>
            </div>
            {progress !== null ? (
              <div>Progress</div>
            ) : (
              <p className="border border-primary rounded-md px-5 py-2 w-fit font-semibold text-red-400">
                {formatPrice(price)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
