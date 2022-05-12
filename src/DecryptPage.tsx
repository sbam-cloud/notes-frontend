import { Box, FormControl, FormLabel, Link, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { InternalError, NotFoundError } from "./errors";

type DecryptPageRouteParams = {
  id: string;
}

interface DecryptResponse {
  message: string;
}

const renderError = (errorCode: number) => {
  if (errorCode === 404) {
    return <NotFoundError />;
  }
  return <InternalError />;
}

export default function DecryptPage() {
  const { id } = useParams<DecryptPageRouteParams>();
  const secret = window.location.hash.substring(1);
  const [isLoading, setIsLoading] = useState(true);
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const [decryptError, setDecryptError] = useState<number | null>(null);

  async function decrypt(id: string, hash: string): Promise<void> {
    const decryptUrl = new URL(id, import.meta.env.VITE_API_ENDPOINT!).toString();
    const response = await fetch(decryptUrl, {
      method: 'POST',
      body: JSON.stringify({ secret: hash }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.status >= 400) {
      setDecryptError(response.status);
    } else {
      const data: DecryptResponse = await response.json();
      setDecryptedMessage(data.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    decrypt(id!, secret);
  }, [id, secret]);

  return (
    <Box>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        decryptError ?
          renderError(decryptError)
        : (
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
