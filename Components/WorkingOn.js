import { Box,Grid, GridItem, Heading, Button, IconButton, Icon,useMediaQuery, Image } from "@chakra-ui/react";



export default function WorkingOn() {
 

    
    return (
      <Box marginLeft={"5%"}>
      <Heading>Aun estamos trabajando</Heading>
      <Image src='WorkInPorgress.png' alt='Working in process' />
      </Box>
    );
  }