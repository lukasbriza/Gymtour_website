import { Props } from "@lukasbriza/lbui-lib";
import { ButtonHTMLAttributes } from "react";

type TableButtonProps = {
  onClick?: () => void;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
} & Props<HTMLButtonElement>;

export type SucessButtonProps = TableButtonProps;
export type EditButtonProps = TableButtonProps;
export type CancelButtonProps = TableButtonProps;
