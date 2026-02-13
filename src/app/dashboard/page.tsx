"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { mockNotes } from "@/lib/data";
import type { Note } from "@/lib/types";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { NoteList } from "@/components/dashboard/note-list";
import { NoteEditor } from "@/components/dashboard/note-editor";
import { CommandMenu } from "@/components/dashboard/command-menu";
import { Header } from "@/components/dashboard/header";

export default function DashboardPage() {
  const router = useRouter();
  const [notes, setNotes] = React.useState<Note[]>(mockNotes);
  const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(mockNotes[0]?.id || null);
  const [commandMenuOpen, setCommandMenuOpen] = React.useState(false);

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  // Keyboard shortcuts
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandMenuOpen((open) => !open);
      }
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleNewNote();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNoteSelect = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  const handleNewNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "New Note",
      content: "New Note\n\n",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
  };

  const handleNoteUpdate = (updatedNote: Note) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() } : note))
    );
  };

  const handleNoteDelete = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
    if (selectedNoteId === noteId) {
      setSelectedNoteId(notes[0]?.id || null);
    }
  };

  return (
    <div className="flex h-svh flex-col">
      <Header onNewNote={handleNewNote} onSearch={() => setCommandMenuOpen(true)} />
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
            <NoteList
              notes={notes}
              selectedNoteId={selectedNoteId}
              onNoteSelect={handleNoteSelect}
              onNoteDelete={handleNoteDelete}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            {selectedNote ? (
              <NoteEditor key={selectedNote.id} note={selectedNote} onUpdate={handleNoteUpdate} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <p>Select a note to view or create a new one.</p>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
        <CommandMenu
          open={commandMenuOpen}
          onOpenChange={setCommandMenuOpen}
          notes={notes}
          onNoteSelect={(noteId) => {
            handleNoteSelect(noteId);
            setCommandMenuOpen(false);
          }}
        />
      </main>
    </div>
  );
}
