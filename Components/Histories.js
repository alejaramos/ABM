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
} from "@chakra-ui/react";
import NewsTable from "./NewsTable";
import useInput from "../hooks/useInput";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Histories = ({ newses }) => {
  const palabrasClave = useInput();
  const [renderedNews, setRenderedNews] = useState(newses);
  const title = useInput();
  const credit = useInput();
  const category = useInput();
  const date = useInput();
  const estado = useInput();

  const handleCLick = () => {
    const result = newses.filter(
      (news) =>
        news.title == title.value ||
        news.field_credits == credit.value ||
        news.field_category == category.value
    );

    result.length == 0 ? setRenderedNews(newses) : setRenderedNews(result);
  };

  return (
    <Box px="3em" ml={"13em"} backgroundColor="#fcf2f6" justifyContent="right">
      <Box
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        py="0.25em"
      >
        <Heading>Historias</Heading>
        <Link href="/selected/newHistorie">
          <Button
            backgroundColor=" #E32B6C"
            color="white"
            borderRadius="40px"
            my="0.5em"
            height="30px"
          >
            + Crear
          </Button>
        </Link>
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
              <FormLabel>Palabras Clave</FormLabel>
              <Input
                {...palabrasClave}
                id="title"
                type="text"
                placeholder="Palabras Clave"
              />
            </Box>
            <Box>
              <FormLabel>Titulo</FormLabel>
              <Input {...title} id="title" type="text" placeholder="Titulo" />
            </Box>
            <Box>
              <FormLabel>Creditos</FormLabel>
              <Input
                {...credit}
                id="Creditos"
                type="text"
                placeholder="Creditos"
              />
            </Box>
            <Box>
              <FormLabel>Categoria</FormLabel>
              <Input
                {...category}
                id="category"
                type="text"
                placeholder="Categoria"
              />
            </Box>
            <Box>
              <FormLabel>Fecha</FormLabel>
              <Input
                {...date}
                id="date"
                type="date"
                placeholder="Fecha de publicacion"
              />
            </Box>
            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Select {...estado} id="estado" placeholder="Estado">
                <option>Publicado</option>
                <option>En revision</option>
                <option>Denegado</option>
              </Select>
            </FormControl>

            <Button
              onClick={handleCLick}
              backgroundColor=" #E32B6C"
              color="white"
              borderRadius="40px"
              my="0.5em"
              height="30px"
              width="30%"
            >
              Filtrar
            </Button>
          </Grid>
        </FormControl>
      </Box>
      <NewsTable newses={renderedNews} />
    </Box>
  );
};

export default Histories;
