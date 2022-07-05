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
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate;

  const handlerSubmit = (e) => {
    e.preventDefault();
    //agregar ruta
    axios
      .post("http://localhost:3001/api/user/login", {
        name: userName,
        password: password,
      })
      .then((res) => {
        setUserName(res.data);
        localStorage.setItem("user", res.data);
        if (userName.length === "" && password.length === "") {
          alert("Usuario o contraseña incorrecta. Vuelve a intentarlo");
        } else {
          navigate();
        }
      })
      .catch((err) => alert("Aun no esta registrado."));
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
      <Box width="40%" margin="10px 5% 1em" onSubmit={handlerSubmit}>
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
          <FormHelperText>
            Ingresá tu cuenta de Redacción Ohlalá.
          </FormHelperText>
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
            textAlign="center"
            value={password}
            onChange={handlerPassword}
          />

          <FormHelperText>
            Ingresá la clave asociada a la cuenta.
          </FormHelperText>
          <br />
        </FormControl>

        <Button
          backgroundColor=" #E32B6C"
          color="white"
          borderRadius="40px"
          width="400px"
          height="50px"
          textAlign="center"
        >
          Iniciar sesión
        </Button>
        <br />

        <Text color="#E32B6C" textAlign="center">
          <br />
          ¿Olvidaste tu clave?
        </Text>
        <br />
        <Box color="#E32B6C" textAlign="center">
          <Link color="#E32B6C" href="http://localhost:3000/register">
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
