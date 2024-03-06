"use client";

import {Search} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Input} from "./ui/input";
import {useDebounce} from "@/hooks/useDebonce";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import queryString from "query-string";

type Props = {};

const SearchInput = (props: Props) => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debounceValue,
        },
      },
      {skipEmptyString: true, skipNull: true}
    );

    router.push(url);
  }, [debounceValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search className="absolute w-4 h-4 top-1/2 translate-y-[-50%] left-2 text-primary" />
      <Input
        className="w-full md:w-[300px] pl-9 bg-slate-100"
        placeholder="Search course..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
