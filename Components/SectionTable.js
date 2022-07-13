import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import SingleSection from "./SingleSection";

const SectionTable = ({ sections }) => {
  const [renderedSections, setRenderedSections] = useState(sections);
  const [i, setI] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef();

  useEffect(async () => {
    const response = await axios.get(
      "https://rito-mono.herokuapp.com/api/section/"
    );
    const sectionsArray = await response.data;
    setRenderedSections(sectionsArray);
  }, []);

  //   const preDeleteClick = (id) => {
  //     setI(id);
  //     onOpen();
  //   };

  //   const deleteClick = () => {
  //     axios
  //       .delete(`https://rito-mono.herokuapp.com/api/section/${i}`)
  //       .then(() => onClose())
  //       .then(() => {
  //         const index = renderedSections.findIndex((section) => section._id == i);
  //         sections.splice(index, 1);
  //         setRenderedSections(renderedSections);
  //       })
  //       .catch((code) => console.error("error", code));
  //   };

  return (
    <>
      {/* {
        <>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Borrar Seccion
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
      } */}

      <TableContainer py="2em" whiteSpace="pre-wrap">
        {renderedSections.length ? (
          <Table variant="simple">
            <Thead backgroundColor="#f772a9" color="red">
              <Tr>
                <Th>Title</Th>
                <Th>Schema</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>

            <Tbody backgroundColor="white">
              {renderedSections.map((section) => (
                <SingleSection section={section} />
                // <Tr _hover={{ backgroundColor: "#fcc7dd" }}>
                //   <Td id={section._id}>{section.title}</Td>
                //   <Td>
                //     {section.schema.substring(1, 7) +
                //       " " +
                //       section.schema.slice(7, 8)}
                //   </Td>
                //   <Td>
                //     <IconButton
                //       onClick={() => preDeleteClick(section._id)}
                //       border="none"
                //       variant="outline"
                //       colorScheme="red"
                //       aria-label="Send email"
                //       icon={<DeleteIcon />}
                //     />
                //     {!edit ? (
                //       <IconButton
                //         onClick={() => setEdit(true)}
                //         border="none"
                //         variant="outline"
                //         colorScheme="blue"
                //         aria-label="Send email"
                //         icon={<EditIcon />}
                //       />
                //     ) : (
                //       <IconButton
                //         onClick={() => setEdit(false)}
                //         border="none"
                //         variant="outline"
                //         colorScheme="blue"
                //         aria-label="Send email"
                //         icon={<CheckCircleIcon />}
                //       />
                //     )}
                //   </Td>
                // </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Flex justifyContent={"center"} color="red">
            <Spinner />
          </Flex>
        )}
      </TableContainer>
    </>
  );
};

export default SectionTable;
{
  /* <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Titulo</Th>
            <Th>Schema actual</Th>
          </Tr>{" "}
        </Thead>
        <Tbody>
          <Tr>
            <Th>props</Th>
            <Th>props</Th>
          </Tr>
        </Tbody>{" "}
      </Table>
    </TableContainer> */
}
