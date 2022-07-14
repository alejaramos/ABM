import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useDisclosure,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import SingleSection from "./SingleSection";
import { SchemaContext } from "../Context/SchemaContext";

const SectionTable = ({ sections }) => {
  const [renderedSections, setRenderedSections] = useState(sections);

  const [i, setI] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    axios
      .get("https://rito-mono.herokuapp.com/api/section/")
      .then((response) => {
        setRenderedSections(response.data);
      });
  }, []);

  return (
    <>
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
