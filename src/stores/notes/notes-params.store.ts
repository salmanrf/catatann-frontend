import { create } from 'zustand';
import { FindNotesDto } from '../../models/notes.model';

export interface NotesParamsState {
  params: FindNotesDto;
  setParams: (values: Partial<FindNotesDto>) => void;
}

export const useNotesParamsStore = create<NotesParamsState>((set) => ({
  params: {
    limit: 10,
    page: 1,
    sort_field: 'created_at',
    sort_order: 'DESC',
    categories: [],
    content: '',
    title: '',
  },
  setParams: (values) =>
    set(({ params }) => ({ params: { ...params, ...values } })),
}));
