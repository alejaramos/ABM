import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import {
  Box,
  Heading,
  Button,
  Stack,
  Center,
  Spacer,
  Container,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";

import HeaderDrawer from "../../Components/HeaderDrawer";

export default function Option() {
  const router = useRouter();
  const { articlename } = router.query;

  return (
    <Box backgroundColor={"hsl(336deg 56% 98%)"} alignItems="center">
      <HeaderDrawer></HeaderDrawer>
      <Box  boxShadow='xl' p='6' rounded='md' backgroundColor={"hsl(336deg 56% 98%)"}>
      <Container maxW="xl" centerContent >
        <Box  >
          <Stack spacing={4} direction="row" align="center">
            <Heading
              fontSize="2xl"
              fontFamily="monospace"
              fontWeight="900"
              color="#ED2D6E"
            >
              {" "}
              Titulo del articulo
            </Heading>

            <Button
              _hover={{ bg: "#ED2D6E" }}
              _active={{
                bg: "#dddfe2",
                transform: "scale(0.98)",
                borderColor: "#bec3c9",
              }}
              borderRadius="15px"
              colorScheme="#ED2D6E"
              color="white"
              bg="hsl(342deg 68% 56%)"
              variant="outline"
              size="sm"
            >
              Guardar
            </Button>
          </Stack>
        </Box>
      </Container>
      </Box>



      <Container  marginTop={2} maxW="60%"centerContent bg={"white"}>

  <FormControl id="first-name" isRequired>
  <FormLabel>Titulo Basico</FormLabel>
  <Input placeholder="Titulo Basico" />
</FormControl>

</Container>

    </Box>
  );
}
