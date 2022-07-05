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
import Link from "next/link";

export const Login=()=>{







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
                        Iniciar sesión
                        <br/>
                    </Text>
                </b>

                <FormControl>
                    <b>
                        <FormLabel 
                            htmlFor='user-name' 
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
                <FormHelperText>
                    Ingresá tu cuenta de Redacción Ohlalá.
                    </FormHelperText>

                </FormControl>

                <FormControl>
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
                    textAlign="center"  
                />

                <FormHelperText>
                    Ingresá la clave asociada a la cuenta.
                </FormHelperText>
                <br/>
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
                <br/>
                
                <Text 
                    color="#E32B6C" 
                    /*textAlign="center"*/ 
                    >
                    <br/>
                    ¿Olvidaste tu clave?
                </Text>
                <Link href="http://localhost:3000/register" >
                    Register 
                </Link>

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