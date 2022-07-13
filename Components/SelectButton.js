import {
  Box,
  Heading,
  Button,
  Stack,
  Center,
  Spacer,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
} from "@chakra-ui/react";
import text from "../utils/Text";

const SelectButton = () => {
  //handleAdd
  const handlerAdd = (e) => {
    e.preventDefault();
    text.push({
        id: "item-2",
        type: e.target.value,
        content: undefined
      })
    //deberia ser un push al arreglo de objetos text
  };


  return (
    <Select
      hover={{ bg: "#ED2D6E" }}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      borderRadius="15px"
      colorScheme="#ED2D6E"
     // color="white"
      bg="hsl(342deg 68% 56%)"
      variant="outline"
      size="sm"
      onChangeCapture={handlerAdd}
     
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
  );
};

export default SelectButton;
