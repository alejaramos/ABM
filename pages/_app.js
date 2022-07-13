import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "../Context/AuthContext";
import SchemaContextProvider from "../Context/SchemaContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <SchemaContextProvider>
          <Component {...pageProps} />
        </SchemaContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
