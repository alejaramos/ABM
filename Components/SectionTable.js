import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Spinner,
  Flex,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";
import SingleSection from "./SingleSection";

const SectionTable = ({ sections }) => {
  const [renderedSections, setRenderedSections] = useState(sections);

  useEffect(() => {
    axios.get("https://rito-mono.herokuapp.com/api/section/").then((res) => {
      setRenderedSections(res.data);
    });
  }, [renderedSections]);

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
              {renderedSections.map((section, i) => (
                <SingleSection section={section} />
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
