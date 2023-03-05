import {
  GridItem,
  SlideFade,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Note } from '../../models/notes.model';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { useModalsStore } from '../../stores/modals.store';

interface Props {
  item: Note;
}

export const NoteItem: React.FC<Props> = ({ item }) => {
  const [isMounted, setIsMounted] = useState(false);

  const { onOpen } = useModalsStore(({ onOpen }) => ({
    onOpen,
  }));

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <GridItem colSpan={6}>
      <SlideFade in={isMounted}>
        <Card height={'xl'} overflow={'auto'} bg={'gray.700'}>
          <CardHeader>
            <Flex justify={'space-between'} align={'center'}>
              <Heading size={'md'} color={'white'}>
                {item.title}
              </Heading>
              <Menu>
                <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
                <MenuList>
                  <MenuItem onClick={() => onOpen('VIEW_NOTE', item)}>
                    <Flex align={'center'}>
                      <ViewIcon mr={3} />
                      <div className="">View</div>
                    </Flex>
                  </MenuItem>
                  <MenuItem onClick={() => onOpen('CREATE_NOTE', item)}>
                    <Flex align={'center'}>
                      <EditIcon mr={3} />
                      <div className="">Update</div>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    onClick={() => onOpen('DELETE_NOTE', item, { size: 'xl' })}
                  >
                    <Flex align={'center'}>
                      <DeleteIcon mr={3} />
                      <div className="">Delete</div>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody color={'white'}>
            <div className="container" data-color-mode="dark">
              <MDEditor.Markdown
                source={item.content}
                style={{ background: '#1A202C', padding: '1.5em' }}
              />
            </div>
          </CardBody>
        </Card>
      </SlideFade>
    </GridItem>
  );
};
