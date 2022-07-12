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
        <MenuItem>Alegria</MenuItem>
        <MenuItem>Tristeza</MenuItem>
        <MenuItem>Misterio</MenuItem>
        <MenuItem>Reflexion</MenuItem>
        <MenuItem>Naturaleza</MenuItem>
        <MenuItem>Diversion</MenuItem>
        <MenuItem>Paz</MenuItem>
        <MenuItem>Amor</MenuItem>
        <MenuItem>Pasion</MenuItem>
        <MenuItem>Accion</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default EmotionMenu;
