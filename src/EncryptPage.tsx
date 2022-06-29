import { useState } from "react";
import EncryptForm, { EncryptDetails } from "./components/EncryptForm";
import EncryptResult from "./components/EncryptResult";
import { InternalError } from "./errors";

export default function EncryptPage() {
  const [generatedDetails, setGeneratedDetails] = useState<EncryptDetails | null>(null);
  const [encryptError, setEncryptError] = useState<number | null>(null);

  const handleReset = () => { setGeneratedDetails(null) };

  if (encryptError) {
    return <InternalError />;
  }
  if (generatedDetails) {
    return <EncryptResult generatedDetails={generatedDetails} onClearUrl={handleReset} />;
  }
  return <EncryptForm onEncryptComplete={setGeneratedDetails} onEncryptError={setEncryptError} />;
}
