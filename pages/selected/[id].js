import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import ArticleEdition from "../../Components/ArticleEdition";


export default function Option({news}) {

  return ( <ArticleEdition news={news} ></ArticleEdition>
  
  );
}

export async function getServerSideProps({ params }) {
  console.log("🚀 ~ file: [id].js ~ line 14 ~ getServerSideProps ~ params", params)
  const req = await fetch(`https://rito-mono.herokuapp.com/api/news/${params.id}`);
  const data = await req.json();
  return { props: { news: data[0] } };
}
