"use client";

import * as React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import type { Note } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onNoteDelete: (id: string) => void;
}

export function NoteList({
  notes,
  selectedNoteId,
  onNoteSelect,
  onNoteDelete,
}: NoteListProps) {
  const [sortOrder, setSortOrder] = React.useState<"updatedAt" | "title">(
    "updatedAt"
  );

  const sortedNotes = React.useMemo(() => {
    return [...notes].sort((a, b) => {
      if (sortOrder === "updatedAt") {
        return parseISO(b.updatedAt).getTime() - parseISO(a.updatedAt).getTime();
      }
      return a.title.localeCompare(b.title);
    });
  }, [notes, sortOrder]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-headline font-semibold">All Notes ({notes.length})</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={sortOrder === 'updatedAt' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setSortOrder('updatedAt')}
          >
            Recent
          </Button>
          <Button
            variant={sortOrder === 'title' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setSortOrder('title')}
          >
            A-Z
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {sortedNotes.map((note) => (
            <button
              key={note.id}
              className={cn(
                "group relative block w-full border-b p-4 text-left hover:bg-muted/50",
                note.id === selectedNoteId && "bg-muted"
              )}
              onClick={() => onNoteSelect(note.id)}
            >
              <h3 className="truncate font-semibold">{note.title}</h3>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {note.content.split("\n").slice(1).join(" ").substring(0, 100) || "No additional content"}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {note.tags.slice(0, 3).map(tag => (
                   <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {formatDistanceToNow(parseISO(note.updatedAt), {
                  addSuffix: true,
                })}
              </p>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onNoteDelete(note.id);
                      }}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
