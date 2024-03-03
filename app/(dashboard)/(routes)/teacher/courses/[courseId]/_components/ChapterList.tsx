"use client";

import {Chapter} from "@prisma/client";
import React, {useEffect, useState} from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {cn} from "@/lib/utils";
import {Grip, PenSquare} from "lucide-react";
import {Badge} from "@/components/ui/badge";

type Props = {
  onEdit: (id: string) => void;
  onReorder: (updateData: {id: string; position: number}[]) => void;
  items: Chapter[];
};

const ChapterList = ({onEdit, onReorder, items}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-2 bg-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                        chapter.isPublished && "bg-primary/90 text-primary"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-slate-200 hover:bg-slate-300 rounded-l-md transition",
                          chapter.isPublished &&
                            "border-r-sky-200 hover:bg-sky-200"
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip />
                      </div>
                      <p className="line-clamp-1">{chapter.title}</p>
                      <div className="ml-auto pr-2 flex items-center gap-2">
                        <Badge
                          className={cn(
                            "bg-red-400 hover:bg-red-500 cursor-default",
                            chapter.isFree && "bg-teal-500"
                          )}
                        >
                          {chapter?.isFree ? "Free" : "Buy"}
                        </Badge>
                        <Badge
                          className={cn(
                            "bg-gray-500 hover:bg-gray-600 cursor-default",
                            chapter.isPublished && "bg-primary"
                          )}
                        >
                          {chapter?.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <PenSquare
                          className="w-5 h-5 text-primary cursor-pointer"
                          onClick={() => onEdit(chapter.id)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ChapterList;
