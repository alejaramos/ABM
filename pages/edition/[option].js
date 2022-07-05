import SideBar from "../../Components/SideBar";
import { Box,Grid, GridItem, Heading, Button, IconButton, Icon,useMediaQuery } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import Histories from "../../Components/Histories";
import WorkingOn from "../../Components/WorkingOn";


export default function Option() {
    const [isMobile] = useMediaQuery("(max-width: 912px)");
    const router = useRouter()
    const { option} = router.query

  

    
  return (
    <Grid
      h="2000px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6)"
    >
      <GridItem colStart={isMobile?1:2} colEnd={7} > 
      {
        option==="Historias"?<Histories/>:<WorkingOn/>
        
      }

        {/* Aqui va la logica segun la cual el elemento seleccionado del menu se muestra el componente correpondiente  */}
     </GridItem>
      
    </Grid>
  );
}
