import {
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { API_CONFIG } from '../../common/configs/api.config';
import { useModalsStore } from '../../stores/modals.store';

export const UserFormModal: React.FC<any> = () => {
  const { onClose } = useModalsStore(({ onClose }) => ({ onClose }));

  function handleOauthCallback(response: any) {
    console.log('response', response);
  }

  useEffect(() => {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: API_CONFIG.GOOGLE_CLIENT_ID,
      callback: handleOauthCallback,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.querySelector('#login-with-google'),
      { theme: 'outline', size: 'large' }
    );
    // @ts-ignore
    google.accounts.id.prompt();
  }, []);

  return (
    <ModalContent>
      <ModalHeader />
      <ModalCloseButton />
      <ModalBody>
        <Flex flexDir={'column'} justify={'center'} align={'center'}>
          <div className="mt-3" id="login-with-google"></div>
        </Flex>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </ModalContent>
  );
};
