import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Link, Stack, Textarea, Tooltip } from "@chakra-ui/react";
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
          <FormControl id='message'>
            <FormLabel>Message</FormLabel>
            <Textarea onChange={formik.handleChange} value={formik.values.message} />
          </FormControl>
          <HStack justify='flex-end' paddingTop={2} w='full'>
            <Button type='submit'>Encrypt</Button>
          </HStack>
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
