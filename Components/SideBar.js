import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
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
import { IconType } from "react-icons";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const LinkItems = [
  { name: "Historias", icon: FiFileText },
  { name: "Diagramacion", icon: FiInbox },
  { name: "Recetas", icon: FiCoffee },
  { name: "Horoscopo ", icon: FiStar },
  { name: "Play", icon: FiPlayCircle },
  { name: "Makers", icon: FiNavigation },
  { name: "Content Lab", icon: FiMinusSquare },
  { name: "Ads", icon: FiMonitor },
  { name: "Estaticas", icon: FiLayout },
  { name: "Imagenes", icon: FiImage },
  { name: "Autores", icon: FiUser },
  { name: "Contenidos", icon: FiFile },
  { name: "Estructura", icon: FiLayers },
];

export default function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction="column" id="menus">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}

      <Box ml={{ base: 0 }}>
        {" "}
        <MobileNav onOpen={onOpen} />
      </Box>
    </Flex>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      id="menu"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontWeight="900"
          color="#ED2D6E"
          fontSize="30px"
          alignItems="center"
        >
          WOW
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

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

const MobileNav = ({ onOpen, ...rest }) => {
  const router = useRouter();
  const { user, isAuthenticated, toggleAuth } = useContext(AuthContext);

  const logoutHandler = () => {
    axios
      .post("https://rito-mono.herokuapp.com/api/user/logout")
      .then(() => toggleAuth(null))
      .then(() => router.push("/"))
      .catch((err) => console.log(err));
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
      position="relative"
      id="barra superior"
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
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
};
