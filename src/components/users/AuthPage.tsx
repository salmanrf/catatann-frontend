import { Container, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { Login } from './Login';
import { Signup } from './Signup';

export const AuthPage: React.FC<any> = () => {
  const [menu, setMenu] = useState('login');

  return (
    <Container h={'100vh'} maxW={'100vw'} pb={12} bg={'gray.900'}>
      <Flex h={'100%'} direction={['column', 'row']} align={'center'}>
        <Flex
          flexBasis={['25%', '50%']}
          h={['100%']}
          justify={'center'}
          align={'center'}
        >
          <Image src="/catatann-logo.png" w={['95vw', '35vw']} h={'auto'} />
        </Flex>
        {menu === 'login' && (
          <Login {...{ menu, setMenu: (menu) => setMenu(menu) }} />
        )}
        {menu === 'register' && (
          <Signup {...{ menu, setMenu: (menu) => setMenu(menu) }} />
        )}
      </Flex>
    </Container>
  );
};
