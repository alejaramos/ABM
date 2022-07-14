import { useState, useRef, useContext, useEffect } from "react";
import { SchemaContext } from "../Context/SchemaContext";
import {
  Input,
  Button,
  Tr,
  Td,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  Flex,
  Select,
} from "@chakra-ui/react";

import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";

import useInput from "../hooks/useInput";
import axios from "axios";

const SingleSection = ({ section, setModified }) => {
  const [edit, setEdit] = useState(false);
  const newTitle = useInput();
  //   const { modified, setModified, saveModified } = useContext(SchemaContext);
  const { schema, setSchema } = useContext(SchemaContext);
  const removeAlert = useDisclosure();
  const modifyAlert = useDisclosure();
  const cancelRef = useRef();

  const deleteClick = () => {
    axios
      .delete(`https://rito-mono.herokuapp.com/api/section/${section._id}`)
      .then(() => removeAlert.onClose())
      .catch((code) => console.error("error", code));
  };

  const modifyClick = () => {
    console.log(newTitle.value, schema);
    const title = newTitle.value || section.title;
    new axios.put(
      `https://rito-mono.herokuapp.com/api/section/${section._id}`,
      {
        title: title,
        schema: schema,
      }
    )
      .then(
        () => modifyAlert.onClose(),
        setEdit(false),
        (section.title = title),
        (section.schema = schema)
      )
      .catch((code) => console.error("error", code));
  };

  const handleChange = (e) => {
    if (e.target.value) setSchema(e.target.value);
  };

  //   useEffect(() => {
  //     axios
  //       .get(`https://rito-mono.herokuapp.com/api/section/${section._id}`)
  //       .then((res) => console.log("HOLA", res))
  //       .catch((err) => console.log("error", err));
  //     // const response = await axios.get(
  //     //     `https://rito-mono.herokuapp.com/api/section/${section._id}`
  //     //   ),
  //     //   section = await response.data;
  //   }, []);

  return (
    <>
      {
        <>
          <AlertDialog
            isOpen={removeAlert.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={removeAlert.onClose}
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
                  <Button ref={cancelRef} onClick={removeAlert.onClose}>
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
      {
        <>
          <AlertDialog
            isOpen={modifyAlert.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={modifyAlert.onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Modificar Seccion
                </AlertDialogHeader>

                <AlertDialogBody>
                  ¿Estás seguro? No podrás volver atrás con esta acción.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={modifyAlert.onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={modifyClick} ml={3}>
                    Modify
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      }
      <Tr hover={{ backgroundColor: "#fcc7dd" }}>
        {!edit ? (
          <>
            <Td id={section._id}>{section.title}</Td>
            <Td>
              {section.schema.substring(1, 7) +
                " " +
                section.schema.slice(7, 8)}
            </Td>
            <Td>
              <IconButton
                onClick={() => {
                  removeAlert.onOpen();
                }}
                border="none"
                variant="outline"
                colorScheme="red"
                aria-label="Send email"
                icon={<DeleteIcon />}
              />
              <IconButton
                onClick={() => {
                  setEdit(true);
                }}
                border="none"
                variant="outline"
                colorScheme="blue"
                aria-label="Send email"
                icon={<EditIcon />}
              />
            </Td>
          </>
        ) : (
          <>
            <Td width={"33%"}>
              <Input placeholder={section.title} {...newTitle}></Input>
            </Td>
            <Td width={"33%"}>
              <Select onChange={handleChange} placeholder="Select option">
                <option value="<SchemaA/>">Schema A</option>
                <option value="<SchemaB/>">Schema B</option>
                <option value="<SchemaC/>">Schema C</option>
                <option value="<SchemaD/>">Schema D</option>
              </Select>
            </Td>
            <Td>
              <IconButton
                onClick={() => modifyAlert.onOpen()}
                border="none"
                variant="outline"
                colorScheme="blue"
                aria-label="Send email"
                icon={<CheckCircleIcon />}
              />
              <IconButton
                onClick={() => setEdit(false)}
                border="none"
                variant="outline"
                colorScheme="red"
                aria-label="Send email"
                icon={<CloseIcon />}
              />
            </Td>
          </>
        )}
      </Tr>
    </>
  );
};

export default SingleSection;
