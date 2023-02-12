import { Avatar, Container, Flex, Heading } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { NotesMain } from '../notes/NotesMain';
import { Navbar } from './Navbar';

export const Layout: React.FC<any> = () => {
  const [content, setContent] = useState('');

  return (
    <Container maxW={'100vw'}>
      <Navbar />
      <Container maxW={'50%'}>
        <MDEditor
          value={content}
          onChange={(value?: string) => setContent(value ?? '')}
        />
        <NotesMain />
      </Container>
    </Container>
  );
};
