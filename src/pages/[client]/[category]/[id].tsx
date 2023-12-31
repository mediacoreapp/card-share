import React, { useEffect } from "react";
import { GetServerDataProps, PageProps } from "gatsby";
import { Helmet } from "react-helmet";

const backend = {
  schema: "https://",
  domain: process.env.GATSBY_DOMAIN ?? "",
};

const messages = {
  titleNotFound: "No se encontró el título",
  imageNotFound: "No se encontró la imagen",
  headlineNotFound: "No se encontró el subtítulo",
};

const openGraph = {
  title: "og:title",
  image: "og:image",
  description: "og:description",
  type: "og:type",
  url: "og:url",
};

const validCategories = [
  "novedades",
  "propiedades",
  "emprendimientos",
  "propiedades_mediasite",
  "emprendimientos_mediasite",
];
const validEnvs = ["dev", "staging"];

interface ReturnProps {
  serverData?: {
    title: string;
    image: string;
    headline: string;
  };
}

const SharePage = ({
  location: { search },
  serverData,
}: PageProps & ReturnProps) => {
  const query = new URLSearchParams(search);
  useEffect(() => {
    if (query.get("url") && typeof window !== "undefined") {
      window.location.href = query.get("url")!;
    }
  }, []);

  return (
    <Helmet
      meta={[
        {
          property: openGraph.title,
          content:
            (query.get("operation") ? query.get("operation") + " - " : "") +
              serverData?.title ?? messages.titleNotFound,
        },
        {
          property: openGraph.image,
          content: serverData?.image ?? messages.imageNotFound,
        },
        {
          property: openGraph.description,
          content: serverData?.headline ?? messages.headlineNotFound,
        },
        {
          property: openGraph.type,
          content: query.get("type") ?? `website`,
        },
        {
          property: openGraph.url,
          content: query.get("url") ?? "",
        },
      ]}
    />
  );
};

export default SharePage;

export async function getServerData({ query, params }: GetServerDataProps) {
  if (
    !validCategories.includes(params?.category as string) ||
    (query?.env && !validEnvs.includes(query?.env as string))
  )
    return { props: {} };
  const res = await fetch(
    `${backend.schema}${query?.env ? query?.env + "." : ""}${
      backend.domain
    }/api/core/compartir/?client=${params?.client}&category=${
      params?.category
    }&id=${params?.id}`
  );
  if (!res.ok) {
    return {
      props: {},
    };
  }
  return {
    props: await res.json(),
  };
}
