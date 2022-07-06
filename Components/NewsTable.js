import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsTable = ({ newses }) => {

  
  const [renderedNews, setRenderedNews] = useState(newses);
  useEffect(()=>{setRenderedNews(newses)},[newses])
  

  const deleteClick = (id) => {
     axios
       .delete(`http://localhost:3001/api/news/${id}`)
      .then(() =>
      {
        const i= renderedNews.findIndex((news)=>news._id==id)
       return renderedNews.splice(i,1)
    }
      //   axios
      //     .get("http://localhost:3001/api/news/newses")
      //     .then((result) => setRenderedNews(result.data))
       )
        .then((r)=>setRenderedNews(r))
       .catch((code) => console.error("error", code));
  };

  return (
    <TableContainer py="2em" whiteSpace="pre-wrap">
      <Table variant="simple">
        <Thead backgroundColor="#f772a9" color="red">
          <Tr>
            <Th>Imagen Principal</Th>
            <Th>Title</Th>
            <Th>Creditos</Th>
            <Th>Categoria</Th>
            <Th isNumeric>Fecha de Publicacion</Th>
            <Th>Estado</Th>
            <Th>Accion</Th>
          </Tr>
        </Thead>
        <Tbody backgroundColor="white">
          {renderedNews.map((news) => (
            <Tr _hover={{ backgroundColor: "#fcc7dd" }}>
              <Td>
                <Image
                  boxSize="80px"
                  objectFit="cover"
                  src={news.field_img_primary}
                  alt={news.field_img_primary}
                />
              </Td>
              <Td>{news.title}</Td>
              <Td>{news.field_credits}</Td>
              <Td>{news.field_category}</Td>
              <Td isNumeric>10-10-22</Td>
              <Td>Publicado</Td>
              <Td>
                <IconButton
                  onClick={() => deleteClick(news._id)}
                  border="none"
                  variant="outline"
                  colorScheme="red"
                  aria-label="Send email"
                  icon={<DeleteIcon />}
                />
                <IconButton
                  border="none"
                  variant="outline"
                  colorScheme="blue"
                  aria-label="Send email"
                  icon={<EditIcon />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default NewsTable;
