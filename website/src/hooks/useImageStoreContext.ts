import { ImageStoreContext } from "@app";
import { useContext } from "react";

export const useImageStoreContext = () => {
  const context = useContext(ImageStoreContext);
  return context;
};
