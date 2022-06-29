import { Alert, Box, Button, Flex, FormControl, FormLabel, HStack, Input, Link, Tab, TabList, TabPanel, TabPanels, Tabs, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { copyTextToClipboard } from "../utils";
import { EncryptDetails } from "./EncryptForm";
import HintsPanel from "./HintsPanel";

export interface EncryptResultProps {
  generatedDetails: EncryptDetails;
  onClearUrl: () => void;
}

export default function EncryptResult({ generatedDetails, onClearUrl }: EncryptResultProps) {
  const fullGeneratedUrl = `${generatedDetails.url}#${generatedDetails.secret}`;
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
        <Tabs>
          <TabList>
            <Tab>Quick share</Tab>
            <Tab>Paranoid mode</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormControl>
                <FormLabel>Generated Link</FormLabel>
                <HStack w='full'>
                  <Input readOnly value={fullGeneratedUrl} />
                  <Tooltip label="Link copied!" isOpen={urlCopiedToClipboard}>
                    <Button onClick={() => handleCopyToClipboard(fullGeneratedUrl)}>Copy</Button>
                  </Tooltip>
                </HStack>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl>
                <FormLabel>1. Share this URL using one communication channel (e.g. email)</FormLabel>
                <HStack w='full'>
                  <Input readOnly value={generatedDetails.url} />
                  <Tooltip label="Link copied!" isOpen={urlCopiedToClipboard}>
                    <Button onClick={() => handleCopyToClipboard(generatedDetails.url)}>Copy</Button>
                  </Tooltip>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel>2. Share the message secret via a different communication channel (e.g. chat)</FormLabel>
                <HStack w='full'>
                  <Input readOnly value={generatedDetails.secret} type='password'/>
                  <Tooltip label="Link copied!" isOpen={urlCopiedToClipboard}>
                    <Button onClick={() => handleCopyToClipboard(generatedDetails.secret)}>Copy</Button>
                  </Tooltip>
                </HStack>
              </FormControl>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <HStack justify='flex-end' paddingTop={2} w='full' h={100}>
          <Link onClick={handleReset}>Share a new note!</Link>
        </HStack>
      </Flex>
    </Box>
  );
}
