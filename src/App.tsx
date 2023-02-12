import { motion } from 'framer-motion';
import { useState } from 'react';

import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';

import ThemeToggleButton from './components/ThemeToggleButton';
import logo from './logo.svg';
import { Layout } from './components/layouts/Layout';
import { ModalsContainer } from './components/dialogs/ModalsContainer';

function App(): JSX.Element {
  return (
    <>
      <ModalsContainer />
      <Layout />
    </>
  );
}

export default App;
