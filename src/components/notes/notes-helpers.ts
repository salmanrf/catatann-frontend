import { Note } from '../../models/notes.model';

export function getNotesInitialValues(note: Partial<Note>): Note {
  const { note_id, title, content, categories, created_at, updated_at } = note;

  const values: Note = {
    note_id: note_id ?? '',
    title: title ?? '',
    content: content ?? '',
    categories: categories ?? [],
    created_at: created_at ?? '',
    updated_at: updated_at ?? '',
  };

  return values;
}
