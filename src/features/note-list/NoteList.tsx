import { Note } from '../../types/index'           
import { NoteCard } from '../../components/NoteCard'

interface NoteListProps {
  notes: Note[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  className?: string
}

export function NoteList({ notes, onEdit, onDelete, className = '' }: NoteListProps) {
  const count = notes.length
  const hasNotes = count > 0

  const displayNotes = [...notes].sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  return (
    <section className={className}>
      {hasNotes ? (
        <>
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Все заметки
            </h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {count} {count === 1 ? 'заметка' : count < 5 ? 'заметки' : 'заметок'}
            </span>
          </div>

          <div className="
            grid gap-5 sm:gap-6
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
          ">
            {displayNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="py-20 text-center">
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl">
            📝
          </div>
          <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-3">
            Нет заметок
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Создайте первую заметку прямо сейчас
          </p>
        </div>
      )}
    </section>
  )
}