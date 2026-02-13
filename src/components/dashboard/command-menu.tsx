"use client";

import * as React from "react";
import { FileText, Search } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import type { Note } from "@/lib/types";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notes: Note[];
  onNoteSelect: (noteId: string) => void;
}

export function CommandMenu({ open, onOpenChange, notes, onNoteSelect }: CommandMenuProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search notes by title, content, or tag..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Notes">
          {notes.map((note) => (
            <CommandItem
              key={note.id}
              value={`${note.title} ${note.content} ${note.tags.join(" ")}`}
              onSelect={() => onNoteSelect(note.id)}
              className="cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{note.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
