import { createContext, useState } from "react";

const authContextDefaultValues = {
    // data del contexto
    user: null, // información del usuario  
    isAuthenticated: false, // si está o no logueado
    toggleAuth: () => null, // función para actualizar el contexto
 };

 const getFromStorage = (key) => {
    if(typeof window !== 'undefined'){
         window.localstorage?.getItem(key)
    }
    }

    const setToStorage = (key,value) => {
        if(typeof window !== 'undefined'){
             return window.localstorage.setItem(key,value)
        }
        }

 export const AuthContext = createContext(authContextDefaultValues);


export const AuthContextProvider=({children})=>{
    console.log("🚀 ~ file: AuthContext.js ~ line 23 ~ AuthContextProvider ~ getFromStorage", getFromStorage("user"))

    const [isLoggedIn, setIsLoggedIn]=useState({
         user: getFromStorage("user")!=undefined? JSON.parse(getFromStorage("user")) : null, 
        isAuthenticated:  (getFromStorage('auth')=='true') || false, 
    })

    const toggleAuth = (user) =>{
    console.log("🚀 ~ file: AuthContext.js ~ line 34 ~ toggleAuth ~ user", user)
        
        setIsLoggedIn({
            user:user,
            isAuthenticated:!isLoggedIn.isAuthenticated
        })
    
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem('auth', !isLoggedIn.isAuthenticated)
    
    };


  return( <AuthContext.Provider value={{ ...isLoggedIn, toggleAuth }}>{children}</AuthContext.Provider>)
}
