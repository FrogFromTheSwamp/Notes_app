import { Note } from '../types/index';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '../lib/cn';

interface NoteCardProps {
  note: Note;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const preview = note.content
    .replace(/<[^>]+>/g, '') 
    .slice(0, 120)
    .trim() + (note.content.length > 120 ? '...' : '');

  return (
    <div
      className={cn(
        'group relative rounded-lg border bg-white py-4 px-2 m-2 shadow-sm max-w-150 w-auto md:max-w-100 sm:max-w-50',
        'hover:shadow-md hover:border-blue-300 transition-all duration-200',
        'dark:bg-slate-800 dark:border-slate-700 dark:hover:border-blue-500'
      )}
    >
      <h3 className="mb-2 line-clamp-2 font-semibold text-lg text-slate-900 dark:text-slate-100">
        {note.title || 'Без названия'}
      </h3>

      <p className="mb-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
        {preview || 'Пустая заметка...'}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <time dateTime={note.updatedAt}>
          {new Date(note.updatedAt).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </time>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(note.id)}
            className="rounded p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            title="Редактировать"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="rounded p-1.5 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400"
            title="Удалить"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}