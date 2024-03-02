import React from "react";
import {Menu} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

type Props = {};

const MobileSidebar = (props: Props) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden flex items-center">
          <Menu />
        </SheetTrigger>
        <SheetContent className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
