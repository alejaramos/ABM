import { 
    Box, 
    Image, 
    Text, 
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
    
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

export const Register=()=>{
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [mailError, setMailError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleName=(e)=>{
        setNameError(false)
        setName(e.target.value)
    }

    const handlePassword=(e)=>{
        setPasswordError(false)
        setPassword(e.target.value)
    }

    const handleEmail=(e)=>{
        setMailError(false)
        setEmail(e.target.value)
    }
    
    const handleClick = (e) => {
        if(email==""){
            setMailError(true)
        }
    }

    return(
        <Box 
             width="100%"
             display="flex" 
             justify-content="flex-end" 
             position="relative"
            >

            <Box 
                width="40%" 
                margin= "10px 5% 1em"
                >
                <Text 
                    color="#ED2D6E" 
                    textAlign="start" 
                    p= "0.25em" 
                    fontSize="40px"
                    >
                    WOW! 
                    <br/>
                </Text>
                
                <b>
                    <Text 
                        fontSize="40px"
                        >
                        <br/>
                        Registrarse.
                        <br/>
                    </Text>
                </b>

                <FormControl isInvalid={nameError}>
                    <b>
                        <FormLabel 
                            htmlFor='user-name' 
                            value={name}
                            onChange={handleName}
                            >
                            <br/>
                            Nombre de usuario.
                            <br/>
                        </FormLabel>
                    </b>
                    <Input 
                        id='user-name' 
                        type='user-name' 
                        width="300px" 
                    />
                    {!nameError ? (
                        <FormHelperText>
                            Ingresá tu cuenta de Redacción Ohlalá.                        
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Campo obligatorio.</FormErrorMessage>
                    )}
                </FormControl>
                <br/>

                <FormControl isInvalid={mailError}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input
                        id='email'
                        type='email'
                        width="300px"
                        value={email}
                        onChange={handleEmail}
                    />
                    {!mailError ? (
                        <FormHelperText>
                        Email personal.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Campo obligatorio.</FormErrorMessage>
                    )}
                </FormControl>


                <FormControl isInvalid={passwordError}>
                    <b>
                        <FormLabel 
                            htmlFor='password' 
                            >
                            <br/>
                            Contraseña.
                        </FormLabel>
                    </b>

                    <Input 
                        id='password' 
                        type='password' 
                        width="300px" 
                        value={password}
                        onChange={handlePassword} 
                    />
                    {!passwordError ? (
                        <FormHelperText>
                        Ingresá la clave para asociada la cuenta.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Campo obligatorio.</FormErrorMessage>
                        )}
                    <br/>
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

            <Box 
                width="60%" 
                height="100%" 
                display="flex"
                >
                
                <Image 
                    src='/escritorioOhlalá.webp' 
                    alt='Article' 
                    height="100%"
                />
            </Box>

        </Box>
    )
}