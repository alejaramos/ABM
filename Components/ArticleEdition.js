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
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import HeaderDrawer from "./HeaderDrawer";
import useInput from "../hooks/useInput";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectButton from "./SelectButton";
import { useConst } from "@chakra-ui/react";
import { useRouter } from "next/router";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ArticleEdition = () => {
  const titulo = useInput();
  const volanta = useInput();
  const category = useInput();
  const autor = useInput();
  const Paragraph = useInput();
  const Iframe = useInput();
  const UList = useInput();
  const SectionTitle = useInput();
  const OList = useInput();
  const Quote = useInput();
  const IMG = useInput();
  const date = useInput();
  const router = useRouter();
  const toast = useToast();
  //handlesubmit

  const handlerSubmit = (e) => {
    e.preventDefault();
    const trimDate = date.value.slice(0, 10);
    console.log("entre", titulo.value, volanta.value, autor.value, items);
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
      .then((res) => {
        toast({
          title: "Creada exitosamente",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        router.push("/edition/Historias");
      })
      .catch((err) => {
        toast({
          title: "Intenta nuevamente",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        console.log(err);
      });
  };

  //drag and drop
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setItems(text);
  // }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    // console.log({ reorderedItems });
    setItems(reorderedItems);
  };
  // const hookOfHooks=()=> eval(this.type).value==='string'? cont
  //deberia ser un push al arreglo de objetos a items
  const handlerAdd = (e) => {
    const newItem = {
      type: e.target.value,
      content: undefined,
      // fn: useInput()
    };
    console.log(
      "🚀 ~ file: ArticleEdition.js ~ line 104 ~ handlerAdd ~ fn",
      newItem.fn
    );

    setItems([...items, newItem]);
  };

  // Para eliminar el TextArea elegido.
  const deleteClick = (i) => {
    const deltedItem = items[i];
    setItems(items.filter((item) => item !== deltedItem));
  };
  const arr = [];
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
                              id={(item.content = eval(item.type).value)}
                            >
                              <FormLabel>{item.type}</FormLabel>
                              <InputGroup>
                                <Textarea
                                  placeholder={item.type}
                                  value={eval(item.type).value}
                                  onChange={eval(item.type).onChange}
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
          {/* <SelectButton ></SelectButton> */}
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
