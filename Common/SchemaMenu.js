import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

const EmotionMenu = () => {
  return (
    <Menu>
      <MenuButton width={"100%"} as={Button} rightIcon={<ChevronDownIcon />}>
        Emociones
      </MenuButton>
      <MenuList>
        <MenuItem>Schema A</MenuItem>
        <MenuItem>Schema B</MenuItem>
        <MenuItem>Schema C</MenuItem>
        <MenuItem>Schema D</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default EmotionMenu;
