import type { Note } from "./types";

export const mockNotes: Note[] = [
  {
    id: "note-1",
    title: "Initial Thoughts on Project Zenith",
    content: "Initial Thoughts on Project Zenith\n\nThis is a rapid capture platform. The main goal is speed and efficiency. We need to focus on keyboard shortcuts and a minimalist UI. The design should be stark, high-contrast, what we call 'brutal'.",
    tags: ["project-zenith", "ux", "design-language"],
    createdAt: "2024-05-20T10:00:00Z",
    updatedAt: "2024-05-20T10:05:00Z",
  },
  {
    id: "note-2",
    title: "GenAI Integration Plan",
    content: "GenAI Integration Plan\n\nWe will use a Genkit flow to suggest tags based on note content. This should be an unobtrusive feature, a button the user can click if they want suggestions. The flow should analyze the text and return a list of relevant keywords.",
    tags: ["genai", "development", "feature"],
    createdAt: "2024-05-21T14:30:00Z",
    updatedAt: "2024-05-21T14:30:00Z",
  },
  {
    id: "note-3",
    title: "Marketing Copy Ideas",
    content: "Marketing Copy Ideas\n\n- Zenith Notes: Capture at the speed of thought.\n- The antidote to bloated note apps.\n- Your ideas, unfiltered.\n- Brutal design, beautiful focus.",
    tags: ["marketing", "copywriting"],
    createdAt: "2024-05-22T09:00:00Z",
    updatedAt: "2024-05-23T11:20:00Z",
  },
  {
    id: "note-4",
    title: "Shopping List",
    content: "Shopping List\n\n- Milk\n- Bread\n- Coffee beans\n- Avocados\n- Olive oil",
    tags: ["personal", "home"],
    createdAt: "2024-05-24T18:00:00Z",
    updatedAt: "2024-05-24T18:00:00Z",
  },
  {
    id: "note-5",
    title: "Q3 Roadmap Discussion",
    content: "Q3 Roadmap Discussion\n\nKey priorities for the next quarter:\n1. Mobile optimization: While desktop-first, the mobile experience needs to be solid for capture on the go.\n2. Export options: Add JSON and Markdown export.\n3. Theme customization: Allow users to change the accent color.",
    tags: ["roadmap", "planning", "q3"],
    createdAt: "2024-05-25T11:00:00Z",
    updatedAt: "2024-05-25T11:45:00Z",
  },
];
