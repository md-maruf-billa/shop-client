import { useEffect } from "react";

const CustomFavIcon = ({ faviconUrl }: { faviconUrl: string }) => {
      useEffect(() => {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
                  link.href = faviconUrl;
            } else {
                  const newLink = document.createElement("link");
                  newLink.rel = "icon";
                  newLink.href = faviconUrl;
                  document.head.appendChild(newLink);
            }
      }, [faviconUrl]);

      return null;
};

export default CustomFavIcon;
