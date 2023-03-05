import { Box } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import { Note } from '../../models/notes.model';
import { ModalsState, useModalsStore } from '../../stores/modals.store';
import { ActionModal } from '../modals/ActionModal';

export const NoteViewModal: React.FC<any> = () => {
  const { data, onClose } = useModalsStore(
    ({ data, onClose }) => ({ data, onClose } as ModalsState<Note>)
  );

  return (
    <ActionModal
      title={data?.title ?? ''}
      initialValues={data ?? {}}
      onSubmit={() => null}
      showActions={false}
      close={onClose}
    >
      {(formik) => (
        <Box width={'100%'} maxH={'80vh'} p={4} overflow={'auto'}>
          <MDEditor.Markdown source={formik.values.content ?? ''} />
        </Box>
      )}
    </ActionModal>
  );
};
