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
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const Register = () => {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [mailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const expresiones = {
    userName: /^[a-zA-ÿ\s]{1,40}$/, //letras y espacios
    password: /^(?=.*[A-Z]).{6,15}$/, //que contenga de 6 a 15 digitos y al menos una mayuscula.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //verifica que sea un email
  };

  const handleName = (e) => {
    setNameError(false);
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!expresiones.userName.test(name)) {
      setNameError(true);
    }
    if (!expresiones.email.test(email)) {
      setEmailError(true);
    }
    if (!expresiones.password.test(password)) {
      setPasswordError(true);
    }

    if (!nameError && !mailError && !passwordError) {
      axios
        .post(
          "https://rito-mono.herokuapp.com/api/user/register",
          {
            email: email,
            password: password,
            name: name,
          }
          // { withCredentials: true }
        )
        .then((res) => {
          toast({
            title: "Bienvenido",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          router.push("/");
        })
        .catch((err) => {
          toast({
            title: "No pudo registrarse",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          console.log(err.response.data);
        });
    }
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
            Registrarse.
            <br />
          </Text>
        </b>

        <FormControl isInvalid={nameError}>
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
            value={name}
            onChange={handleName}
          />
          {!nameError ? (
            <FormHelperText>Ingresá tu cuenta de Redacción WOW.</FormHelperText>
          ) : (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Campo obligatorio</AlertTitle>
            </Alert>
          )}
        </FormControl>
        <br />

        <FormControl isInvalid={mailError}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            width="300px"
            value={email}
            onChange={handleEmail}
          />
          {!mailError ? (
            <FormHelperText>Email personal.</FormHelperText>
          ) : (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>
                Introduzca una dirección de correo electrónico válida
              </AlertTitle>
            </Alert>
          )}
        </FormControl>

        <FormControl isInvalid={passwordError}>
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
            onChange={handlePassword}
          />
          {!passwordError ? (
            <FormHelperText>
              Ingresá una una clave que contenga entre 6 y 12 caracteres y al
              menos una letra mayúscula.
            </FormHelperText>
          ) : (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>
                Su contraseña debe tener entre 6 y 12 caracteres y contener una
                letra mayúscula
              </AlertTitle>
            </Alert>
          )}
          <br />
        </FormControl>

        <Button
          backgroundColor=" #E32B6C"
          color="white"
          borderRadius="40px"
          width="400px"
          height="50px"
          textAlign="center"
          onClick={handleClick}
        >
          Registrarse
        </Button>
      </Box>

      <Box width="60%" height="100%" display="flex">
        <Image src="/escritorioOhlalá.webp" alt="Article" height="100%" />
      </Box>
    </Box>
  );
};
