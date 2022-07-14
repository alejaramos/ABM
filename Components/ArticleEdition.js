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
  IconButton,
  InputRightElement,
  InputGroup,
  Select,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import HeaderDrawer from "./HeaderDrawer";
import useInput from "../hooks/useInput";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ArticleEdition = ({ news }) => {
  const toast = useToast();
  const router = useRouter();
  const titulo = useInput(news?.title);
  const volanta = useInput(news?.subtitle);
  const category = useInput(news?.field_category);
  const autor = useInput(news?.field_credits);
  const IMG = useInput(news?.field_img_primary);
  const date = useInput(news?.publication_date);

  const arr = [];
  //handlesubmit

  const handlerSubmit = (e) => {
    e.preventDefault();
    const trimDate = date.value.slice(0, 10);
    axios
      .post("https://rito-mono.herokuapp.com/api/news", {
        title: titulo.value,
        subtitle: volanta.value,
        field_credits: autor.value,
        field_category: category.value,
        content: items,
        field_img_primary: IMG.value,
        publication_date: trimDate,
      })
      .then(() => {
        toast({
          position: "top",
          title: "Hecho.",
          description: "Has creado una nueva nota.",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        router.push("/edition/Historias");
      })
      .catch((err) => {
        toast({
          position: "top",
          title: "ERROR.",
          description: "No se pudo crear la nota.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        console.log(err);
      });
  };

  const handlerUpdate = (e) => {
    e.preventDefault();
    const trimDate = date.value.slice(0, 10);
    axios
      .put(`https://rito-mono.herokuapp.com/api/news/${news._id}`, {
        title: titulo.value,
        subtitle: volanta.value,
        field_credits: autor.value,
        field_category: category.value,
        content: items,
        field_img_primary: IMG.value,
        publication_date: trimDate,
      })
      .then((res) => {
        toast({
          position: "top",
          title: "Hecho.",
          description: "Has actualizado la nota.",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        router.push("/edition/Historias");
      })
      .catch((err) => {
        toast({
          position: "top",
          title: "ERROR.",
          description: "No se pudo actualizar la nota.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        console.log(err);
      });
  };

  //drag and drop
  const [items, setItems] = useState(news?.content || []);

  const arrInput = () => {
    for (let i = 0; i < 50; i++) {
      arr.push(useInput(news?.content[i]?.content));
    }
    return arr;
  };

  arrInput();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  //deberia ser un push al arreglo de objetos a items
  const handlerAdd = (e) => {
    const newItem = {
      type: e.target.value,
      content: undefined,
    };

    setItems([...items, newItem]);
  };

  // Para eliminar el TextArea elegido.
  const deleteClick = (i) => {
    const deltedItem = items[i];
    setItems(items.filter((item) => item !== deltedItem));
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
              <Heading fontSize="2xl" fontWeight="900" color="#ED2D6E">
                {titulo.value}
              </Heading>

              {news ? (
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
                  // variant="outline"
                  minWidth='100px'
                  width='100px'
                  size="sm"
                  onClick={handlerUpdate}
                >
                  Actualizar
                </Button>
              ) : (
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
                  minWidth='100px'
                  width='100px'
                  size="sm"
                  disabled={titulo.value.length === 0 ? "true" : null}
                  onClick={handlerSubmit}
                >
                  + CREAR
                </Button>
              )}
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

        <FormControl id="category">
          <FormLabel>Categoría</FormLabel>
          <Input placeholder="Categoría" {...category} />
        </FormControl>

        <FormControl id="Autor">
          <FormLabel>Autor</FormLabel>
          <Input placeholder="Autor" {...autor} />
        </FormControl>

        <FormControl id="Date">
          <FormLabel>Fecha de Publicación</FormLabel>
          <Input
            type="date"
            placeholder="Fecha de Publicación"
            value={date.value}
            onChange={date.onChange}
          />
        </FormControl>
        <FormControl id="IMG">
          <FormLabel>Imagen Principal</FormLabel>
          <Input
            type="url"
            placeholder="Link a la imagen"
            value={IMG.value}
            onChange={IMG.onChange}
          />
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
                  {console.log("SOY ITEMS", items)}
                  {items.map((item, index) => {
                    const indexS = index.toString();
                    return (
                      <Draggable
                        key={indexS}
                        draggableId={indexS}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            border="2px"
                            borderColor="black"
                            borderRadius="10px"
                            padding="20px"
                            margin="20px"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            snapshot={snapshot}
                          >
                            <FormControl
                              id={(item.content = arr[indexS].value)}
                            >
                              <FormLabel>{item.type}</FormLabel>
                              <InputGroup>
                                <Textarea
                                  placeholder={item.type}
                                  value={arr[indexS].value}
                                  onChange={arr[indexS].onChange}
                                />
                                <InputRightElement
                                  children={
                                    <IconButton
                                      onClick={() => deleteClick(index)}
                                      border="none"
                                      variant="outline"
                                      colorScheme="red"
                                      aria-label="delete"
                                      icon={<DeleteIcon />}
                                    />
                                  }
                                />
                              </InputGroup>
                            </FormControl>
                          </Box>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Select
            my="2em"
            hover={{ bg: "#ED2D6E" }}
            _active={{
              bg: "#dddfe2",
              transform: "scale(0.98)",
              borderColor: "#bec3c9",
            }}
            borderRadius="15px"
            colorScheme="#ED2D6E"
            bg="hsl(342deg 68% 56%)"
            variant="outline"
            size="sm"
            onChangeCapture={handlerAdd}
            color="white"
            fontSize="19px"
            placeholder="Agregar más secciones"
            closeMenuOnSelect={true}
          >
            <option value="IMG">Imagen</option>
            <option value="Iframe">I-frame</option>
            <option value="OList">O List</option>
            <option value="Paragraph">Paragraph</option>
            <option value="Quote">Quote</option>
            <option value="UList">U list</option>
            <option value="SectionTitle">Section Title</option>
          </Select>
        </Box>
      </Container>
    </Box>
  );
};

export default ArticleEdition;
