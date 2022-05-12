import { useState } from "react";
import EncryptForm from "./components/EncryptForm";
import EncryptResult from "./components/EncryptResult";
import { InternalError } from "./errors";

export default function EncryptPage() {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [encryptError, setEncryptError] = useState<number | null>(null);

  const handleReset = () => { setGeneratedUrl(null) };

  if (encryptError) {
    return <InternalError />;
  }
  if (generatedUrl) {
    return <EncryptResult generatedUrl={generatedUrl} onClearUrl={handleReset} />;
  }
  return <EncryptForm setGeneratedUrl={setGeneratedUrl} onEncryptError={setEncryptError} />;
}
