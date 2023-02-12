import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { FindNotesDto } from '../../models/notes.model';
import { NotesFilter } from './NotesFilter';
import { NotesList } from './NotesList';

export const NotesMain: React.FC<any> = () => {
  const [params, setParams] = useState<FindNotesDto>({
    limit: 10,
    page: 1,
    sort_field: 'created_at',
    sort_order: 'DESC',
    categories: [],
    content: '',
    title: '',
  });

  function updateParams(values: Partial<FindNotesDto>) {
    setParams((prev) => ({ ...prev, ...values }));
  }

  return (
    <SimpleGrid columns={12} columnGap={3} rowGap={4}>
      <GridItem mt={8} colSpan={12}>
        <NotesFilter params={params} setParams={updateParams} />
      </GridItem>
      <GridItem mt={8} colSpan={12}>
        <NotesList params={params} setParams={updateParams} />
      </GridItem>
    </SimpleGrid>
  );
};
