import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oluwagbotemi Adelaja | Full-Stack Developer",
    short_name: "Oluwagbotemi",
    description:
      "Award-winning full-stack developer crafting exceptional digital experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
