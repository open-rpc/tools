import { useState, Dispatch } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSearchBar = (defaultValue: string | undefined): [string | undefined, Dispatch<any>] => {
  const [searchUrl, setSearchUrl] = useState<string | undefined>(defaultValue);
  return [searchUrl, setSearchUrl];
};

export default useSearchBar;
