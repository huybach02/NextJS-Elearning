"use client";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Sparkles} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React from "react";
import qs from "query-string";

type Props = {
  label: string;
  value?: string;
};

const CategoryItem = ({label, value}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      {skipNull: true, skipEmptyString: true}
    );
    router.push(url);
  };

  return (
    <div>
      <Button
        variant={"outline"}
        className={cn(
          "flex items-center gap-3 text-primary transition-all hover:text-primary",
          isSelected && "bg-teal-100 border-primary hover:bg-teal-100"
        )}
        onClick={onClick}
      >
        <Sparkles />
        <div>{label}</div>
      </Button>
    </div>
  );
};

export default CategoryItem;
