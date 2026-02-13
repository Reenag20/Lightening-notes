"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { Plus, Search } from "lucide-react";

interface HeaderProps {
  onNewNote: () => void;
  onSearch: () => void;
}

export function Header({ onNewNote, onSearch }: HeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-16 lg:px-6">
      <Logo />
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onSearch}>
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        <Button variant="default" size="sm" onClick={onNewNote}>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
