import { useContext } from "react";
import { ImageStoreContext } from "src/app/_index";

export const useImageStoreContext = () => {
  const context = useContext(ImageStoreContext);
  return context;
};
