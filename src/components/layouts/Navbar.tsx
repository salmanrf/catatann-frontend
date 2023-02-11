import { Flex, Heading, Avatar } from '@chakra-ui/react';

export const Navbar: React.FC<any> = () => {
  return (
    <Flex px={6} py={4} justify={'space-between'}>
      <Heading>Catatann</Heading>
      <Avatar src="https://scontent.fcgk13-1.fna.fbcdn.net/v/t39.30808-6/241401838_4667867153247385_2960586120487818824_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u5JvsBcwfusAX_rAIdk&_nc_ht=scontent.fcgk13-1.fna&oh=00_AfDGVOYyVSrynV1ExQ_VcYf0uOxX7BalKb7qMDYC99Dbpw&oe=63ED020C" />
    </Flex>
  );
};
