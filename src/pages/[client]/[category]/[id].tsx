import React from "react";
import type { GetServerDataProps, PageProps } from "gatsby";
import { Helmet } from "react-helmet";

const mediaCore = {
  schema: "https://",
  domain: "mediacore.app/",
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

const validCategories = ["novedades", "propiedades", "emprendimientos"];

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

  return (
    <Helmet
      meta={[
        {
          property: openGraph.title,
          content: `${serverData?.title ?? messages.titleNotFound}`,
        },
        {
          property: openGraph.image,
          content: `${serverData?.image ?? messages.imageNotFound}`,
        },
        {
          property: openGraph.description,
          content: `${serverData?.headline ?? messages.headlineNotFound}`,
        },
        {
          property: openGraph.type,
          content: `website`,
        },
        {
          property: openGraph.url,
          content: query.get("target") ?? "",
        },
      ]}
    />
  );
};

export default SharePage;

export async function getServerData({ query, params }: GetServerDataProps) {
  if (!validCategories.includes(params?.category as string))
    return { props: {} };
  const fetchElement = {
    novedades: `${mediaCore.schema}${query?.env ? query?.env + "." : ""}${
      mediaCore.domain
    }/api/blog/novedades/${params?.id}/get_data_detail/?client=${
      params?.client
    }`,
  };
  const res = await fetch(
    fetchElement[params?.category as keyof typeof fetchElement]
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
