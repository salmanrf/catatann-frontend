import { Avatar, Container, Flex, Heading } from '@chakra-ui/react';
import { Navbar } from './Navbar';

export const Layout: React.FC<any> = () => {
  return (
    <Container maxW={'100vw'}>
      <Navbar />
    </Container>
  );
};
