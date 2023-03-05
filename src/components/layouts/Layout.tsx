import { Container } from '@chakra-ui/react';
import { useSession } from '../../stores/session.provider';
import { NotesMain } from '../notes/NotesMain';
import { AuthPage } from '../users/AuthPage';
import { Navbar } from './Navbar';

export const Layout: React.FC<any> = () => {
  const { logged_in } = useSession();

  if (!logged_in) {
    return <AuthPage />;
  }

  return (
    <Container minH={'100vh'} maxW={'100vw'} pb={12} bg={'gray.900'}>
      <Navbar />
      <Container maxW={'60%'}>
        <NotesMain />
      </Container>
    </Container>
  );
};
