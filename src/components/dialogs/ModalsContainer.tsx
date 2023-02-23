import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useModalsStore } from '../../stores/modals.store';
import { NoteFormModal } from '../notes/NoteFormModal';
import { UserFormModal } from '../modals/UserFormModal';
import { DeleteNoteForm } from '../notes/DeleteNoteForm';

export const ModalsContainer: React.FC<any> = () => {
  const { isOpen, onClose, active_name, options } = useModalsStore(
    ({ isOpen, onClose, active_name, options }) => ({
      active_name,
      isOpen,
      onClose,
      options,
    })
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={options.size} isCentered>
      <ModalOverlay />
      {active_name === 'CREATE_NOTE' && <NoteFormModal />}
      {active_name === 'UPDATE_NOTE' && <NoteFormModal />}
      {active_name === 'DELETE_NOTE' && <DeleteNoteForm />}
      {active_name === 'LOGIN' && <UserFormModal />}
    </Modal>
  );
};
