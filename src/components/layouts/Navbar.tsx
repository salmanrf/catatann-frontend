import {
  Flex,
  Avatar,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useSession } from '../../stores/session.provider';

const defaultProfilePicture =
  'https://scontent.fcgk13-1.fna.fbcdn.net/v/t39.30808-6/241401838_4667867153247385_2960586120487818824_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u5JvsBcwfusAX_rAIdk&_nc_ht=scontent.fcgk13-1.fna&oh=00_AfDGVOYyVSrynV1ExQ_VcYf0uOxX7BalKb7qMDYC99Dbpw&oe=63ED020C';

export const Navbar: React.FC<any> = () => {
  const { user, logout } = useSession();

  return (
    <Flex px={6} py={4} justify={'space-between'} align={'center'}>
      <Image src={'catatann-logo.png'} w={'auto'} h={12} />
      <Menu>
        <MenuButton
          as={Avatar}
          icon={
            <Avatar
              src={user.picture_url || defaultProfilePicture}
              cursor={'pointer'}
            />
          }
        />
        <MenuList>
          <MenuItem onClick={logout}>
            <Flex align={'center'}>
              <FiLogOut style={{ marginRight: '0.5em' }} />
              <div className="">Logout</div>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
