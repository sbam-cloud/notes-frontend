import { Box, FormControl, FormLabel, Link, Stack, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { InternalError } from "../errors";
import { DecryptErrorType } from "./AskSecretForDecrypting";
import LoadingSpinner from "./LoadingSpinner";

interface APIResponse {
  message: string;
}

export interface DecryptResultProps {
  id: string;
  secret: string;
  onDecryptError: (type: DecryptErrorType) => void;
}

export default function DecryptResult(props: DecryptResultProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function decrypt(id: string, secret: string): Promise<void> {
    const url = new URL(id, import.meta.env.VITE_API_ENDPOINT!).toString();
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ secret }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.status == 404) {
      props.onDecryptError(DecryptErrorType.NotFound);
    } else if (response.status == 422) {
      props.onDecryptError(DecryptErrorType.WrongSecret);
    } else if (response.status >= 400) {
      setErrorMessage(await response.text());
    } else {
      const data: APIResponse = await response.json();
      setDecryptedMessage(data.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    decrypt(props.id, props.secret);
  }, [props.id, props.secret]);

  return (
    <Box>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        errorMessage ? (
          <InternalError />
        ) : (
          <>
            <FormControl id='decryptedMessage'>
              <FormLabel>Message</FormLabel>
              <Textarea readOnly value={decryptedMessage!} />
            </FormControl>
            <Stack align='center' alignSelf='center' marginTop={5}>
              <Link as={ReactRouterLink} to='/'>Share a note!</Link>
            </Stack>
          </>
        )
      )}
    </Box>
  )
}
