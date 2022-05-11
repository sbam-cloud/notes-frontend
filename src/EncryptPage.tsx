import { Alert, Box, Button, Flex, FormControl, FormLabel, HStack, Input, Link, Stack, Textarea, Tooltip, VStack } from "@chakra-ui/react";
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

  return (
    <Box>
      {generatedUrl === null ? (
        <form onSubmit={formik.handleSubmit}>
          <Box justifyContent='stretch' display={{ md: 'flex' }}>
            <Box mx={{ md: 5 }} p={5} borderWidth={1} borderRadius='5px' w='auto' sx={{ gap: 25 }} whiteSpace={{ md: 'nowrap' }} order={{ md: 1 }}>
              <p>Type the message you want to share and click <strong>Encrypt</strong>.</p>
              <p>We store the encrypted message only and give you a<br/>URL containing the encryption key.</p>
              <Alert status='warning'>Nobody can read your message<br/>without the encryption key.</Alert>
              <p>Using the link you can decipher the message.</p>
              <Alert status='warning'>It will self-destroy after opening it.</Alert>
              <p>If the link is not used, the message expires after 7 days.</p>
            </Box>
            <Flex w='full' direction='column' mt={{ base: 5, md: 0 }}>
              <FormControl id='message' h='full' as={Flex} flexDirection='column'>
                <FormLabel>Message</FormLabel>
                <Textarea onChange={formik.handleChange} value={formik.values.message} resize='vertical' h='full' minH={200} />
              </FormControl>
              <HStack justify='flex-end' paddingTop={2} w='full' h={100}>
                <Button type='submit'>Encrypt</Button>
              </HStack>
            </Flex>
          </Box>
        </form>
      ) : (
        <FormControl id='generatedUrl'>
          <FormLabel>Generated Link</FormLabel>
          <HStack w='full'>
            <Input readOnly value={generatedUrl} />
            <Tooltip label="Link copied!" isOpen={urlCopiedToClipboard}>
              <Button onClick={() => handleCopyToClipboard(generatedUrl)}>Copy</Button>
            </Tooltip>
          </HStack>
          <Stack align='center' alignSelf='center' marginTop={5}>
            <Link onClick={handleReset}>Share a new note!</Link>
          </Stack>
        </FormControl>
      )}
    </Box>
  )
}
