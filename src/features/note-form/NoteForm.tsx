import { useState, useMemo, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { cn } from '../../lib/cn';

interface NoteFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => void;
  onCancel: () => void;
}

export function NoteForm({
  initialTitle = '',
  initialContent = '',
  onSubmit,
  onCancel,
}: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState<string | null>(null);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],           
        ['bold', 'italic', 'underline', 'strike'], 
        [{ list: 'ordered' }, { list: 'bullet' }], 
        [{ align: [] }],                           
        ['link', 'image'],                        
        ['clean'],                                 
      ],
    }),
    []
  );

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'align',
      'link',
      'image',
    ],
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        setError('Заголовок не может быть пустым');
        return;
      }

      if (!content.trim()) {
        setError('Содержимое заметки пустое');
        return;
      }

      setError(null);
      onSubmit(trimmedTitle, content);
    },
    [title, content, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
      <div className="px-6 pt-4 pb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок заметки..."
          className={cn(
            'w-full px-4 py-3 text-xl font-medium bg-transparent border-b',
            'border-slate-300 dark:border-slate-600 focus:border-blue-500',
            'outline-none transition-colors placeholder:text-slate-400',
            error && 'border-red-500'
          )}
          autoFocus
        />

        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      <div className="flex-1 min-h-[300px] px-6 pb-4">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="h-full"
          placeholder="Начните писать заметку... (поддерживается форматирование, списки, ссылки, картинки)"
        />
      </div>

      <div className="flex justify-end gap-3 px-6 py-4 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            'px-5 py-2.5 rounded-lg text-slate-700 dark:text-slate-300',
            'hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'
          )}
        >
          Отмена
        </button>

        <button
          type="submit"
          className={cn(
            'px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium',
            'hover:bg-blue-700 active:bg-blue-800 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          )}
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}