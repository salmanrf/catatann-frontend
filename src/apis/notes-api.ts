import axios from 'axios';
import { ApiResponse } from '../models/api.model';
import { CreateNoteDto, FindNotesDto, Note } from '../models/notes.model';
import { PaginatedData } from '../models/pagination.model';
import { API_URL } from './url';

const NOTES_API_URL = `${API_URL}/notes`;

export async function fetchFindNotes(
  params: FindNotesDto
): Promise<PaginatedData<Note>> {
  try {
    const res = await axios.get<ApiResponse<PaginatedData<Note>>>(
      NOTES_API_URL,
      { params }
    );

    const {
      data: { data },
    } = res;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCreateNote(dto: CreateNoteDto): Promise<Note> {
  try {
    const res = await axios.post<ApiResponse<Note>>(NOTES_API_URL, dto);

    const {
      data: { data },
    } = res;

    return data;
  } catch (error) {
    throw error;
  }
}
