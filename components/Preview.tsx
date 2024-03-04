"use client";

import React, {useMemo} from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";

type Props = {
  value: string;
};

const Preview = ({value}: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), {ssr: false}),
    []
  );

  return (
    <div className="bg-slate-200">
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};

export default Preview;
