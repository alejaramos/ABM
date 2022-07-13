import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Histories from "../Components/Histories";
import { Login } from "../Components/Login";
import SidebarWithHeader from "../Components/SideBar";
import { AuthContext } from "../Context/AuthContext";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    axios
      .get("https://rito-mono.herokuapp.com/api/user/me", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data._id) router.push("edition/Historias");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Login />
    </>
  );
}
