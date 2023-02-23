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
import { useNotesParamsStore } from '../../stores/notes/notes-params.store';
import { useNotesStore } from '../../stores/notes/notes.store';

export interface NotesFilterProps {}

export const NotesFilter: React.FC<NotesFilterProps> = ({}) => {
  const { params, setParams } = useNotesParamsStore(
    ({ params, setParams }) => ({ params, setParams })
  );
  const { list_loading } = useNotesStore(({ list_loading }) => ({
    list_loading,
  }));

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { ...params },
    onSubmit: (values) => {
      console.log('values', values);

      setParams(values);
    },
  });

  return (
    <Card bg={'gray.700'} color="white">
      <CardBody>
        <form action="" onSubmit={handleSubmit}>
          <SimpleGrid columns={12}>
            <GridItem colSpan={12}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  bg={'gray.300'}
                  color={'gray.900'}
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
                  bg={'gray.300'}
                  color={'gray.900'}
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
                  onClick={() => {
                    resetForm();
                    handleSubmit();
                  }}
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
