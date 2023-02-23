import { Button, ButtonGroup, Card, CardBody, Flex } from '@chakra-ui/react';
import { useModalsStore } from '../../stores/modals.store';

export const NoteForm: React.FC<any> = () => {
  const { onOpen } = useModalsStore(({ onOpen }) => ({ onOpen }));

  return (
    <Card bg={'gray.700'}>
      <CardBody>
        <Flex justify={'flex-end'}>
          <ButtonGroup gap={3}>
            <Button onClick={() => onOpen('CREATE_NOTE')} colorScheme={'blue'}>
              Add Note
            </Button>
          </ButtonGroup>
        </Flex>
      </CardBody>
    </Card>
  );
};
