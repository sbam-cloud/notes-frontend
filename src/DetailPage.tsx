import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AskSecretForDecrypting from "./components/AskSecretForDecrypting";
import LoadingSpinner from "./components/LoadingSpinner";

type DetailPageRouteParams = {
  id: string;
}

export default function DetailPage() {
  const { id } = useParams<DetailPageRouteParams>();
  const [isLoading, setIsLoading] = useState(true);
  const [messageExists, setMessageExists] = useState<boolean>(false);

  async function checkMessageExistence(id: string): Promise<void> {
    const url = new URL(id, import.meta.env.VITE_API_ENDPOINT!).toString();
    const response = await fetch(url, {
      method: 'HEAD',
    });
    if (response.status >= 400) {
      setMessageExists(false);
    } else {
      setMessageExists(true);
    }
    setIsLoading(false);
  }

  function onNotFound() {
    setMessageExists(false);
    setIsLoading(false);
  }

  useEffect(() => {
    checkMessageExistence(id!);
  }, [id]);

  return (
    <Box>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        messageExists ? (
          <AskSecretForDecrypting id={id!} onNotFoundError={() => onNotFound()} />
        ) : (
          <Alert status="error" justifyContent="center">
            <AlertIcon />
            <Box>
              <AlertTitle>Sorry, we couldn't find any note for you</AlertTitle>
              <AlertDescription>The message you are trying to retrieve does not exist or it has already been read.</AlertDescription>
            </Box>
          </Alert>
        )
      )}
    </Box>
  )
}
