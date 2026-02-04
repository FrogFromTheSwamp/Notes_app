import { useEffect } from 'react'
import { NoteForm } from '../note-form/NoteForm'
import { X } from 'lucide-react'
import { useNotesStore } from '../../store/notesStore'

interface NoteModalProps {
  isOpen: boolean
  onClose: () => void
  noteIdToEdit: string | null
}

export function NoteModal({ isOpen, onClose, noteIdToEdit }: NoteModalProps) {
  const { getNoteById, addNote, updateNote } = useNotesStore()
  const note = noteIdToEdit ? getNoteById(noteIdToEdit) : null

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (title: string, content: string) => {
    if (noteIdToEdit) {
      updateNote(noteIdToEdit, { title, content })
    } else {
      addNote({ title, content })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl 
  max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b px-6 py-4 dark:border-slate-700">
          <h2 className="text-xl font-semibold">
            {note ? 'Редактировать заметку' : 'Новая заметка'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <NoteForm
          initialTitle={note?.title || ''}
          initialContent={note?.content || ''}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}