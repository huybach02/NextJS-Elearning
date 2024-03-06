import {Category} from "@prisma/client";
import React from "react";
import CategoryItem from "./CategoryItem";

type Props = {
  items: Category[];
};

const Categories = ({items}: Props) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} value={item.id} />
      ))}
    </div>
  );
};

export default Categories;
