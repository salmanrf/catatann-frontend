import { Container } from '@chakra-ui/react';
import { NotesMain } from '../notes/NotesMain';
import { Navbar } from './Navbar';

export const Layout: React.FC<any> = () => {
  return (
    <Container maxW={'100vw'}>
      <Navbar />
      <Container maxW={'50%'}>
        <NotesMain />
      </Container>
    </Container>
  );
};
