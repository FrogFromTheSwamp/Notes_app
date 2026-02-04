import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';  

import type { Note } from "../types/index";           

interface NotesState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) => void;
  deleteNote: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
}

const INITIAL_NOTES: Note[] = [
  {
    id: 'initial-note-001',
    title: 'Добро пожаловать в Заметки!',
    content: '<p>Это ваша <strong>первая заметка</strong>. Можете её отредактировать или удалить.</p>',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: INITIAL_NOTES,

      addNote: (newNoteData) => {
        const now = new Date().toISOString();
        const newNote: Note = {
          ...newNoteData,
          id: uuidv4(), 
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          notes: [...state.notes, newNote],
        }));
      },

      updateNote: (id, updates) => {
        const now = new Date().toISOString();
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: now }
              : note
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },

      getNoteById: (id) => {
        return get().notes.find((note) => note.id === id);
      },
    }),

    {
      name: 'notes-app-storage',               
      storage: createJSONStorage(() => localStorage),
      version: 1,                             
    }
  )
);