"use client"
import { Loader } from "@/components/Loader/Loader";
import { createContext, ReactNode, useContext, useState } from "react"

type LoadingContextProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void
}

const LoadingContext = createContext({} as LoadingContextProps)

export const LoadingContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{
      isLoading, 
      setIsLoading
    }}>
      <Loader isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingContextProvider");
  }

  return context;
}