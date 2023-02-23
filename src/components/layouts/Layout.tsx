import { Container } from '@chakra-ui/react';
import { NotesMain } from '../notes/NotesMain';
import { Navbar } from './Navbar';

export const Layout: React.FC<any> = () => {
  return (
    <Container minH={'100vh'} maxW={'100vw'} bg={'gray.900'}>
      <Navbar />
      <Container maxW={'60%'}>
        <NotesMain />
      </Container>
    </Container>
  );
};
