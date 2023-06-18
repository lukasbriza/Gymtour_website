import { ComponentType } from "react";
import { WithLoadingProps } from "./_types";
import { Loading } from "../_index";

export const withLoading =
  <T extends {}>(Comp: ComponentType<T>): ComponentType<T & WithLoadingProps> =>
    ({ isLoading, ...props }) => {
      return isLoading ? <Loading /> : <Comp {...(props as unknown as T)} />;
    };
