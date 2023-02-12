import { SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FindNotesDto } from '../../models/notes.model';
import { useNotesStore } from '../../stores/notes.store';
import { NoteItem } from './NoteItem';

export interface NotesListProps {
  params: FindNotesDto;
  setParams: (values: Partial<FindNotesDto>) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ params }) => {
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
  }, []);

  console.log('data', data);

  return (
    <SimpleGrid columns={12} columnGap={3} rowGap={3}>
      {data.items.map((item) => (
        <NoteItem key={item.note_id} item={item} />
      ))}
    </SimpleGrid>
  );
};
