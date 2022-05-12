import { Spinner, Stack } from "@chakra-ui/react";

const LoadingSpinner= () => (
  <Stack align='center' alignSelf='center' w='full'>
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
  </Stack>
);

export default LoadingSpinner;
