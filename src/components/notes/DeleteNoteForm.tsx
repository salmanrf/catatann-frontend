import { Note } from '../../models/notes.model';
import { ModalsState, useModalsStore } from '../../stores/modals.store';
import { useNotesParamsStore } from '../../stores/notes/notes-params.store';
import { useNotesStore } from '../../stores/notes/notes.store';
import { ActionModal } from '../modals/ActionModal';

export const DeleteNoteForm: React.FC<any> = () => {
  const { data, onClose } = useModalsStore(
    ({ data, onClose }) => ({ data, onClose } as ModalsState<Note>)
  );

  const params = useNotesParamsStore(({ params }) => params);
  const { actions_loading, deleteNote, findNotes } = useNotesStore(
    ({ actions_loading, deleteNote, findNotes }) => ({
      actions_loading,
      deleteNote,
      findNotes,
    })
  );

  async function submitDeleteNote() {
    try {
      if (!data) {
        return;
      }

      const _ = await deleteNote(data.note_id);

      findNotes(params);

      onClose();
    } catch (error) {
      console.log('error', error);
    }
  }

  if (!data || !data.note_id) {
    return null;
  }

  return (
    <ActionModal
      title={'Delete Note'}
      initialValues={{}}
      onSubmit={submitDeleteNote}
      loading={actions_loading}
      submitText="Delete"
      submitVariant="red"
      message={`Delete Note "${data?.title}"`}
      close={onClose}
    ></ActionModal>
  );
};
