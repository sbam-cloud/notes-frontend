import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, HStack, Input, Stack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DecryptResult from "./DecryptResult";
import HintsPanel from "./HintsPanel";

export enum DecryptErrorType {
  NotFound,
  WrongSecret,
}

export interface AskSecretForDecryptingProps {
  id: string;
  onNotFoundError: () => void;
}

export default function AskSecretForDecrypting(props: AskSecretForDecryptingProps) {
  let [secret, setSecret] = useState<string>("");
  let [secretEditing, setSecretEditing] = useState<boolean>(false);
  let [decrypting, setDecrypting] = useState<boolean>(false);
  let [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlSecret = window.location.hash.substring(1);
    setSecret(urlSecret);
    setSecretEditing(!urlSecret);
    setDecrypting(false);
    setError(null);
  }, [props.id]);

  const onDecryptError = (type: DecryptErrorType) => {
    if (type == DecryptErrorType.WrongSecret) {
      setError("Cannot decrypt the secret message. Please provide a valid secret");
      setDecrypting(false);
      setSecretEditing(true);
    } else {
      props.onNotFoundError();
    }
  }

  useEffect(() => {
    if (decrypting == true) {
      setError(null);
    }
  }, [decrypting]);

  if (decrypting) {
    return <DecryptResult id={props.id} secret={secret} onDecryptError={onDecryptError}/>;
  }

  if (!secretEditing) {
    return (
      <Container as={Stack} align='center'>
        <VStack w='fit-content'>
          <Alert status="warning">
            <AlertIcon />
            <Box>
              <AlertTitle>The message will self destruct</AlertTitle>
              <AlertDescription>
                <p>Once you will click "Decrypt" you will be able to read the message content <strong>just once</strong>.</p>
                <p>If you need to access it again please store its content in a secure location</p>
              </AlertDescription>
            </Box>
          </Alert>
          <HStack justify='flex-end' paddingTop={2} w='full' h={100}>
            <Button type='submit' disabled={secret.length === 0} onClick={() => setDecrypting(true)}>Decrypt</Button>
          </HStack>
        </VStack>
      </Container>
    );
  }

  return (
    <Box justifyContent="stretch" display={{ md: "flex" }}>
      <HintsPanel>
        <Alert status="warning">
          <AlertIcon />
          <Box>
            <AlertTitle>The message will self destruct</AlertTitle>
            <AlertDescription>
              <p>Once you will click "Decrypt" you will be able to read the message content <strong>just once</strong>.</p>
              <p>If you need to access it again please store its content in a secure location</p>
            </AlertDescription>
          </Box>
        </Alert>
      </HintsPanel>
      <Flex w='full' direction='column' mt={{ base: 5, md: 0 }}>
        <FormControl id='message' h='full' as={Flex} flexDirection='column' isInvalid={!!error}>
          <FormLabel htmlFor='secret'>Message Secret</FormLabel>
          <Input id='secret' type="password" value={secret} onChange={(e) => setSecret(e.target.value) } />
          {!!error ? (<FormHelperText>{error}</FormHelperText>) : undefined}
        </FormControl>
        <HStack justify='flex-end' paddingTop={2} w='full' h={100}>
          <Button type='submit' disabled={secret.length === 0} onClick={() => setDecrypting(true)}>Decrypt</Button>
        </HStack>
      </Flex>
    </Box>
  );
}
