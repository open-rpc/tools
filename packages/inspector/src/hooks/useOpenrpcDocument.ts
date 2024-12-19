import { useEffect, useState } from 'react';

const useOpenrpcDocument = (openrpcDocument?: string, schemaUrl?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [openrpcDoc, setOpenrpcDoc] = useState<any>(openrpcDocument);
  useEffect(() => {
    async function retrieveOpenrpcDocument() {
      try {
        if (!openrpcDocument && schemaUrl) {
          const response = await fetch(schemaUrl);
          const doc = await response.json();
          setOpenrpcDoc(doc);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (e: any) {
        setOpenrpcDoc(undefined);
      }
    }
    retrieveOpenrpcDocument();
  }, [openrpcDocument, schemaUrl]);
  return openrpcDoc;
};

export default useOpenrpcDocument;
