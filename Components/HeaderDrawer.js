import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  RadioGroup,
  Stack,
  Radio,
  Heading,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiCoffee,
  FiStar,
  FiPlayCircle,
  FiImage,
  FiNavigation,
  FiMinusSquare,
  FiMonitor,
  FiUser,
  FiFile,
  FiLayers,
  FiInbox,
  FiLayout,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import axios from 'axios'
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../Context/AuthContext";

const LinkItems = [
  { name: "Historias", icon: FiFileText },
  { name: "Recetas", icon: FiCoffee },
  { name: "Horoscopo ", icon: FiStar },
  { name: "Play", icon: FiPlayCircle },
  { name: "Makers", icon: FiNavigation },
  { name: "Content Lab", icon: FiMinusSquare },
  { name: "Ads", icon: FiMonitor },
  { name: "Diagramacion", icon: FiInbox },
  { name: "Estaticas", icon: FiLayout },
  { name: "Imagenes", icon: FiImage },
  { name: "Autores", icon: FiUser },
  { name: "Contenidos", icon: FiFile },
  { name: "Estructura", icon: FiLayers },
];

export default function HeaderDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, isAuthenticated, toggleAuth } = useContext(AuthContext);
  const router = useRouter();
  const logoutHandler = () => {
    axios
      .post("https://rito-mono.herokuapp.com/api/user/logout")
      .then(() => {
        router.push("/");
        toggleAuth(null);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Flex
      ml={{ base: 0 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between" }}
      position="relative"
      id="barra superior"
      marginLeft={0}
    >
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              borderBottomWidth="1px"
              fontWeight="900"
              color="#ED2D6E"
              fontSize="40px"
              alignItems="center"
            >
              WOW
            </DrawerHeader>
            <DrawerBody>
              {LinkItems.map((link) => (
                <Link href={`/edition/${link.name}`}>
                <NavItem key={link.name} icon={link.icon}>
                  {link.name}
                </NavItem>
                </Link>
              ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Text
        fontSize="40px"
        // fontFamily="monospace"
        fontWeight="900"
        color="#ED2D6E"
        alignItems="center"
      >
        WOW
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiStar />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfreylxebBfibp3dv9U9k7yhKnAiRdl5E_m8a7_BGuobOqDfR7ARvgy-3q0k5iLgyN0x8&usqp=CAU"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href={`/edition/${children}`}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#ED2D6E",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
