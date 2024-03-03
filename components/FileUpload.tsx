"use client";

import {ourFileRouter} from "@/app/api/uploadthing/core";
import {UploadDropzone} from "@/lib/uploadthing";
import toast from "react-hot-toast";

type Props = {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export default function FileUpload({onChange, endpoint}: Props) {
  return (
    <main>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res: any) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
      />
    </main>
  );
}
