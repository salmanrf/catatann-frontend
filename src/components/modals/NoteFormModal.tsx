import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';

export const NoteFormModal: React.FC<any> = () => {
  return (
    <ModalContent>
      <ModalHeader>Create Note</ModalHeader>
      <ModalCloseButton />
      <ModalBody></ModalBody>
      <ModalFooter></ModalFooter>
    </ModalContent>
  );
};
