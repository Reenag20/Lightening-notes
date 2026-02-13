"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, parseISO } from "date-fns";
import type { Note } from "@/lib/types";
import { getSuggestedTagsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";

const noteSchema = z.object({
  content: z.string().min(1, "Content cannot be empty."),
  tags: z.array(z.string()),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteEditorProps {
  note: Note;
  onUpdate: (note: Partial<Note>) => void;
}

export function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  const { toast } = useToast();
  const [tagInput, setTagInput] = React.useState("");
  const [isSuggesting, setIsSuggesting] = React.useState(false);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: note.content || "",
      tags: note.tags || [],
    },
  });

  const contentValue = form.watch("content");
  const tagsValue = form.watch("tags");

  const autoTitle = React.useMemo(() => {
    const firstLine = contentValue.split("\n")[0].trim();
    return firstLine || "Untitled Note";
  }, [contentValue]);

  // Autosave functionality
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      const updatedNote: Partial<Note> = {
        title: autoTitle,
        content: value.content || "",
        tags: value.tags || [],
      };
      onUpdate(updatedNote);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, onUpdate, autoTitle]);

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (newTag && !tagsValue.includes(newTag)) {
        form.setValue("tags", [...tagsValue, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      tagsValue.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleSuggestTags = async () => {
    setIsSuggesting(true);
    const result = await getSuggestedTagsAction(contentValue);
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Suggestion Failed",
        description: result.error,
      });
    } else {
      const newTags = result.tags.filter((tag) => !tagsValue.includes(tag));
      if (newTags.length > 0) {
        form.setValue("tags", [...tagsValue, ...newTags]);
        toast({
          title: "Tags Suggested",
          description: `Added ${newTags.length} new tag(s).`,
        });
      } else {
        toast({
          title: "No New Suggestions",
          description: "AI analysis didn't find any new tags to add.",
        });
      }
    }
    setIsSuggesting(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="p-4 md:p-6">
            <Form {...form}>
              <form className="space-y-4">
                <h1 className="font-headline text-3xl font-bold tracking-tighter">
                  {autoTitle}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Last updated: {format(parseISO(note.updatedAt), "PPP p")}
                </p>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Start writing..."
                          className="min-h-[40vh] resize-none border-none p-0 text-base focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </ScrollArea>
      </div>

      <div className="border-t bg-card p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Tags</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSuggestTags}
                disabled={isSuggesting}
              >
                {isSuggesting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                )}
                Suggest Tags
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {tagsValue.map((tag) => (
                <Badge key={tag} variant="secondary" className="group">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 group-hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Input
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Add a tag..."
                className="h-8 max-w-40 border-none bg-transparent p-0 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
