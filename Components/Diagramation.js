import {
  Input,
  Button,
  Grid,
  Box,
  FormLabel,
  Radio,
  Select,
  FormControl,
  Heading,
  VStack,
} from "@chakra-ui/react";
import EmotionMenu from "../Common/EmotionMenu";
import SchemaMenu from "../Common/SchemaMenu";
import Link from "next/link";

const Diagramation = () => {
  return (
    <Box px="3em" ml={"13em"} backgroundColor="#fcf2f6" justifyContent="right">
      <Box
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        py="0.25em"
      >
        <Heading>Secciones</Heading>
      </Box>
      <Box
        width="90%"
        borderWidth="2px"
        borderColor="#E32B6C"
        borderRadius="1%"
        backgroundColor="white"
        p="1em"
      >
        <FormControl>
          <Grid templateColumns="repeat(3, 1fr)" gap={3}>
            <Box>
              <FormLabel>Nombre de seccion</FormLabel>
              <Input id="title" type="text" placeholder="Palabras Clave" />
            </Box>
            <Box>
              <FormLabel>Contenido</FormLabel>
              <EmotionMenu />
            </Box>
            <Box>
              <FormLabel>Schema</FormLabel>
              <SchemaMenu />
            </Box>

            <Button
              backgroundColor=" #E32B6C"
              color="white"
              borderRadius="40px"
              my="0.5em"
              height="30px"
              width="30%"
            >
              Enviar
            </Button>
          </Grid>
        </FormControl>
      </Box>
      <Heading>Secciones actuales</Heading>
    </Box>
  );
};

export default Diagramation;
//  return (
//     <VStack>
//       <Heading size="xl">Editar secciones</Heading>
//       <div> SECCIONES</div>
//       <div>
//         ULTIMAS NOTICIAS <EmotionMenu />
//       </div>
//       <div>
//         DIMENSIONES <EmotionMenu />
//       </div>
//       <div>
//         AMOR
//         <EmotionMenu />
//       </div>
//     </VStack>
//   );
