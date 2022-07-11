import {
  Box,
  Heading,
  Button,
  Stack,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,

} from "@chakra-ui/react";

import HeaderDrawer from "./HeaderDrawer";
import useInput from "../hooks/useInput";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectButton from "./SelectButton";
import text from "../utils/Text"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ArticleEdition = () => {
  const titulo = useInput();
  const volanta = useInput();
  const tituloMovil = useInput();
  const autor = useInput();
  const Paragraph = useInput();
  const SectionTitle = useInput();
  const OList = useInput();
  const IMG = useInput();

  





    //handlesubmit


  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log("entre", titulo.value, volanta.value, autor.value, items);
    axios
      .post("http://localhost:3001/api/news", {
        title: titulo.value,
        subtitle: volanta.value,
        field_credits: autor.value,
        content: items,
      })
      .then((res) => {
        alert(`guardada con exito`);
      })
      .catch((err) => {
        alert("prueba de nuevo"), console.log(err);
      });
  };

  //drag and drop
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(text);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    console.log({ reorderedItems });
    setItems(reorderedItems);
  };

  return (
    <Box backgroundColor={"hsl(336deg 56% 98%)"} alignItems="center">
      <HeaderDrawer></HeaderDrawer>
      <Box
        boxShadow="xl"
        p="6"
        rounded="md"
        backgroundColor={"hsl(336deg 56% 98%)"}
      >
        <Container maxW="xl" centerContent>
          <Box>
            <Stack spacing={4} direction="row" align="center">
              <Heading
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="900"
                color="#ED2D6E"
              >
                {titulo.value}
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
                onClick={handlerSubmit}
              >
                Guardar
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container marginTop={2} maxW="60%" centerContent bg={"white"}>
        <FormControl id="Titulo Basico" isRequired>
          <FormLabel>Titulo Basico</FormLabel>
          <Input placeholder="Titulo Basico" {...titulo} />
        </FormControl>

        <FormControl id="Volanta">
          <FormLabel>Volanta</FormLabel>
          <Input
            placeholder="Volanta"
            value={volanta.value}
            onChange={volanta.onChange}
          />
        </FormControl>

        <FormControl id="Titulo Movil">
          <FormLabel>Titulo Movil</FormLabel>
          <Input placeholder="Titulo Movil" {...tituloMovil} />
        </FormControl>

        <FormControl id="Autor">
          <FormLabel>Autor</FormLabel>
          <Input placeholder="Autor" {...autor} />
        </FormControl>

        <Box
          bg="#f7dde6"
          marginTop={2}
          boxShadow="xl"
          p="1"
          width="100%"
          rounded="md"
          centerContent
        >
          <Text color="hsl(345deg 50% 55%)">Contenido, escoge tu orden!</Text>
        </Box>
       
          <Box width="100%" marginTop={5}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                          border='2px' borderColor='black'  
                          borderRadius='10px'   
                          padding="20px"   
                          margin="20px"                
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            snapshot={snapshot}
                          >
                            <FormControl id={item.content}>
                              <FormLabel>{item.type}</FormLabel>
                              <Input placeholder={item.type} {...item.type} />
                            </FormControl>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
     <SelectButton></SelectButton>

          </Box>
        
      </Container>
    </Box>
  );
};

export default ArticleEdition;
