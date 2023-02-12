import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FindNotesDto } from '../../models/notes.model';
import { useNotesStore } from '../../stores/notes.store';

export interface NotesFilterProps {
  params: FindNotesDto;
  setParams: (values: Partial<FindNotesDto>) => void;
}

export const NotesFilter: React.FC<NotesFilterProps> = ({
  params,
  setParams,
}) => {
  const { list_loading } = useNotesStore(({ list_loading }) => ({
    list_loading,
  }));

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { ...params },
    onSubmit: (values) => {
      setParams(values);
    },
  });

  return (
    <Card>
      <CardBody>
        <form action="" onSubmit={handleSubmit}>
          <SimpleGrid columns={12}>
            <GridItem colSpan={12}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type={'text'}
                  name={'title'}
                  placeholder="Search by title..."
                  onChange={handleChange}
                  value={values.title}
                />
              </FormControl>
            </GridItem>
            <GridItem mt={4} colSpan={12}>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Input
                  type={'text'}
                  name={'content'}
                  placeholder="Search by content..."
                  onChange={handleChange}
                  value={values.content}
                />
              </FormControl>
            </GridItem>
            <GridItem mt={4} colSpan={12}>
              <Flex justify={'flex-end'}>
                <Button
                  onClick={() => resetForm()}
                  type="reset"
                  variant={'outline'}
                  colorScheme={'blue'}
                  isLoading={list_loading}
                  mr={3}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  colorScheme={'blue'}
                  isLoading={list_loading}
                >
                  Search
                </Button>
              </Flex>
            </GridItem>
          </SimpleGrid>
        </form>
      </CardBody>
    </Card>
  );
};
