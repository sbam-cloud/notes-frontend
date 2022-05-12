import { Alert, Box, Button, Flex, FormControl, FormLabel, HStack, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import HintsPanel from "./HintsPanel";
import LoadingSpinner from "./LoadingSpinner";

export default function EncryptForm({ onEncryptError, setGeneratedUrl }: { onEncryptError: (status: number) => void, setGeneratedUrl: (url: string | null) => void }) {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, helpers) => {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT!, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      formik.resetForm();
      if (response.status >= 400) {
        onEncryptError(response.status);
      } else {
        const data = await response.json();
        setGeneratedUrl(`${window.location.origin}/${data.id}#${data.secret}`);
      }
    }
  });

  return (
    <Box justifyContent='stretch' display={{ md: 'flex' }}>
      <HintsPanel>
        <p>Type the message you want to share and click <strong>Encrypt</strong>.</p>
        <p>We store the encrypted message and give you the encryption key.</p>
        <Alert status='warning'>Nobody can read your message without the encryption key.</Alert>
      </HintsPanel>
      {formik.isSubmitting ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <Flex w='full' direction='column' mt={{ base: 5, md: 0 }}>
            <FormControl id='message' h='full' as={Flex} flexDirection='column'>
              <FormLabel>Message</FormLabel>
              <Textarea onChange={formik.handleChange} value={formik.values.message} resize='vertical' h='full' minH={200} />
            </FormControl>
            <HStack justify='flex-end' paddingTop={2} w='full' h={100}>
              <Button type='submit'>Encrypt</Button>
            </HStack>
          </Flex>
        </form>
      )}
    </Box>
  );
}
