import {formatPrice} from "@/lib/format";
import {BookOpenText, DollarSign} from "lucide-react";
import React from "react";

type Props = {
  value: number;
  label: string;
  isFormat?: boolean;
};

const DataCard = ({value, label, isFormat}: Props) => {
  return (
    <div className="flex items-center gap-5 border p-5 shadow-md rounded-md">
      {isFormat ? (
        <DollarSign className="w-14 h-14 text-green-600 bg-teal-100 p-3 rounded-lg" />
      ) : (
        <BookOpenText className="w-14 h-14 text-sky-600 bg-sky-100 p-3 rounded-lg" />
      )}
      <div className="flex flex-col gap-2">
        <span className="font-semibold">{label}</span>
        <span className="text-3xl font-bold text-primary">{value}</span>
      </div>
    </div>
  );
};

export default DataCard;
