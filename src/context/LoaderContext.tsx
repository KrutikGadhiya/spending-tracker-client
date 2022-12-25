import React, { createContext, useState } from "react";

interface LoaderContextInterface {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
interface Props {
  children: React.ReactNode;
}

export const LoaderContext = createContext({} as LoaderContextInterface);

const initialState: LoaderContextInterface = {
  isLoading: false,
  setIsLoading: () => {},
};

const LoaderContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(initialState.isLoading);

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider;
