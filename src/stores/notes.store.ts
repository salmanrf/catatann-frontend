import { create } from 'zustand';
import { fetchCreateNote, fetchFindNotes } from '../apis/notes-api';
import { promiseTuplify } from '../common/utils/promise-utils';
import { CreateNoteDto, FindNotesDto, Note } from '../models/notes.model';
import { PaginatedData } from '../models/pagination.model';

interface NotesState {
  actions_loading: boolean;
  list_loading: boolean;
  data: {
    items: Note[];
    total_items: number;
    total_pages: number;
    sort_field: string;
    sort_order: 'ASC' | 'DESC';
  };
  findNotes: (params: FindNotesDto) => Promise<PaginatedData<Note>>;
  createNote: (dto: CreateNoteDto) => Promise<Note>;
}

const initialState = {
  actions_loading: false,
  list_loading: false,
  data: {
    items: [],
    total_items: 0,
    total_pages: 1,
    sort_field: 'created_at',
    sort_order: 'DESC' as 'ASC' | 'DESC',
  },
};

export const useNotesStore = create<NotesState>((set) => ({
  ...initialState,
  findNotes: async (params) => {
    set(({ list_loading, ...prev }) => ({ ...prev, list_loading: true }));

    const [res, error] = await promiseTuplify(fetchFindNotes(params));

    if (error) {
      console.error(error);
    }

    set(({ list_loading, ...prev }) => ({
      ...prev,
      list_loading: false,
      data: res,
    }));

    return res;
  },
  createNote: async (dto) => {
    set(({ actions_loading, ...prev }) => ({ ...prev, actions_loading: true }));

    const [res, error] = await promiseTuplify(fetchCreateNote(dto));

    if (error) {
      console.error(error);
    }

    set(({ actions_loading, ...prev }) => ({
      ...prev,
      actions_loading: false,
    }));

    return res;
  },
}));
