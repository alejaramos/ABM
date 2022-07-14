import { Image, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { SchemaContext } from "../Context/SchemaContext";

const SchemaMenu = () => {
  const { schema, setSchema } = useContext(SchemaContext);

  const handleChange = (e) => {
    setSchema(e.target.value);
  };

  return (
    <RadioGroup>
      <Stack justifyContent={"space-between"} direction="row">
        <VStack border={"1px"}>
          <Image src="/SchemaA.png" boxSize="200px" />
          <Radio value="<SchemaA/>" onChange={handleChange}>
            {" "}
            Schema A
          </Radio>
        </VStack>
        <VStack border={"1px"}>
          <Image src="/SchemaB.png" borderColor={"#000000"} boxSize="200px" />
          <Radio value="<SchemaB/>" onChange={handleChange}>
            Schema B
          </Radio>
        </VStack>
        <VStack border={"1px"}>
          <Image src="/SchemaC.png" borderColor={"#000000"} boxSize="200px" />
          <Radio value="<SchemaC/>" onChange={handleChange}>
            Schema C
          </Radio>
        </VStack>
        <VStack border={"1px"}>
          <Image src="/SchemaD.png" borderColor={"#000000"} boxSize="200px" />
          <Radio value="<SchemaD/>" onChange={handleChange}>
            Schema D
          </Radio>
        </VStack>
      </Stack>
    </RadioGroup>

    // <Menu>
    //   <MenuButton width={"100%"} as={Button} rightIcon={<ChevronDownIcon />}>
    //     Schema
    //   </MenuButton>
    //   <MenuList>
    //     <MenuItem
    //       onClick={() => {
    //         setSchema("<SchemaA/>");
    //       }}
    //     >
    //       Schema A
    //       <Image src="/SchemaA.png" boxSize="300px" />
    //     </MenuItem>
    //     <Divider borderColor={"#000000"} maxWidth={"100%"} />
    //     <MenuItem
    //       onClick={() => {
    //         setSchema("<SchemaB/>");
    //       }}
    //     >
    //       Schema B
    //       <Image src="/SchemaB.png" boxSize="300px" />
    //     </MenuItem>
    //     <Divider borderColor={"#000000"} maxWidth={"100%"} />
    //     <MenuItem
    //       onClick={() => {
    //         setSchema("<SchemaC/>");
    //       }}
    //     >
    //       Schema C
    //       <Image src="/SchemaC.png" boxSize="300px" />
    //     </MenuItem>
    //     <Divider borderColor={"#000000"} maxWidth={"100%"} />
    //     <MenuItem
    //       onClick={() => {
    //         setSchema("<SchemaD/>");
    //       }}
    //     >
    //       Schema D
    //       <Image src="/SchemaD.png" boxSize="300px" />
    //     </MenuItem>
    //   </MenuList>
    // </Menu>
  );
};

export default SchemaMenu;
