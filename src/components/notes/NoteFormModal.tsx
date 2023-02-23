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
import { CreateNoteDto, Note } from '../../models/notes.model';
import { ModalsState, useModalsStore } from '../../stores/modals.store';
import { useNotesParamsStore } from '../../stores/notes/notes-params.store';
import { useNotesStore } from '../../stores/notes/notes.store';
import { getNotesInitialValues } from './notes-helpers';

export const NoteFormModal: React.FC<any> = () => {
  const { params } = useNotesParamsStore(({ params }) => ({ params }));
  const { actions_loading, createNote, findNotes, updateNote } = useNotesStore(
    ({ actions_loading, createNote, findNotes, updateNote }) => ({
      actions_loading,
      findNotes,
      createNote,
      updateNote,
    })
  );

  const { onClose, active_name, data } = useModalsStore(
    ({ onClose, data, active_name }) => ({
      data,
      onClose,
      active_name,
    })
  ) as ModalsState<Note>;

  const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: getNotesInitialValues(data ?? {}),
    onSubmit: submitNote,
  });

  async function submitNote(values: Note) {
    const { note_id } = values;

    try {
      if (note_id) {
        await submitUpdateNote(values);
      } else {
        await submitCreateNote(values);
      }

      findNotes(params);

      onClose();
    } catch (error) {
      console.log('error', error);
    }
  }

  async function submitCreateNote(dto: CreateNoteDto) {
    const res = await createNote(dto);

    return res;
  }

  async function submitUpdateNote(values: Note) {
    const { note_id, ...updateDto } = values;
    const res = await updateNote(note_id, updateDto);

    return res;
  }

  if (active_name === 'UPDATE_NOTE' && !data?.note_id) {
    return null;
  }

  return (
    <ModalContent>
      <ModalHeader>
        {data ? `Update "${data.title}"` : 'Create Note'}
      </ModalHeader>
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
