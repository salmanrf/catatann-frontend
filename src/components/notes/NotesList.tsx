import { SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FindNotesDto } from '../../models/notes.model';
import { useNotesParamsStore } from '../../stores/notes/notes-params.store';
import { useNotesStore } from '../../stores/notes/notes.store';
import { NoteItem } from './NoteItem';

export interface NotesListProps {}

export const NotesList: React.FC<NotesListProps> = ({}) => {
  const { params } = useNotesParamsStore(({ params }) => ({ params }));
  const { list_loading, findNotes, data } = useNotesStore(
    ({ list_loading, findNotes, data }) => ({
      list_loading,
      findNotes,
      data,
    })
  );

  useEffect(() => {
    findNotes({
      ...params,
    });
  }, [params]);

  return (
    <SimpleGrid columns={12} columnGap={3} rowGap={3}>
      {data.items.map((item) => (
        <NoteItem key={item.note_id} item={item} />
      ))}
    </SimpleGrid>
  );
};
