import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type DecryptRouteParams = {
  id: string;
}

interface DecryptResponse {
  message: string;
}

export default function Decrypt() {
  const { id } = useParams<DecryptRouteParams>();
  const secret = window.location.hash.substring(1);
  const [isLoading, setIsLoading] = useState(true);
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null)

  async function decrypt(id: string, hash: string): Promise<void> {
    const decryptUrl = new URL(`decrypt/${id}`, import.meta.env.VITE_API_ENDPOINT!).toString();
    const response = await fetch(decryptUrl, {
      method: 'POST',
      body: JSON.stringify({ secret: hash }),
    });
    const data: DecryptResponse = await response.json();
    setDecryptedMessage(data.message);
    setIsLoading(false);
  }

  useEffect(() => {
    decrypt(id!, secret);
  }, [id, secret]);

  return (
    <div className="App">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <p>{decryptedMessage}</p>
      )}
    </div>
  )
}
