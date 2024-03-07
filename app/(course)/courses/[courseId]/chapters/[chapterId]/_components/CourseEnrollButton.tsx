"use client";

import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/format";
import axios from "axios";
import React, {useState} from "react";
import toast from "react-hot-toast";

type Props = {
  courseId: string;
  price: number | null;
};

const CourseEnrollButton = ({courseId, price}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(false);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="w-full md:w-fit" onClick={onClick} disabled={isLoading}>
      Buy with {formatPrice(Number(price))}
    </Button>
  );
};

export default CourseEnrollButton;
