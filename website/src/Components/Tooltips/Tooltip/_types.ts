export type TooltipProps = {
  id: string;
  content: string;
  hidden?: boolean;
  isOpen?: boolean;
  place?: "top" | "left" | "right" | "bottom";
  variant?: "dark" | "light" | "success" | "warning" | "error" | "info";
};
