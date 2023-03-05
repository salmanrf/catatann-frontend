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
  FormErrorMessage,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSession } from '../../stores/session.provider';

interface Props {
  menu: string;
  setMenu: (menu: 'login' | 'register') => void;
}

const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email can't be empty")
    .min(6, 'Email must be 6 to 100 characters')
    .max(100, 'Email must be 6 to 100 characters'),
  full_name: yup
    .string()
    .required("Name can't be empty")
    .min(6, 'Name must be 6 to 100 characters'),
  password: yup
    .string()
    .required("Password can't be empty")
    .max(100, 'Password must be 6 to 100 characters'),
});

export const Signup: React.FC<Props> = ({ setMenu }) => {
  const { signup, loading } = useSession();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    validationSchema: SignupSchema,
    initialValues: {
      email: 'lapis_lazuli@gmail.com',
      password: 'silversoul123',
      full_name: 'Lapis Lazuli',
    },
    onSubmit: async (values) => {
      try {
        await signup(values);

        setMenu('login');
      } catch (error) {
        console.log('error', error);
      }
    },
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
          Signup
        </Heading>
      </Box>
      <Box w={['100%', '60%']}>
        <form action="" onSubmit={handleSubmit}>
          <SimpleGrid justifyContent={'center'} columns={12}>
            <GridItem mb={6} colSpan={12}>
              <FormControl isInvalid={Boolean(errors.full_name)}>
                <FormLabel color={'whiteAlpha.700'}>Full Name</FormLabel>
                <Input
                  name="full_name"
                  onChange={handleChange}
                  placeholder={'Lapis Lazuli'}
                  value={values.full_name}
                  background={'whiteAlpha.900'}
                  color={'gray.900'}
                />
                <FormErrorMessage>{errors.full_name}</FormErrorMessage>
              </FormControl>
            </GridItem>
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
                  SIGNUP
                </Button>
              </Flex>
            </GridItem>
          </SimpleGrid>
        </form>
      </Box>
      <Flex align={'center'}>
        <Text mr={3} textColor={'whiteAlpha.900'}>
          Already have account ?
        </Text>
        <Button
          variant={'link'}
          mt={-0.3}
          lineHeight={'initial'}
          onClick={() => setMenu('login')}
        >
          Login
        </Button>
      </Flex>
    </VStack>
  );
};
