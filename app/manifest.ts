import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oluwagbotemi Adelaja | Full-Stack Developer",
    short_name: "Oluwagbotemi",
    description:
      "Award-winning full-stack developer crafting exceptional digital experiences.",
    start_url: "https://oluwagbotemi.space",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
