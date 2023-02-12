import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useModalsStore } from '../../stores/modals.store';
import { NoteFormModal } from '../modals/NoteFormModal';

export const ModalsContainer: React.FC<any> = () => {
  const { isOpen, onClose, active_name } = useModalsStore(
    ({ isOpen, onClose, active_name }) => ({
      active_name,
      isOpen,
      onClose,
    })
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'} isCentered>
      <ModalOverlay />
      {active_name === 'CREATE_NOTE' && <NoteFormModal />}
    </Modal>
  );
};
