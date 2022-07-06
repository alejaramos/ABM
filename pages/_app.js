import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "../Context/AuthContext";



function MyApp({ Component, pageProps }) {
  return (
    
    <ChakraProvider>
      <AuthContextProvider>
      <Component {...pageProps} />
      </AuthContextProvider>
      
    </ChakraProvider>
  );
}

export default MyApp;
