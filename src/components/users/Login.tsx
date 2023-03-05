import {
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Flex,
  Image,
  Link,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getGoogleOAuthUrl } from '../../common/utils/url.utils';
import { useSession } from '../../stores/session.provider';

interface Props {
  menu: string;
  setMenu: (menu: 'login' | 'register') => void;
}

const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Email can't be empty").min(6).max(255),
  password: yup.string().required("Password can't be empty").min(6).max(255),
});

export const Login: React.FC<Props> = ({ setMenu }) => {
  const { login, loading } = useSession();

  const { values, handleChange, handleSubmit } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: 'lapis_lazuli@gmail.com',
      password: 'silversoul123',
    },
    onSubmit: login,
  });

  return (
    <VStack
      flexBasis={['100%', '50%']}
      h={'100%'}
      justify={'center'}
      align={'center'}
      spacing={6}
      px={[6, 0]}
    >
      <Box>
        <Heading size={['md', 'xl']} mb={4} color={'whiteAlpha.700'}>
          LOGIN
        </Heading>
      </Box>
      <Box w={['100%', '60%']}>
        <form action="" onSubmit={handleSubmit}>
          <SimpleGrid justifyContent={'center'} columns={12}>
            <GridItem mb={6} colSpan={12}>
              <FormControl>
                <FormLabel color={'whiteAlpha.700'}>Email</FormLabel>
                <Input
                  name="email"
                  onChange={handleChange}
                  placeholder={'silversoul@beachhouse.com'}
                  value={values.email}
                  background={'whiteAlpha.900'}
                  color={'gray.900'}
                />
              </FormControl>
            </GridItem>
            <GridItem mb={12} colSpan={12}>
              <FormControl>
                <FormLabel color={'whiteAlpha.700'}>Password</FormLabel>
                <Input
                  name="password"
                  type={'password'}
                  placeholder={'******'}
                  onChange={handleChange}
                  value={values.password}
                  background={'whiteAlpha.900'}
                  color={'gray.900'}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={12}>
              <Flex justifyContent={'center'}>
                <Button
                  type={'submit'}
                  w={['100%']}
                  colorScheme={'blue'}
                  isLoading={loading}
                >
                  LOGIN
                </Button>
              </Flex>
            </GridItem>
          </SimpleGrid>
        </form>
      </Box>
      <Box>
        <Text
          fontSize={['sm', 'md']}
          color={'whiteAlpha.900'}
          fontWeight={'bold'}
        >
          OR
        </Text>
      </Box>
      <VStack justify={'center'} align={'center'} spacing={6}>
        <Link
          href={getGoogleOAuthUrl('/')}
          bg={'whiteAlpha.900'}
          textColor={'gray.900'}
          rounded={'md'}
        >
          <Flex align={'center'} px={6} py={2}>
            <Image src={'/google.svg'} w={'auto'} h={'35px'} mr={2} />
            <Text fontWeight={'semibold'}>Continue With Google</Text>
          </Flex>
        </Link>
      </VStack>
      <Flex align={'center'}>
        <Text mr={3} textColor={'whiteAlpha.900'}>
          Don't have an account ?
        </Text>
        <Button
          variant={'link'}
          mt={-0.3}
          lineHeight={'initial'}
          onClick={() => setMenu('register')}
        >
          Signup
        </Button>
      </Flex>
    </VStack>
  );
};
