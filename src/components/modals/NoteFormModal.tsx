import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
} from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import { useFormik } from 'formik';
import { CreateNoteDto } from '../../models/notes.model';
import { useModalsStore } from '../../stores/modals.store';
import { useNotesStore } from '../../stores/notes.store';
import { getNotesInitialValues } from '../notes/notes-helpers';

export const NoteFormModal: React.FC<any> = () => {
  const { actions_loading, createNote } = useNotesStore(
    ({ actions_loading, createNote }) => ({ actions_loading, createNote })
  );

  const { onClose } = useModalsStore(({ onClose }) => ({ onClose }));

  const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: getNotesInitialValues({}),
    onSubmit: (values) => {
      submitCreateNote(values);
    },
  });

  async function submitCreateNote(dto: CreateNoteDto) {
    try {
      const res = await createNote(dto);

      onClose();
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <ModalContent>
      <ModalHeader>Create Note</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form action="" onSubmit={handleSubmit}>
          <SimpleGrid columns={12}>
            <GridItem colSpan={12}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                />
              </FormControl>
            </GridItem>
            <GridItem mt={4} colSpan={12}>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <MDEditor
                  value={values.content}
                  onChange={(value?: string) =>
                    setFieldValue('content', value ?? '')
                  }
                />
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </form>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            onClick={() => handleSubmit()}
            colorScheme={'blue'}
            isLoading={actions_loading}
          >
            Submit
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  );
};
