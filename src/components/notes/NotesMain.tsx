import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { NoteForm } from './NoteForm';
import { NotesFilter } from './NotesFilter';
import { NotesList } from './NotesList';

export const NotesMain: React.FC<any> = () => {
  return (
    <SimpleGrid columns={12} columnGap={3} rowGap={4}>
      <GridItem mt={8} colSpan={12}>
        <NotesFilter />
      </GridItem>
      <GridItem mt={8} colSpan={12}>
        <NoteForm />
      </GridItem>
      <GridItem mt={8} colSpan={12}>
        <NotesList />
      </GridItem>
    </SimpleGrid>
  );
};
