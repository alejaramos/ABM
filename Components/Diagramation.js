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
  Flex,
  VStack,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";

import SchemaMenu from "../Common/SchemaMenu";
import useInput from "../hooks/useInput";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SchemaContext } from "../Context/SchemaContext";
import SectionTable from "./SectionTable";
import { Router, useRouter } from "next/router";

const Diagramation = ({ sections }) => {
  const [renderedSections, setRenderedSections] = useState(sections);
  const title = useInput();
  const toast = useToast();

  const { schema, setChema } = useContext(SchemaContext);

  const handleSubmit = () => {
    axios
      .post("https://rito-mono.herokuapp.com/api/section/", {
        title: title.value,
        schema: schema,
        color: "#ec4f6c",
      })
      .then((res) => {
        toast({
          title: "Creado exitosamente",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        window.location.reload();
      })
      .catch((err) => {
        toast({
          title: "No se pudo crear",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        console.log(err);
      });
  };

  return (
    <Box>
      <Box
        px="3em"
        ml={"13em"}
        backgroundColor="#fcf2f6"
        justifyContent="right"
      >
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
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <Box>
                <FormLabel>Nombre de seccion</FormLabel>
                <Input {...title} id="title" type="text" placeholder="Titulo" />
              </Box>
              {/* <Box>
              <FormLabel>Contenido</FormLabel>
              <EmotionMenu />
            </Box> */}
              <Flex alignItems={"flex-end"} justifyContent={"center"}>
                <Button
                  backgroundColor=" #E32B6C"
                  color="white"
                  borderRadius="40px"
                  my="0.5em"
                  height="30px"
                  width="30%"
                  onClick={handleSubmit}
                >
                  Crear
                </Button>
              </Flex>
            </Grid>
            <Box width={"100%"}>
              <FormLabel>Schema</FormLabel>
              <SchemaMenu />
            </Box>
          </FormControl>
        </Box>
      </Box>
      <Box px="3em" ml={"13em"} justifyContent="right">
        <SectionTable sections={renderedSections} />
      </Box>
    </Box>
  );
};

export default Diagramation;
