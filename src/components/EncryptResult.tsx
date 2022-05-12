import { Alert, Box, Button, Flex, FormControl, FormLabel, HStack, Input, Link, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { copyTextToClipboard } from "../utils";
import HintsPanel from "./HintsPanel";

export interface EncryptResultProps {
  generatedUrl: string;
  onClearUrl: () => void;
}

export default function EncryptResult({ generatedUrl, onClearUrl }: EncryptResultProps) {
  const [urlCopiedToClipboard, setUrlCopiedToClipboard] = useState<boolean>(false);

  useEffect(() => {
    if (urlCopiedToClipboard) {
      const timeout = setTimeout(() => {
        setUrlCopiedToClipboard(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [urlCopiedToClipboard]);

  const handleCopyToClipboard = async (generatedUrl: string) => {
    await copyTextToClipboard(generatedUrl);
    setUrlCopiedToClipboard(true);
  };

  const handleReset = () => {
    onClearUrl();
    setUrlCopiedToClipboard(false);
  }

  return (
    <Box justifyContent='stretch' display={{ md: 'flex' }}>
      <HintsPanel>
        <p>The message you encrypted can be read only by <strong>using the generated link</strong>.</p>
        <Alert status='warning'>Remember: the message is destroyed once it has been read.</Alert>
        <p>The message expires automatically after 7 days.</p>
      </HintsPanel>
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
  );
}
