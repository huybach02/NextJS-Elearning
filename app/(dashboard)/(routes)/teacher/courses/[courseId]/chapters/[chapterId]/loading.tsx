import {Loader2} from "lucide-react";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-5">
      <span className="animate-spin">
        <Loader2 className="w-10 h-10" />
      </span>
      Loading...
    </div>
  );
};

export default loading;
