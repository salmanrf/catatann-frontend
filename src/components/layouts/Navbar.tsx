import { Flex, Heading, Avatar, Button } from '@chakra-ui/react';
import { useModalsStore } from '../../stores/modals.store';
import { useSession } from '../../stores/session.provider';

export const Navbar: React.FC<any> = () => {
  const { logged_in, user } = useSession();

  const { onOpen } = useModalsStore(({ onOpen }) => ({ onOpen }));

  return (
    <Flex px={6} py={4} justify={'space-between'}>
      <Heading color={'white'}>Catatann</Heading>
      {logged_in ? (
        <Avatar src="https://scontent.fcgk13-1.fna.fbcdn.net/v/t39.30808-6/241401838_4667867153247385_2960586120487818824_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u5JvsBcwfusAX_rAIdk&_nc_ht=scontent.fcgk13-1.fna&oh=00_AfDGVOYyVSrynV1ExQ_VcYf0uOxX7BalKb7qMDYC99Dbpw&oe=63ED020C" />
      ) : (
        <Button
          colorScheme={'blue'}
          onClick={() => onOpen('LOGIN', null, { size: 'md' })}
        >
          Login
        </Button>
      )}
    </Flex>
  );
};
