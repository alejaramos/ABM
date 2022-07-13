import {
  Box,
  Grid,
  GridItem,
  Heading,
  Button,
  IconButton,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Histories from "../../Components/Histories";
import WorkingOn from "../../Components/WorkingOn";
import SidebarWithHeader from "../../Components/SideBar";
import Diagramation from "../../Components/Diagramation";

export default function Option({ newses }) {
  const [isMobile] = useMediaQuery("(max-width: 912px)");
  const router = useRouter();
  const { option } = router.query;

  return (
    <>
      <SidebarWithHeader></SidebarWithHeader>
      <Grid
        h="2000px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(10)"
      >
        <GridItem colStart={isMobile ? 1 : 2} colEnd={7}>
          {option === "Historias" ? (
            <Histories newses={newses} />
          ) : option === "diagramas" ? (
            <Diagramation />
          ) : (
            <WorkingOn />
          )}

          {/* Aqui va la logica segun la cual el elemento seleccionado del menu se muestra el componente correpondiente  */}
        </GridItem>
      </Grid>
    </>
  );
}
export async function getServerSideProps() {
  const req = await fetch(`https://rito-mono.herokuapp.com/api/news/newses`);
  const data = await req.json();
  return { props: { newses: data } };
}
