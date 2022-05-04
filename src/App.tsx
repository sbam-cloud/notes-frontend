import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Footer from './Footer';

interface AppProps {
  children: JSX.Element | JSX.Element[];
}

const App = (props: AppProps) => (
  <Stack minH='100vh' p={0} direction='column' align='flex-start'>
    <Stack textAlign='center' py={{ base: 8, md: 30 }} bgColor={useColorModeValue('blue.100', 'blue.900')} w='full'>
      <Heading>
        SBAM Notes<br/>
      </Heading>
      <Text>Share sensitive information with self destructing links</Text>
    </Stack>
    <Box m={2} pt={{ base: 4, md: 10 }} pb={4} px={4} w='full' h='full' flexGrow={1}>
      {props.children}
    </Box>
    <Footer />
  </Stack>
);

export default App;
