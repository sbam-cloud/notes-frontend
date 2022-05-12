import { Alert, Box, Button, Flex, FormControl, FormLabel, HStack, Input, Link, Spinner, Stack, Textarea, Tooltip, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { InternalError } from "./errors";
import { copyTextToClipboard } from "./utils";

export default function EncryptPage() {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [urlCopiedToClipboard, setUrlCopiedToClipboard] = useState<boolean>(false);
  const [encryptError, setEncryptError] = useState<number | null>(null);

  useEffect(() => {
    if (urlCopiedToClipboard) {
      const timeout = setTimeout(() => {
        setUrlCopiedToClipboard(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [urlCopiedToClipboard]);

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
      if (response.status >= 400) {
        setEncryptError(response.status);
      } else {
        const data = await response.json();
        setGeneratedUrl(`${window.location.origin}/${data.id}#${data.secret}`);
      }
    }
  });
  const handleCopyToClipboard = async (generatedUrl: string) => {
    await copyTextToClipboard(generatedUrl);
    setUrlCopiedToClipboard(true);
  };
  const handleReset = () => {
    formik.resetForm();
    setUrlCopiedToClipboard(false);
    setGeneratedUrl(null);
  };

  if (encryptError) {
    return <InternalError />;
  }

  if (generatedUrl) {
    return (
      <Box justifyContent='stretch' display={{ md: 'flex' }}>
        <Box marginLeft={{ md: 5 }} p={{ md: 5 }} sx={{ gap: 25 }} whiteSpace={{ md: 'nowrap' }} order={{ md: 1 }} lineHeight={2} fontSize='sm'>
          <p>The message you encrypted can be read only by <strong>using the generated link</strong>.</p>
          <Alert status='warning'>Remember: the message is destroyed once it has been read.</Alert>
          <p>The message expires automatically after 7 days.</p>
        </Box>
        <Flex w='full' direction='column' mt={{ base: 5, md: 0 }}>
          <FormControl id='generatedUrl'>
            <FormLabel>Generated Link</FormLabel>
            <HStack w='full'>
              <Input readOnly value={generatedUrl} />
              <Tooltip label="Link copied!" isOpen={urlCopiedToClipboard}>
                <Button onClick={() => handleCopyToClipboard(generatedUrl)}>Copy</Button>
              </Tooltip>
            </HStack>
          </FormControl>
          <HStack justify='flex-end' paddingTop={2} w='full' h={100}>
          <Link onClick={handleReset}>Share a new note!</Link>
          </HStack>
        </Flex>
      </Box>
    )
  }
  return (
    <Box justifyContent='stretch' display={{ md: 'flex' }}>
      <Box marginLeft={{ md: 5 }} p={{ md: 5 }} sx={{ gap: 25 }} whiteSpace={{ md: 'nowrap' }} order={{ md: 1 }} lineHeight={2} fontSize='sm'>
        <p>Type the message you want to share and click <strong>Encrypt</strong>.</p>
        <p>We store the encrypted message and give you the encryption key.</p>
        <Alert status='warning'>Nobody can read your message without the encryption key.</Alert>
      </Box>
      {formik.isSubmitting ? (
        <Stack align='center' alignSelf='center' w='full'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Stack>
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
