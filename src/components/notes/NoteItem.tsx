import {
  GridItem,
  SlideFade,
  Card,
  CardHeader,
  Heading,
  CardBody,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Note } from '../../models/notes.model';

interface Props {
  item: Note;
}

export const NoteItem: React.FC<Props> = ({ item }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <GridItem colSpan={6}>
      <SlideFade in={isMounted}>
        <Card overflow={'auto'}>
          <CardHeader>
            <Heading size={'md'}>{item.title}</Heading>
          </CardHeader>
          <CardBody>
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </CardBody>
        </Card>
      </SlideFade>
    </GridItem>
  );
};
