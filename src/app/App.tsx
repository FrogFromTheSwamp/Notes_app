import { useState } from "react";
import { useNotesStore } from "../store/notesStore";
import { NoteModal } from "../features/note-modal/NoteModal";
import { Plus } from "lucide-react";
import { cn } from "../lib/cn";
import { NoteList } from "../features/note-list/NoteList";

export default function App() {
  const { notes, deleteNote } = useNotesStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEditId, setNoteToEditId] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setNoteToEditId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setNoteToEditId(id);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setNoteToEditId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b bg-white dark:bg-slate-900 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Заметки
          </h1>

          <button
            onClick={handleOpenCreate}
            className={cn(
              "flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 cursor-pointer",
              "text-white hover:bg-blue-700 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            )}
          >
            <Plus size={18} />
            Новая заметка
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <NoteList notes={notes} onEdit={handleOpenEdit} onDelete={deleteNote} />
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleClose}
        noteIdToEdit={noteToEditId}
      />
    </div>
  );
}
