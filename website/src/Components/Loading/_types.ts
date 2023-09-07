import { ReactNode } from "react";

export type LoadingProps = {
  className?: string;
  scale?: number;
  height?: number;
};

export type LoadingWrapperProps = LoadingProps & { loading: boolean, children: ReactNode }
