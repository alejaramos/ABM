import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const NewsTable = ({ newses }) => {
  const router=useRouter()
  const [renderedNews, setRenderedNews] = useState(newses);
  const [i, setI] = useState();
  useEffect(() => {
    setRenderedNews(newses);
  }, [newses]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef();
  const preDeleteClick = (id) => {
    setI(id);
    onOpen();
  };

  const deleteClick = () => {
    axios
      .delete(`https://rito-mono.herokuapp.com/api/news/${i}`)
      .then(() => onClose())
      .then(() => {
        const index = renderedNews.findIndex((news) => news._id == i);
        renderedNews.splice(index, 1);
        setRenderedNews(renderedNews);
      })
      .catch((code) => console.error("error", code));
  };

  const editClick=(url)=>{
    router.push(`/selected/${url}`)
  }

  return (
    <>
      {
        <>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Borrar Nota
                </AlertDialogHeader>

                <AlertDialogBody>
                  ¿Estás seguro? No podrás volver atrás con esta acción.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={deleteClick} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      }
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
            {renderedNews.map((news, i) => (
              <Tr key={i} _hover={{ backgroundColor: "#fcc7dd" }}>
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
                <Td isNumeric>{news.publication_date?.slice(2,10)||"10-10-22"}</Td>
                <Td>Publicado</Td>
                <Td>
                  <IconButton
                    onClick={() => preDeleteClick(news._id)}
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
                    aria-label="Edit news"
                    onClick={()=>editClick(news.url)}
                    icon={<EditIcon />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default NewsTable;
