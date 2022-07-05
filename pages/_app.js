import { ChakraProvider } from "@chakra-ui/react";
import SideBar from "../Components/SideBar";


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
     

        <Component {...pageProps} />

    </ChakraProvider>
  );
}

export default MyApp;
