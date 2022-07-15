import {
  Box,
  Image,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "../Context/AuthContext";

export const Login = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(true);
  const { user, isAuthenticated, toggleAuth } = useContext(AuthContext);
  const toast = useToast();
  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        // "http://localhost:3001/api/user/login",
        "https://rito-mono.herokuapp.com/api/user/login",
        {
          name: userName,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        toggleAuth(res.data);
        toast({
          title: `Welcome ${res.data.name}`,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        router.push("edition/Historias");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Wrong user or password",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handlerUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Box
      width="100%"
      display="flex"
      justify-content="flex-end"
      position="relative"
    >
      <Box width="40%" margin="10px 5% 1em">
        <Text color="#ED2D6E" textAlign="start" p="0.25em" fontSize="40px">
          WOW!
          <br />
        </Text>

        <b>
          <Text fontSize="40px">
            <br />
            Iniciar sesión
            <br />
          </Text>
        </b>

        <FormControl>
          <b>
            <FormLabel htmlFor="user-name">
              <br />
              Nombre de usuario.
              <br />
            </FormLabel>
          </b>
          <Input
            id="user-name"
            type="user-name"
            width="300px"
            value={userName}
            onChange={handlerUserName}
          />
          <FormHelperText>Ingresá tu cuenta de Redacción WOW.</FormHelperText>
        </FormControl>

        <FormControl>
          <b>
            <FormLabel htmlFor="password">
              <br />
              Contraseña.
            </FormLabel>
          </b>

          <Input
            id="password"
            type="password"
            width="300px"
            value={password}
            onChange={handlerPassword}
          />

          <FormHelperText>
            Ingresá la clave asociada a la cuenta.
          </FormHelperText>
          <br />
        </FormControl>

        <Link href="/">
          <Button
            backgroundColor=" #E32B6C"
            color="white"
            borderRadius="40px"
            width="400px"
            height="50px"
            textAlign="center"
            onClick={handlerSubmit}
          >
            Iniciar sesión
          </Button>
        </Link>
        <br />

        <Text color="#E32B6C">
          <br />
          ¿Olvidaste tu clave?
        </Text>
        <br />
        <Box color="#E32B6C">
          <Link color="#E32B6C" href="/register">
            Si no tienes un usuario registrate aqui.
          </Link>
        </Box>
      </Box>

      <Box width="60%" height="100%" display="flex">
        <Image src="/escritorioOhlalá.webp" alt="Article" height="100%" />
      </Box>
    </Box>
  );
};
