import {isTeacher} from "@/lib/teacher";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

export default function RootLayout({children}: {children: React.ReactNode}) {
  const {userId} = auth();

  if (!isTeacher(userId)) {
    redirect("/");
  }

  return <>{children}</>;
}
