import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../Components/SideBar";



function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      
      <Component {...pageProps} />
      
    </ChakraProvider>
  );
}

export default MyApp;
