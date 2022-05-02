import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

interface AppProps {
  children: JSX.Element | JSX.Element[];
}

const App = (props: AppProps) => (
  <ChakraProvider theme={theme}>
    <Box m={2}>
      {props.children}
    </Box>
  </ChakraProvider>
);

export default App;
