import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/format";
import React from "react";

type Props = {
  courseId: string;
  price: number | null;
};

const CourseEnrollButton = ({courseId, price}: Props) => {
  return (
    <Button className="w-full md:w-fit">
      Buy with {formatPrice(Number(price))}
    </Button>
  );
};

export default CourseEnrollButton;
